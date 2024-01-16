/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_URL: string
    readonly VITE_KEY_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
