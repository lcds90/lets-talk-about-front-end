/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// shims.d.ts

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_GRAVATAR_TOKEN: string
  readonly SSR: boolean
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
