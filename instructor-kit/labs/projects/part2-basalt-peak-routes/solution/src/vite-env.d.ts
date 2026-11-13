// Types for Vite's import.meta.env (Lesson 2.4)

// Unknown VITE_ names become errors instead of any
interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

// The variables this app reads from .env files
interface ImportMetaEnv {
  /** Where the Basalt Peak API runs, if not http://localhost:4400 */
  readonly VITE_API_URL?: string
}
