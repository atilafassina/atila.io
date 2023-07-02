/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly XATA_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
