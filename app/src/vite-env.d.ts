/// <reference types="vite/client" />

//env var name should start with VITE_
interface ImportMetaEnv {
  readonly VITE_REDDIT_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
