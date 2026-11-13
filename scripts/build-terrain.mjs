// Downloads real elevation data for the summits shown on the home page map and
// writes one small binary grid per summit (public/terrain/<id>.bin), the outlines
// of its lakes and glaciers (public/terrain/<id>.json) and the summits' metadata
// (src/data/summits.json). Run it only when the list changes:
//
//   npm run terrain
//
// Sources:
// - Elevation: Copernicus DEM GLO-30, read with HTTP range requests from the AWS
//   Open Data bucket (https://registry.opendata.aws/copernicus-dem/).
//   Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space
//   GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA.
// - Lakes and glaciers: OpenStreetMap contributors (ODbL), via the Overpass API.
import { mkdir, writeFile } from "node:fs/promises";
import { fromUrl } from "geotiff";

const COLS = 120; // samples across; rows follow the 4:5 map ratio
const ROWS = 150;
const SUMMIT_SEARCH_M = 200; // published coordinates are rounded; larger radii can jump to a neighbouring peak

/**
 * Summit coordinates and altitudes from the French Wikipedia articles.
 * Check the script output: the data summit should be close to the official
 * altitude (sharp peaks come out lower at 30 m resolution). The Mont Aiguille
 * was tried and dropped: its cliffs are missing from the data.
 */
const SUMMITS = [
  {
    id: "mont-blanc",
    name: { en: "Mont Blanc", fr: "Mont Blanc" },
    massif: null,
    altitude: 4807,
    lat: 45.832627,
    lon: 6.864717,
    widthM: 6000,
  },
  {
    id: "chamechaude",
    name: { en: "Chamechaude", fr: "Chamechaude" },
    massif: { en: "Chartreuse", fr: "Chartreuse" },
    altitude: 2082,
    lat: 45.2875,
    lon: 5.78806,
    widthM: 5000,
  },
  {
    id: "grand-pic-de-belledonne",
    name: { en: "Grand Pic de Belledonne", fr: "Grand Pic de Belledonne" },
    massif: { en: "Belledonne", fr: "Belledonne" },
    altitude: 2977,
    lat: 45.17111,
    lon: 5.99167,
    widthM: 5000,
  },
  {
    id: "mont-ventoux",
    name: { en: "Mont Ventoux", fr: "Mont Ventoux" },
    massif: { en: "Provence", fr: "Provence" },
    altitude: 1910,
    lat: 44.173955,
    lon: 5.278298,
    widthM: 6000,
  },
  {
    id: "pic-du-midi-d-ossau",
    name: { en: "Pic du Midi d'Ossau", fr: "Pic du Midi d'Ossau" },
    massif: { en: "Pyrenees", fr: "Pyrénées" },
    altitude: 2884,
    lat: 42.84306,
    lon: -0.43806,
    widthM: 5000,
  },
];

const M_PER_DEG_LAT = 111320;
const images = new Map();

/** Copernicus tiles are 1x1 degree, named after their south-west corner. */
async function tileImage(lat, lon) {
  const la = Math.floor(lat);
  const lo = Math.floor(lon);
  const name =
    `Copernicus_DSM_COG_10_${la >= 0 ? "N" : "S"}${String(Math.abs(la)).padStart(2, "0")}_00_` +
    `${lo >= 0 ? "E" : "W"}${String(Math.abs(lo)).padStart(3, "0")}_00_DEM`;
  if (!images.has(name)) {
    const tiff = await fromUrl(`https://copernicus-dem-30m.s3.amazonaws.com/${name}/${name}.tif`);
    images.set(name, await tiff.getImage());
  }
  return images.get(name);
}

/** Reads the raster around a point (across tiles if needed) and returns an elevation(lat, lon) sampler. */
async function loadArea(lat, lon, halfWidthM, halfHeightM) {
  const dLat = (halfHeightM * 1.2) / M_PER_DEG_LAT;
  const dLon = (halfWidthM * 1.2) / (M_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180));
  const areas = new Map();
  for (let la = Math.floor(lat - dLat); la <= Math.floor(lat + dLat); la++) {
    for (let lo = Math.floor(lon - dLon); lo <= Math.floor(lon + dLon); lo++) {
      const image = await tileImage(la, lo);
      const [originLon, originLat] = image.getOrigin();
      const [resLon, resLat] = image.getResolution(); // resLat is negative
      const col = (v) => (v - originLon) / resLon - 0.5; // pixel centres
      const row = (v) => (v - originLat) / resLat - 0.5;
      const clampX = (v) => Math.min(image.getWidth(), Math.max(0, v));
      const clampY = (v) => Math.min(image.getHeight(), Math.max(0, v));
      const x0 = clampX(Math.floor(col(lon - dLon)) - 1);
      const x1 = clampX(Math.ceil(col(lon + dLon)) + 2);
      const y0 = clampY(Math.floor(row(lat + dLat)) - 1);
      const y1 = clampY(Math.ceil(row(lat - dLat)) + 2);
      const [data] = await image.readRasters({ window: [x0, y0, x1, y1] });
      areas.set(`${la}/${lo}`, { col, row, x0, y0, w: x1 - x0, h: y1 - y0, data });
    }
  }
  return (la, lo) => {
    const a = areas.get(`${Math.floor(la)}/${Math.floor(lo)}`);
    // At a tile seam, the last pixel row/column is reused (sub-pixel error).
    const x = Math.min(a.w - 1.001, Math.max(0, a.col(lo) - a.x0));
    const y = Math.min(a.h - 1.001, Math.max(0, a.row(la) - a.y0));
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = x - xi;
    const fy = y - yi;
    const at = (i, j) => a.data[j * a.w + i];
    return (
      at(xi, yi) * (1 - fx) * (1 - fy) +
      at(xi + 1, yi) * fx * (1 - fy) +
      at(xi, yi + 1) * (1 - fx) * fy +
      at(xi + 1, yi + 1) * fx * fy
    );
  };
}

/** Overpass query with retries; the public servers are often busy. */
async function overpass(query) {
  const servers = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
  for (let attempt = 0; attempt < 6; attempt++) {
    const server = servers[attempt % servers.length];
    try {
      const res = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "thomasbach.fr build script" },
        body: new URLSearchParams({ data: query }),
      });
      if (res.ok) return await res.json();
      console.warn(`Overpass ${server}: HTTP ${res.status}, retrying`);
    } catch (error) {
      console.warn(`Overpass ${server}: ${error.message}, retrying`);
    }
    await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
  }
  throw new Error("Overpass: no server answered");
}

/** Douglas-Peucker simplification of a polyline of [x, y] points. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let far = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d = Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / len;
    if (d > far) {
      far = d;
      index = i;
    }
  }
  if (far <= tolerance) return [points[0], points[points.length - 1]];
  return [...simplify(points.slice(0, index + 1), tolerance).slice(0, -1), ...simplify(points.slice(index), tolerance)];
}

/** Simplifies a closed ring: split at its farthest point, since both ends are the same point. */
function simplifyRing(ring, tolerance) {
  let far = 0;
  for (let i = 1; i < ring.length; i++) {
    if (Math.hypot(ring[i][0] - ring[0][0], ring[i][1] - ring[0][1]) > Math.hypot(ring[far][0] - ring[0][0], ring[far][1] - ring[0][1])) far = i;
  }
  if (far === 0) return ring;
  return [...simplify(ring.slice(0, far + 1), tolerance).slice(0, -1), ...simplify(ring.slice(far), tolerance)];
}

/** Joins way fragments (lists of points) into closed rings by matching their ends. */
function joinRings(parts) {
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];
  const pending = parts.map((p) => [...p]);
  const rings = [];
  while (pending.length) {
    let ring = pending.shift();
    let grew = true;
    while (!same(ring[0], ring[ring.length - 1]) && grew) {
      grew = false;
      for (let i = 0; i < pending.length; i++) {
        const p = pending[i];
        const end = ring[ring.length - 1];
        if (same(end, p[0])) ring = [...ring, ...p.slice(1)];
        else if (same(end, p[p.length - 1])) ring = [...ring, ...[...p].reverse().slice(1)];
        else if (same(ring[0], p[p.length - 1])) ring = [...p, ...ring.slice(1)];
        else if (same(ring[0], p[0])) ring = [...[...p].reverse(), ...ring.slice(1)];
        else continue;
        pending.splice(i, 1);
        grew = true;
        break;
      }
    }
    rings.push(ring);
  }
  return rings;
}

/**
 * Lakes and glaciers around a summit from OpenStreetMap, as rings of [east, north]
 * offsets in metres from the map centre (outer and inner rings; drawn with even-odd fill).
 */
async function waterBodies(lat, lon, halfWidthM, halfHeightM) {
  const mLon = M_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180);
  const b = [
    lat - halfHeightM / M_PER_DEG_LAT,
    lon - halfWidthM / mLon,
    lat + halfHeightM / M_PER_DEG_LAT,
    lon + halfWidthM / mLon,
  ].join(",");
  const { elements } = await overpass(`[out:json][timeout:90];(
    way["natural"="water"](${b});
    relation["natural"="water"](${b});
    way["natural"="glacier"](${b});
    relation["natural"="glacier"](${b});
  );out geom;`);

  const toMeters = (g) => g.map((p) => [(p.lon - lon) * mLon, (p.lat - lat) * M_PER_DEG_LAT]);
  const out = { lakes: [], glaciers: [] };
  for (const e of elements) {
    const parts =
      e.type === "way" ? [e.geometry] : (e.members ?? []).filter((m) => m.type === "way" && m.geometry).map((m) => m.geometry);
    const rings = joinRings(parts.map(toMeters))
      .map((r) => simplifyRing(r, 8).map(([x, y]) => [Math.round(x), Math.round(y)]))
      .filter((r) => r.length >= 4)
      // Skip rings entirely outside the map.
      .filter((r) => r.some(([x, y]) => Math.abs(x) < halfWidthM * 1.1 && Math.abs(y) < halfHeightM * 1.1));
    if (rings.length) (e.tags?.natural === "glacier" ? out.glaciers : out.lakes).push(rings);
  }
  return out;
}

/** Contour interval giving at most ~55 lines over the relief shown. */
function contourInterval(min, max) {
  for (const step of [10, 20, 25, 50, 100, 200]) if ((max - min) / step <= 55) return step;
  return 250;
}

await mkdir("public/terrain", { recursive: true });
await mkdir("src/data", { recursive: true });
const meta = [];

for (const s of SUMMITS) {
  const heightM = (s.widthM * ROWS) / COLS;
  const mLon = M_PER_DEG_LAT * Math.cos((s.lat * Math.PI) / 180);
  const pad = SUMMIT_SEARCH_M;
  const elevation = await loadArea(s.lat, s.lon, s.widthM / 2 + pad, heightM / 2 + pad);

  // Published coordinates are rounded: recentre on the highest data point nearby.
  let top = { z: -Infinity, e: 0, n: 0 };
  for (let n = -SUMMIT_SEARCH_M; n <= SUMMIT_SEARCH_M; n += 10) {
    for (let e = -SUMMIT_SEARCH_M; e <= SUMMIT_SEARCH_M; e += 10) {
      if (e * e + n * n > SUMMIT_SEARCH_M ** 2) continue;
      const z = elevation(s.lat + n / M_PER_DEG_LAT, s.lon + e / mLon);
      if (z > top.z) top = { z, e, n };
    }
  }
  const lat = s.lat + top.n / M_PER_DEG_LAT;
  const lon = s.lon + top.e / mLon;
  const offset = (east, north) => elevation(lat + north / M_PER_DEG_LAT, lon + east / mLon);

  // Each sample averages a 3x3 neighbourhood to avoid aliasing.
  const out = new Uint16Array(COLS * ROWS);
  const cell = s.widthM / COLS;
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const east = (i + 0.5) * cell - s.widthM / 2;
      const north = heightM / 2 - (j + 0.5) * cell;
      let sum = 0;
      for (let v = -1; v <= 1; v++) for (let u = -1; u <= 1; u++) sum += offset(east + (u * cell) / 3, north + (v * cell) / 3);
      const z = Math.max(0, sum / 9);
      min = Math.min(min, z);
      max = Math.max(max, z);
      out[j * COLS + i] = Math.round(z * 10); // decimetres
    }
  }

  await writeFile(`public/terrain/${s.id}.bin`, Buffer.from(out.buffer));
  const water = await waterBodies(lat, lon, s.widthM / 2, heightM / 2);
  await writeFile(`public/terrain/${s.id}.json`, JSON.stringify(water));
  await new Promise((r) => setTimeout(r, 1500)); // be gentle with the public Overpass API
  const interval = contourInterval(min, max);
  meta.push({
    id: s.id,
    name: s.name,
    massif: s.massif,
    altitude: s.altitude,
    lat: Number(lat.toFixed(5)),
    lon: Number(lon.toFixed(5)),
    widthM: s.widthM,
    heightM,
    cols: COLS,
    rows: ROWS,
    interval,
  });
  console.log(
    `${s.id}: data summit ${Math.round(top.z)} m (official ${s.altitude} m), ` +
      `${Math.round(Math.hypot(top.e, top.n))} m from the published point, ` +
      `relief ${Math.round(min)}-${Math.round(max)} m, interval ${interval} m, ` +
      `${water.lakes.length} lakes, ${water.glaciers.length} glaciers`,
  );
}

await writeFile("src/data/summits.json", JSON.stringify(meta, null, 2) + "\n");
console.log(`Wrote ${meta.length} summits.`);
