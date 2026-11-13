import type { ApiErrorBody, EventSummary } from './types.ts'

/** The API answered, but with an error status (404, 500, ...) */
export class ApiError extends Error {
  readonly status: number

  constructor(status: number, body: ApiErrorBody) {
    super(body.message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Task 2a: the cleanups at one site. fetch() only rejects when no answer arrives: an answer with an error
// status still resolves. TODO 2a: when the answer is not ok, throw an ApiError with its status and body.
export async function fetchSiteEvents(apiUrl: string, siteId: string, signal?: AbortSignal): Promise<EventSummary[]> {
  const response = await fetch(`${apiUrl}/api/events?siteId=${encodeURIComponent(siteId)}&perPage=50`, { signal })
  return (await response.json()) as EventSummary[]
}
