// Types for Vite's import.meta.env (Lesson 2.4)

// Unknown VITE_ names become errors instead of any
interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

// The variables this app reads from .env files
interface ImportMetaEnv {
  /** Where your real API runs, such as http://localhost:4000 (not used by the demo scripts) */
  readonly VITE_API_URL?: string
}
