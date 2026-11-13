// Shoreline Crew HQ's API client (Lessons 2.4, 4.1, 5.2 and 5.4).
// Data from the API is unknown until a check proves its shape.
import type {
  ApiErrorBody,
  CleanupEvent,
  CleanupEventDetail,
  DebrisCategory,
  DebrisCount,
  ErrorCode,
  EventStatus,
  ImpactReport,
  PageInfo,
  Role,
  RosterEntry,
  SignInRequest,
  SignInResponse,
  Signup,
  SignupStatus,
  Site,
  Skill,
  Terrain,
  User,
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

/** A cleanup as GET /api/events/:id sends it: a CleanupEvent plus its whole site */
export function isCleanupEventDetail(value: unknown): value is CleanupEventDetail {
  return isCleanupEvent(value) && 'site' in value && isSite(value.site)
}

/** A check for one item becomes a check for a list of them */
function isListOf<T>(isT: (value: unknown) => value is T) {
  return (value: unknown): value is T[] => Array.isArray(value) && value.every(isT)
}

const roles: Role[] = ['organizer', 'volunteer']

function isUser(value: unknown): value is User {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    roles.some((role) => role === value.role)
  )
}

function isSignInResponse(value: unknown): value is SignInResponse {
  return isRecord(value) && typeof value.token === 'string' && isUser(value.user)
}

const signupStatuses: SignupStatus[] = ['confirmed', 'waitlisted', 'cancelled', 'attended', 'no-show']
const signupTextFields: (keyof Signup)[] = ['id', 'eventId', 'volunteerId', 'note', 'createdAt']
const skills: Skill[] = [
  'first-aid', 'boat-handling', 'heavy-lifting', 'photography', 'data-recording', 'team-lead',
]

/** One row of GET /api/events/:id/signups: a sign-up and the volunteer's contact details */
function isRosterEntry(value: unknown): value is RosterEntry {
  return (
    isRecord(value) &&
    signupTextFields.every((key) => typeof value[key] === 'string') &&
    signupStatuses.some((status) => status === value.status) &&
    (value.checkedInAt === null || typeof value.checkedInAt === 'string') &&
    isRecord(value.volunteer) &&
    typeof value.volunteer.id === 'string' &&
    typeof value.volunteer.name === 'string' &&
    typeof value.volunteer.email === 'string' &&
    (value.volunteer.phone === null || typeof value.volunteer.phone === 'string') &&
    Array.isArray(value.volunteer.skills) &&
    value.volunteer.skills.every((skill) => skills.some((known) => known === skill))
  )
}

const debrisCategories: DebrisCategory[] = [
  'plastic-bottles', 'plastic-bags', 'food-wrappers', 'bottle-caps', 'cigarette-butts',
  'fishing-gear', 'glass', 'metal', 'foam', 'other',
]

function isDebrisCount(value: unknown): value is DebrisCount {
  return (
    isRecord(value) &&
    debrisCategories.some((category) => category === value.category) &&
    typeof value.count === 'number'
  )
}

/** The organizers' summary of a completed cleanup (GET /api/events/:id/impact) */
function isImpactReport(value: unknown): value is ImpactReport {
  return (
    isRecord(value) &&
    typeof value.eventId === 'string' &&
    typeof value.volunteersAttended === 'number' &&
    typeof value.bags === 'number' &&
    typeof value.weightKg === 'number' &&
    isListOf(isDebrisCount)(value.items) &&
    typeof value.notes === 'string' &&
    isStringArray(value.photoIds) &&
    typeof value.submittedAt === 'string'
  )
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
  if (error instanceof ApiError && error.status === 401) {
    return 'Your sign-in has ended. Sign out, then sign in again.'
  }
  if (error instanceof ApiError) {
    return `The server had a problem (${error.status}). Try again in a moment.`
  }
  if (error instanceof TypeError) {
    return 'Could not reach the server. Check that shoreline-api is running, then try again.'
  }
  return 'Something unexpected went wrong. Try again in a moment.'
}

// ---------------------------------------------------------------- the session

/** A signed-in organizer or volunteer: the API's token, and who it belongs to */
export type Session = SignInResponse

// sessionStorage: kept when the page reloads, gone when the tab closes, never shared with other tabs
const sessionKey = 'shoreline-hq-session'

/** The saved session, or null when nobody is signed in (or what is saved is not a session) */
export function readSession(): Session | null {
  const saved = sessionStorage.getItem(sessionKey)
  if (saved === null) return null
  try {
    const value: unknown = JSON.parse(saved)
    return isSignInResponse(value) ? value : null
  } catch {
    return null
  }
}

export function saveSession(session: Session | null): void {
  if (session === null) {
    sessionStorage.removeItem(sessionKey)
  } else {
    sessionStorage.setItem(sessionKey, JSON.stringify(session))
  }
}

// ---------------------------------------------------------------- talking to the API

function apiBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL
  if (url === undefined || url === '') {
    throw new Error('VITE_API_URL is not set: copy .env.example to .env.local')
  }
  return url
}

/** Send a request to a path under /api, signed in if there is a session. Throws ApiError on an error status. */
async function request(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  const session = readSession()
  if (session !== null) {
    headers.set('Authorization', `Bearer ${session.token}`)
  }
  const response = await fetch(`${apiBaseUrl()}/api${path}`, { ...init, headers })
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
  const response = await request(path, { signal })
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
  const response = await request(path, { signal })
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

/** One cleanup with its site. An unknown id (or a draft) is an ApiError with status 404. */
export function getEvent(id: string, signal?: AbortSignal): Promise<CleanupEventDetail> {
  return getJSON(`/events/${encodeURIComponent(id)}`, isCleanupEventDetail, signal)
}

/** Today's roster for one cleanup (organizers only: it has contact details) */
export function getRoster(eventId: string, signal?: AbortSignal): Promise<RosterEntry[]> {
  return getJSON(`/events/${encodeURIComponent(eventId)}/signups`, isListOf(isRosterEntry), signal)
}

/** A completed cleanup's impact report. No report yet is an ApiError with status 404. */
export function getImpact(eventId: string, signal?: AbortSignal): Promise<ImpactReport> {
  return getJSON(`/events/${encodeURIComponent(eventId)}/impact`, isImpactReport, signal)
}

/** POST /api/auth/sign-in. A wrong email or password is an ApiError with status 401. */
export async function postSignIn(credentials: SignInRequest): Promise<Session> {
  const response = await request('/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const data: unknown = await response.json()
  if (!isSignInResponse(data)) {
    throw new Error('Unexpected data from POST /api/auth/sign-in')
  }
  return data
}

/** POST /api/auth/sign-out: the API forgets the token */
export async function postSignOut(): Promise<void> {
  await request('/auth/sign-out', { method: 'POST' })
}
