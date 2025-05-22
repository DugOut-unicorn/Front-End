/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_KAKAO_JS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
