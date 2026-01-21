import { solidStart } from "@solidjs/start/config";
import { defineConfig, loadEnv } from "vite";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    publicDir: "public",
    plugins: [
      solidStart({
        middleware: "./src/middleware/index.ts",
      }),
      nitroV2Plugin({
        preset: "vercel",
        prerender: {
          crawlLinks: true,
        },
      }),
    ],
    environments: {
      ssr: {
        define: {
          "process.env.NEON_DB_URL": JSON.stringify(env.NEON_DB_URL),
          "process.env.YOUTUBE_API_TOKEN": JSON.stringify(
            env.YOUTUBE_API_TOKEN,
          ),
          "process.env.YOUTUBE_CHANNEL_ID": JSON.stringify(
            env.YOUTUBE_CHANNEL_ID,
          ),
          "process.env.GITHUB_TOKEN": JSON.stringify(env.GITHUB_TOKEN),
        },
      },
    },
  };
});
