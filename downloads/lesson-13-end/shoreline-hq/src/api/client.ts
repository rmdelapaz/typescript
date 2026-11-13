// Shoreline Crew HQ's API client (Lessons 2.4 and 4.1).
// Data from the API is unknown until a check proves its shape.
import type {
  ApiErrorBody,
  CleanupEvent,
  ErrorCode,
  EventStatus,
  PageInfo,
  Site,
  Terrain,
} from './types.ts'

// ---------------------------------------------------------------- checking data

/** An object (not null, not an array), so its properties can be read */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

const eventStatuses: EventStatus[] = ['draft', 'scheduled', 'completed', 'cancelled']

export function isEventStatus(value: unknown): value is EventStatus {
  return eventStatuses.some((status) => status === value)
}

// The CleanupEvent properties that hold text
const eventTextFields: (keyof CleanupEvent)[] = [
  'id', 'title', 'siteId', 'date', 'startTime', 'endTime',
  'meetingPoint', 'description', 'leadOrganizerId', 'createdAt', 'updatedAt',
]

export function isCleanupEvent(value: unknown): value is CleanupEvent {
  return (
    isRecord(value) &&
    eventTextFields.every((key) => typeof value[key] === 'string') &&
    isEventStatus(value.status) &&
    typeof value.capacity === 'number' &&
    typeof value.spotsTaken === 'number' &&
    isStringArray(value.suppliesProvided)
  )
}

const terrains: Terrain[] = ['sand', 'rocky', 'marsh', 'mixed']
const siteTextFields: (keyof Site)[] = ['id', 'name', 'town', 'parking', 'description']

export function isSite(value: unknown): value is Site {
  return (
    isRecord(value) &&
    siteTextFields.every((key) => typeof value[key] === 'string') &&
    terrains.some((terrain) => terrain === value.terrain) &&
    typeof value.accessible === 'boolean' &&
    typeof value.latitude === 'number' &&
    typeof value.longitude === 'number' &&
    isRecord(value.image) &&
    typeof value.image.url === 'string' &&
    typeof value.image.alt === 'string' &&
    typeof value.image.width === 'number' &&
    typeof value.image.height === 'number'
  )
}

/** A check for one item becomes a check for a list of them */
function isListOf<T>(isT: (value: unknown) => value is T) {
  return (value: unknown): value is T[] => Array.isArray(value) && value.every(isT)
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return isRecord(value) && typeof value.error === 'string' && typeof value.message === 'string'
}

// ---------------------------------------------------------------- errors

/** The API answered, but with an error status (404, 500, ...) */
export class ApiError extends Error {
  readonly status: number
  readonly code: ErrorCode
  readonly fieldErrors: Record<string, string[]> | undefined

  constructor(status: number, body: ApiErrorBody) {
    super(body.message)
    this.name = 'ApiError'
    this.status = status
    this.code = body.error
    this.fieldErrors = body.fieldErrors
  }
}

/** What to tell people when a request failed */
export function describeError(error: unknown): string {
  if (error instanceof ApiError) {
    return `The server had a problem (${error.status}). Try again in a moment.`
  }
  if (error instanceof TypeError) {
    return 'Could not reach the server. Check that shoreline-api is running, then try again.'
  }
  return 'Something unexpected went wrong. Try again in a moment.'
}

// ---------------------------------------------------------------- talking to the API

function apiBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL
  if (url === undefined || url === '') {
    throw new Error('VITE_API_URL is not set: copy .env.example to .env.local')
  }
  return url
}

/** GET a path under /api. Throws ApiError when the API answers with an error status. */
async function request(path: string, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(`${apiBaseUrl()}/api${path}`, { signal })
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    throw new ApiError(
      response.status,
      isApiErrorBody(body) ? body : { error: 'server_error', message: `HTTP ${response.status}` },
    )
  }
  return response
}

/** GET a path under /api and return the JSON body, unchecked */
export async function apiFetch(path: string, signal?: AbortSignal): Promise<unknown> {
  const response = await request(path, signal)
  return response.json()
}

/** GET a path and check the JSON with a type predicate before anyone uses it */
export async function getJSON<T>(
  path: string,
  isT: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<T> {
  const data = await apiFetch(path, signal)
  if (!isT(data)) {
    throw new Error(`Unexpected data from GET /api${path}`)
  }
  return data
}

/** One page of a list, and where it sits in the whole list */
export interface Page<T> {
  items: T[]
  page: PageInfo
}

/** GET a list: the items are in the body, the page numbers in the response headers */
export async function readPage<T>(
  path: string,
  isItem: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<Page<T>> {
  const response = await request(path, signal)
  const items: unknown = await response.json()
  if (!isListOf(isItem)(items)) {
    throw new Error(`Unexpected data from GET /api${path}`)
  }
  // page and perPage are what we asked for (or the API's defaults, 1 and 10)
  const url = new URL(response.url)
  return {
    items,
    page: {
      page: Number(url.searchParams.get('page') ?? '1'),
      perPage: Number(url.searchParams.get('perPage') ?? '10'),
      total: Number(response.headers.get('X-Total-Count')),
      totalPages: Number(response.headers.get('X-Total-Pages')),
    },
  }
}

export function getSites(signal?: AbortSignal): Promise<Site[]> {
  return getJSON('/sites', isListOf(isSite), signal)
}

/** Cleanups; query is a search string such as 'status=scheduled&perPage=50' */
export function getEvents(query: string, signal?: AbortSignal): Promise<Page<CleanupEvent>> {
  return readPage(`/events?${query}`, isCleanupEvent, signal)
}
