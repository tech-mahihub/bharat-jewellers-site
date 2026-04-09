import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bharatjewellers.ca",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/404/") &&
        !page.endsWith("/thank-you/"),
    }),
  ],
});
