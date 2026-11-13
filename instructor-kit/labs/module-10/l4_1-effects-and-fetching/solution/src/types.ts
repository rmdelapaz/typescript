// The fields of a shoreline-api cleanup this lab reads (the full type is CleanupEvent, Lesson 2.4)
export interface EventSummary {
  id: string
  title: string
  siteId: string
  date: string
}

/** The API's error body: { "error": "server_error", "message": "..." } */
export interface ApiErrorBody {
  error: string
  message: string
}
