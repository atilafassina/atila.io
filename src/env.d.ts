/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly XATA_API_KEY: string
  readonly SUPABASE_KEY: string
  readonly SUPABASE_DB: string
  readonly YOUTUBE_API_TOKEN: string
  readonly YOUTUBE_CHANNEL_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
