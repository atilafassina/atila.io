import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  middleware: "./src/middleware/index.ts",
  server: {
    preset: "cloudflare-module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    prerender: {
      crawlLinks: true,
    },
  },
});
