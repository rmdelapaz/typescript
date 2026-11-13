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

// Task 2a: the cleanups at one site; an error status becomes an ApiError
export async function fetchSiteEvents(apiUrl: string, siteId: string, signal?: AbortSignal): Promise<EventSummary[]> {
  const response = await fetch(`${apiUrl}/api/events?siteId=${encodeURIComponent(siteId)}&perPage=50`, { signal })
  if (!response.ok) {
    throw new ApiError(response.status, (await response.json()) as ApiErrorBody)
  }
  return (await response.json()) as EventSummary[]
}
