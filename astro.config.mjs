// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://thomasbach.fr",
  // The CSS is small: inline it rather than block rendering on extra requests.
  build: { inlineStylesheets: "always" },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: { prefixDefaultLocale: false },
  },
});
