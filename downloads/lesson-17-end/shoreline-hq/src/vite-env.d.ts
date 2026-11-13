// Types for Vite's import.meta.env (Lesson 2.4)

// Unknown VITE_ names become errors instead of any
interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

// The variables this app reads from .env files
interface ImportMetaEnv {
  /** Where shoreline-api runs, such as http://localhost:4000 */
  readonly VITE_API_URL?: string
}
