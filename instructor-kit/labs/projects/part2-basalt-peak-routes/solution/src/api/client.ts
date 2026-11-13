// Basalt Peak Routes' API client: the ONLY file that calls fetch (Lessons 2.4, 4.1, 4.2 and 6.3).
// Data from the API is unknown until a check proves its shape.
import { readSession, saveSession } from '../auth/session.ts'
import type {
  ApiErrorBody, ClimbRoute, ErrorCode, Grade, HoldColor, NewRoute, Role, RouteStatus, Session, Wall, WallId,
} from './types.ts'

/** Where the API runs: `npm run api` starts it on port 4400 (.env.local can change it) */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4400'

// ---------------------------------------------------------------- the values each union allows

export const wallIds: readonly WallId[] = ['the-slab', 'the-cave', 'the-prow', 'kids-corner']
export const grades: readonly Grade[] = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7']
export const holdColors: readonly HoldColor[] = ['red', 'blue', 'green', 'yellow', 'purple', 'black']
const statuses: readonly RouteStatus[] = ['active', 'retired']
const roles: readonly Role[] = ['setter', 'staff']

export function isWallId(value: unknown): value is WallId {
  return wallIds.some((id) => id === value)
}

export function isGrade(value: unknown): value is Grade {
  return grades.some((grade) => grade === value)
}

export function isHoldColor(value: unknown): value is HoldColor {
  return holdColors.some((color) => color === value)
}

// ---------------------------------------------------------------- checking answers

/** An object (not null, not an array), so its properties can be read */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** A check for one item becomes a check for a list of them */
function isListOf<T>(isT: (value: unknown) => value is T) {
  return (value: unknown): value is T[] => Array.isArray(value) && value.every(isT)
}

export function isWall(value: unknown): value is Wall {
  return isRecord(value) && isWallId(value.id) && typeof value.name === 'string'
}

export function isClimbRoute(value: unknown): value is ClimbRoute {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isWallId(value.wallId) &&
    isGrade(value.grade) &&
    isHoldColor(value.holdColor) &&
    typeof value.setter === 'string' &&
    typeof value.setOn === 'string' &&
    statuses.some((status) => status === value.status)
  )
}

function isRole(value: unknown): value is Role {
  return roles.some((role) => role === value)
}

export function isSession(value: unknown): value is Session {
  return (
    isRecord(value) &&
    typeof value.token === 'string' &&
    isRecord(value.user) &&
    typeof value.user.id === 'string' &&
    typeof value.user.name === 'string' &&
    isRole(value.user.role)
  )
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return isRecord(value) && typeof value.error === 'string' && typeof value.message === 'string'
}

// ---------------------------------------------------------------- errors

/** The API answered, but with an error status (400, 401, 403, 404, 500, ...) */
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
    return `${error.message} (the API answered ${error.status})`
  }
  if (error instanceof TypeError) {
    return 'Could not reach the Basalt Peak API. Is `npm run api` running in another terminal?'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something unexpected went wrong.'
}

// ---------------------------------------------------------------- talking to the API

/** Send a request to a path under /api, signed in if there is a session. Throws ApiError on an error status. */
async function request(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  const session = readSession()
  if (session !== null) {
    headers.set('Authorization', `Bearer ${session.token}`)
  }
  const response = await fetch(`${API_URL}/api${path}`, { ...init, headers })
  if (!response.ok) {
    if (response.status === 401 && session !== null) {
      // The API no longer knows this sign-in (it restarted): forget it here too
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

/** Send a request and check the JSON answer with a type predicate before anyone uses it */
async function requestJSON<T>(
  method: string,
  path: string,
  isT: (value: unknown) => value is T,
  init: RequestInit = {},
): Promise<T> {
  const response = await request(path, { ...init, method })
  const data: unknown = await response.json()
  if (!isT(data)) {
    throw new Error(`Unexpected data from ${method} /api${path}`)
  }
  return data
}

/** A JSON body for POST and PATCH */
function jsonBody(body: unknown): RequestInit {
  return { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
}

/** The four walls, in the gym's order */
export function getWalls(signal?: AbortSignal): Promise<Wall[]> {
  return requestJSON('GET', '/walls', isListOf(isWall), { signal })
}

/** What GET /api/routes can filter by (missing = every wall, every grade) */
export interface RouteFilters {
  wall?: WallId | undefined
  grade?: Grade | undefined
}

/** The active routes, sorted by wall, grade and name */
export function getRoutes(filters: RouteFilters = {}, signal?: AbortSignal): Promise<ClimbRoute[]> {
  const params = new URLSearchParams()
  if (filters.wall !== undefined) params.set('wall', filters.wall)
  if (filters.grade !== undefined) params.set('grade', filters.grade)
  const query = params.size > 0 ? `?${params}` : ''
  return requestJSON('GET', `/routes${query}`, isListOf(isClimbRoute), { signal })
}

/** One route, active or retired. An unknown id is an ApiError with status 404. */
export function getRoute(id: string, signal?: AbortSignal): Promise<ClimbRoute> {
  return requestJSON('GET', `/routes/${encodeURIComponent(id)}`, isClimbRoute, { signal })
}

/** POST /api/auth/sign-in. A wrong email or password is an ApiError with status 401. */
export function postSignIn(email: string, password: string): Promise<Session> {
  return requestJSON('POST', '/auth/sign-in', isSession, jsonBody({ email, password }))
}

/** What the setter's form holds: text from the fields, which the API checks (NewRoute is what it accepts) */
export type RouteForm = Record<keyof NewRoute, string>

/** POST /api/routes (setters only): the new route. Mistakes are an ApiError with status 400 and fieldErrors. */
export function postRoute(form: RouteForm): Promise<ClimbRoute> {
  return requestJSON('POST', '/routes', isClimbRoute, jsonBody(form))
}
