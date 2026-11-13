// Shoreline Crew HQ's API client (Lessons 2.4, 4.1, 5.2, 5.4, 6.2, 6.3, 7.1, 7.2 and 8.2).
// Data from the API is unknown until a check proves its shape.
import { debrisCategories } from '../utils/debris.ts'
import type {
  ApiErrorBody,
  CleanupEvent,
  CleanupEventDetail,
  DebrisCategory,
  DebrisCount,
  ErrorCode,
  EventChanges,
  EventStatus,
  ImpactReport,
  ImpactTotals,
  NewEvent,
  NewImpactReport,
  PageInfo,
  Photo,
  Role,
  RosterEntry,
  SignInRequest,
  SignInResponse,
  Signup,
  SignupChanges,
  SignupStatus,
  Site,
  Skill,
  Terrain,
  User,
  Volunteer,
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

/** A cleanup as GET /api/events/:id sends it: a CleanupEvent plus its whole site
 * (and, for organizers, the code volunteers type to check in on the day) */
export function isCleanupEventDetail(value: unknown): value is CleanupEventDetail {
  return (
    isCleanupEvent(value) &&
    'site' in value &&
    isSite(value.site) &&
    (!('checkInCode' in value) || typeof value.checkInCode === 'string')
  )
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

export function isSkill(value: unknown): value is Skill {
  return skills.some((skill) => skill === value)
}

/** One person on the crew, as GET /api/volunteers sends them (organizers only) */
function isVolunteer(value: unknown): value is Volunteer {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    (value.phone === null || typeof value.phone === 'string') &&
    roles.some((role) => role === value.role) &&
    Array.isArray(value.skills) &&
    value.skills.every(isSkill) &&
    typeof value.joinedOn === 'string' &&
    typeof value.hoursLogged === 'number'
  )
}

/** One sign-up, as PATCH /api/signups/:id sends it back */
function isSignup(value: unknown): value is Signup {
  return (
    isRecord(value) &&
    signupTextFields.every((key) => typeof value[key] === 'string') &&
    signupStatuses.some((status) => status === value.status) &&
    (value.checkedInAt === null || typeof value.checkedInAt === 'string')
  )
}

/** One row of GET /api/events/:id/signups: a sign-up and the volunteer's contact details */
function isRosterEntry(value: unknown): value is RosterEntry {
  return (
    isSignup(value) &&
    'volunteer' in value &&
    isRecord(value.volunteer) &&
    typeof value.volunteer.id === 'string' &&
    typeof value.volunteer.name === 'string' &&
    typeof value.volunteer.email === 'string' &&
    (value.volunteer.phone === null || typeof value.volunteer.phone === 'string') &&
    Array.isArray(value.volunteer.skills) &&
    value.volunteer.skills.every((skill) => skills.some((known) => known === skill))
  )
}

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

/** A count for every debris category */
function isCategoryCounts(value: unknown): value is Record<DebrisCategory, number> {
  return isRecord(value) && debrisCategories.every((category) => typeof value[category] === 'number')
}

/** One bar of the impact dashboard's chart: a month's cleanups and weight */
function isMonthTotal(value: unknown): value is ImpactTotals['byMonth'][number] {
  return (
    isRecord(value) &&
    typeof value.month === 'string' &&
    typeof value.events === 'number' &&
    typeof value.weightKg === 'number'
  )
}

function isSiteTotal(value: unknown): value is ImpactTotals['bySite'][number] {
  return (
    isRecord(value) &&
    typeof value.siteId === 'string' &&
    typeof value.events === 'number' &&
    typeof value.weightKg === 'number'
  )
}

// The ImpactTotals properties that hold numbers
const totalFields: (keyof ImpactTotals)[] = [
  'events', 'volunteerHours', 'volunteersAttended', 'bags', 'weightKg',
]

/** The crew's totals for the impact dashboard (GET /api/impact) */
function isImpactTotals(value: unknown): value is ImpactTotals {
  return (
    isRecord(value) &&
    totalFields.every((key) => typeof value[key] === 'number') &&
    (value.from === null || typeof value.from === 'string') &&
    (value.to === null || typeof value.to === 'string') &&
    isCategoryCounts(value.byCategory) &&
    isListOf(isMonthTotal)(value.byMonth) &&
    isListOf(isSiteTotal)(value.bySite)
  )
}

/** An uploaded photo, as POST /api/photos sends it back */
function isPhoto(value: unknown): value is Photo {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.url === 'string' &&
    typeof value.contentType === 'string' &&
    typeof value.bytes === 'number'
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
    return 'Your sign-in has ended. Sign in again.'
  }
  if (error instanceof ApiError && error.status === 404) {
    return 'Nothing was found at this address. Check the link.'
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

// What sessionStorage holds, checked: null when nothing (or not a session) is saved
function loadSession(): Session | null {
  const saved = sessionStorage.getItem(sessionKey)
  if (saved === null) return null
  try {
    const value: unknown = JSON.parse(saved)
    return isSignInResponse(value) ? value : null
  } catch {
    return null
  }
}

// The session lives here, outside React, so loaders and actions can read and change it too
let current = loadSession()
const listeners = new Set<() => void>()

/** The current session, or null when nobody is signed in */
export function readSession(): Session | null {
  return current
}

/** Save (or with null, forget) the session, and tell everyone who listens */
export function saveSession(session: Session | null): void {
  if (session === null) {
    sessionStorage.removeItem(sessionKey)
  } else {
    sessionStorage.setItem(sessionKey, JSON.stringify(session))
  }
  current = session
  for (const listener of listeners) {
    listener()
  }
}

/** Call listener after every sign-in and sign-out. Returns a function that stops listening. */
export function onSessionChange(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
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
    if (response.status === 401 && session !== null) {
      // The API no longer knows this sign-in (it restarted, or the session ended): forget it here too
      saveSession(null)
    }
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

/** Totals for every completed cleanup: weight, bags, hours, and by month, debris category and site */
export function getImpactTotals(signal?: AbortSignal): Promise<ImpactTotals> {
  return getJSON('/impact', isImpactTotals, signal)
}

/** The crew, one page at a time; query is a search string such as 'skill=first-aid&page=2' */
export function getVolunteers(query: string, signal?: AbortSignal): Promise<Page<Volunteer>> {
  return readPage(`/volunteers?${query}`, isVolunteer, signal)
}

/** One person. An unknown id is an ApiError with status 404. */
export function getVolunteer(id: string, signal?: AbortSignal): Promise<Volunteer> {
  return getJSON(`/volunteers/${encodeURIComponent(id)}`, isVolunteer, signal)
}

/** Send JSON with POST, PATCH or PUT, and check the JSON that comes back */
async function sendJSON<T>(
  method: 'POST' | 'PATCH' | 'PUT',
  path: string,
  body: unknown,
  isT: (value: unknown) => value is T,
): Promise<T> {
  const response = await request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data: unknown = await response.json()
  if (!isT(data)) {
    throw new Error(`Unexpected data from ${method} /api${path}`)
  }
  return data
}

/** POST /api/auth/sign-in. A wrong email or password is an ApiError with status 401. */
export function postSignIn(credentials: SignInRequest): Promise<Session> {
  return sendJSON('POST', '/auth/sign-in', credentials, isSignInResponse)
}

/** POST /api/auth/sign-out: the API forgets the token */
export async function postSignOut(): Promise<void> {
  await request('/auth/sign-out', { method: 'POST' })
}

/** POST /api/events (organizers). Fields the API rejects are an ApiError with status 400 and fieldErrors. */
export function postEvent(event: NewEvent): Promise<CleanupEvent> {
  return sendJSON('POST', '/events', event, isCleanupEvent)
}

/** PATCH /api/events/:id (organizers): change some fields, such as the status */
export function patchEvent(id: string, changes: EventChanges): Promise<CleanupEvent> {
  return sendJSON('PATCH', `/events/${encodeURIComponent(id)}`, changes, isCleanupEvent)
}

/** PATCH /api/signups/:id (organizers): mark someone as attended, a no-show, or back to confirmed */
export function patchSignup(id: string, changes: SignupChanges): Promise<Signup> {
  return sendJSON('PATCH', `/signups/${encodeURIComponent(id)}`, changes, isSignup)
}

/** PUT /api/events/:id/impact (organizers): save or replace a cleanup's impact report */
export function putImpact(eventId: string, report: NewImpactReport): Promise<ImpactReport> {
  return sendJSON('PUT', `/events/${encodeURIComponent(eventId)}/impact`, report, isImpactReport)
}

/** POST /api/photos (signed in): upload one image file as multipart/form-data */
export async function postPhoto(file: File): Promise<Photo> {
  const body = new FormData()
  body.append('photo', file)
  // No Content-Type header: fetch writes multipart/form-data with the boundary that separates the parts
  const response = await request('/photos', { method: 'POST', body })
  const data: unknown = await response.json()
  if (!isPhoto(data)) {
    throw new Error('Unexpected data from POST /api/photos')
  }
  return data
}
