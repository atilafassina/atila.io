import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/edge";
import sitemap from "@astrojs/sitemap";
import { pages } from "./pages.codegen.json";

export default defineConfig({
  output: "server",
  site: "https://atila.io",
  integrations: [
    tailwind(),
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: pages,
      serialize: (item) => {
        if (
          /writing/.test(item.url) ||
          /channel/.test(item.url) ||
          /talks/.test(item.url)
        ) {
          item.changefreq = "weekly";
          item.lastmod = new Date();
          item.priority = 1;
        }

        return item;
      },
    }),
  ],
  adapter: vercel({
    analytics: true,
  }),
});
