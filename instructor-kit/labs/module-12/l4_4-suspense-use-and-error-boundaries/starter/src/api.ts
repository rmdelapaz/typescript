// Given (no task here): one beach site from the API. An error status becomes an ApiError.
export const API_URL = 'http://api.test'   // the tests' pretend server (MSW answers it)

export interface SiteFacts {
  id: string
  name: string
  town: string
  parking: string
}

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function fetchSite(id: string): Promise<SiteFacts> {
  const response = await fetch(`${API_URL}/api/sites/${encodeURIComponent(id)}`)
  const body: unknown = await response.json()
  if (!response.ok) {
    const message = typeof body === 'object' && body !== null && 'message' in body ? String(body.message) : `HTTP ${response.status}`
    throw new ApiError(response.status, message)
  }
  return body as SiteFacts
}
