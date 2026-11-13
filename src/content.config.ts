import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** A string used for both languages, or one string per language. */
const localized = z.union([z.string(), z.object({ en: z.string(), fr: z.string() })]);

const projects = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: localized,
      date: z.coerce.date(),
      description: localized,
      cover: image(),
      coverAlt: localized,
      /** Optional short looping video (mp4) played on hover, next to index.md. */
      video: z.string().optional(),
      link: z.url().optional(),
      /** Overrides the label guessed from the link (GitHub, itch.io, YouTube...). */
      linkLabel: localized.optional(),
    }),
});

export const collections = { projects };
