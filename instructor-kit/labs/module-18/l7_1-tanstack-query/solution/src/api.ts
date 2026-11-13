// A tiny API client in the HQ's style (Lessons 2.4 and 4.1). Given: nothing to change here.
import type { CleanupEvent, Site } from './types.ts'

// The address MSW answers in the tests (the HQ reads it from VITE_API_URL)
export const API_URL = 'http://api.test'

/** An answer that is not 2xx, with the API's status and message (like the HQ's ApiError) */
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isSite(value: unknown): value is Site {
  return isRecord(value) && typeof value.id === 'string' && typeof value.name === 'string' && typeof value.town === 'string'
}

function isCleanupEvent(value: unknown): value is CleanupEvent {
  return isRecord(value) && typeof value.id === 'string' && typeof value.title === 'string' && typeof value.siteId === 'string'
}

async function getList<T>(path: string, isT: (value: unknown) => value is T, signal?: AbortSignal): Promise<T[]> {
  const response = await fetch(API_URL + path, { signal })
  const body: unknown = await response.json()
  if (!response.ok) {
    const message = isRecord(body) && typeof body.message === 'string' ? body.message : `HTTP ${response.status}`
    throw new ApiError(response.status, message)
  }
  if (!Array.isArray(body) || !body.every(isT)) {
    throw new Error(`${path}: not the list the HQ expects`)
  }
  return body
}

/** GET /api/sites: the six beach sites */
export function getSites(signal?: AbortSignal): Promise<Site[]> {
  return getList('/api/sites', isSite, signal)
}

/** GET /api/events?siteId=…: the cleanups at one site */
export function getSiteEvents(siteId: string, signal?: AbortSignal): Promise<CleanupEvent[]> {
  return getList(`/api/events?siteId=${encodeURIComponent(siteId)}&perPage=50`, isCleanupEvent, signal)
}
