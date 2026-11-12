import { getCollection, type CollectionEntry } from "astro:content";
import { pick, ui, type Lang } from "@/i18n";
import type { IconName } from "@/lib/icons";

const videos = import.meta.glob<string>("/src/content/projects/*/*.{mp4,webm}", {
  query: "?url",
  import: "default",
  eager: true,
});

export interface ProjectLink {
  href: string;
  label: string;
  icon: IconName;
}

function linkFor(entry: CollectionEntry<"projects">, lang: Lang): ProjectLink | undefined {
  const { link, linkLabel } = entry.data;
  if (!link) return undefined;
  const url = new URL(link);
  const host = url.hostname.replace(/^www\./, "");
  const custom = linkLabel ? pick(linkLabel, lang) : undefined;
  if (host === "github.com")
    return { href: link, label: custom ?? `github.com${url.pathname.replace(/\/$/, "")}`, icon: "github" };
  if (host.endsWith("itch.io")) return { href: link, label: custom ?? ui[lang].playOnItch, icon: "itch" };
  if (host === "youtube.com" || host === "youtu.be")
    return { href: link, label: custom ?? ui[lang].watchDemo, icon: "youtube" };
  return { href: link, label: custom ?? host, icon: "globe" };
}

function videoFor(entry: CollectionEntry<"projects">): string | undefined {
  const { video } = entry.data;
  if (!video || !entry.filePath) return undefined;
  const dir = entry.filePath.replace(/\/index\.md$/, "");
  const url = videos[`/${dir}/${video.replace(/^\.\//, "")}`];
  if (!url) throw new Error(`Video "${video}" not found for project ${entry.id}`);
  return url;
}

export async function getProjects(lang: Lang) {
  const entries = await getCollection("projects");
  return entries
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((entry) => ({
      id: entry.id,
      title: pick(entry.data.title, lang),
      year: entry.data.date.getFullYear(),
      date: entry.data.date,
      description: pick(entry.data.description, lang),
      cover: entry.data.cover,
      coverAlt: pick(entry.data.coverAlt, lang),
      video: videoFor(entry),
      link: linkFor(entry, lang),
    }));
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number];
