import type { APIRoute } from "astro";
import { homePath, languages } from "@/i18n";

// Two pages only: a hand-written sitemap, with each page listing its translation.
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://thomasbach.fr");
  const url = (path: string) => new URL(path, base).href;
  const alternates = [
    ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(homePath(l))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url("/")}"/>`,
  ].join("\n");
  const entries = languages
    .map((l) => `  <url>\n    <loc>${url(homePath(l))}</loc>\n${alternates}\n  </url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
