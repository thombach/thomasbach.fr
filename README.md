# thomasbach.fr

Personal website, built with [Astro](https://astro.build). Fully static: no API, no database.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type check + build to dist/
```

The site exists in English (`/`) and French (`/fr/`). Interface texts live in `src/i18n.ts`.

## Add a project

1. Create a folder in `src/content/projects/`, for example `src/content/projects/my-project/`.
2. Put the cover image in it (`cover.jpg` or `.png`, at least 1080 px wide). It is converted to WebP and resized at build time.
3. Add an `index.md` file:

```yaml
---
title: My project
date: 2026-11-12
description:
  en: One sentence about the project.
  fr: Une phrase sur le projet.
cover: ./cover.jpg
coverAlt:
  en: What the image shows
  fr: Ce que montre l'image
link: https://github.com/thombach/my-project # optional
---
```

4. Commit and push to `main`: GitHub Actions builds and deploys the site.

Projects are sorted by date, most recent first. `title`, `description`, `coverAlt` and `linkLabel` accept either one string for both languages or an `en`/`fr` pair. The build fails with a clear message if a field is missing or misspelled.

### Link label

The link text and its icon are guessed from the URL: the repository path for GitHub, `Play on itch.io`, `Watch the demo on YouTube`, otherwise the domain name with a globe icon. Set `linkLabel` to override the text.

### Animated preview

Add a short looping video next to the cover and reference it with `video: ./preview.mp4`. It plays while the project row is hovered, or while it is on screen on phones, and never when the visitor has reduced motion turned on.

To convert a GIF (often 10x lighter):

```sh
ffmpeg -i demo.gif -an -movflags +faststart -pix_fmt yuv420p \
  -vf "scale=trunc(min(960\,iw)/2)*2:-2,fps=24" -c:v libx264 -crf 28 preview.mp4
```

## Home page map

The framed map shows one of five French summits, picked at random on each visit; the "Another summit" button cycles through them and `?summit=mont-blanc` forces one. It is drawn from real data: contour lines over a hillshade lit from the north-west, lakes and glaciers in blue, and the altitude under the pointer. The header's faint grid is aligned on the map, one square per kilometre.

The data is prepared once by `npm run terrain` (`scripts/build-terrain.mjs`), into `public/terrain/`:

- `<id>.bin`: elevation grid from the Copernicus DEM GLO-30 (AWS Open Data), 36 KB per summit;
- `<id>.json`: lake and glacier outlines from OpenStreetMap, through the Overpass API (the public servers are often busy: the script retries).

To change the summits, edit the list at the top of the script and run it again. Check its output: the highest data point should be close to the official altitude. Sharp peaks come out 80-110 m lower at 30 m resolution, and the Mont Aiguille had to be dropped because its cliffs are missing from the data.

The Copernicus and OpenStreetMap licences require the credit shown in the footer. To remove the hillshade, set `SHADING` to `false` in `src/components/Topo.astro`.

## Deployment

`.github/workflows/cicd.yml` builds the site and runs Lighthouse (reports are attached to the workflow run). On `main`, it syncs `dist/` to S3 and invalidates CloudFront. Required secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`.

The infrastructure (S3, CloudFront, Route 53, certificate) is managed with Terraform in the `thomasbach-infra` repository.
