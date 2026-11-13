import { readSession } from './session.ts'
import type { ApiErrorBody, CrewMember, Session, Site } from './types.ts'

// The only file that talks to the API (in the tests, MSW answers instead). Do not edit.
export const API = 'http://localhost:4000/api'

/** An answer that was not OK: the HTTP status and the API's own message */
export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string[]> | undefined

  constructor(status: number, body: ApiErrorBody | null) {
    super(body?.message ?? `The API answered ${status}.`)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = body?.fieldErrors
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return isRecord(value) && typeof value.error === 'string' && typeof value.message === 'string'
}

function isSite(value: unknown): value is Site {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.town === 'string' &&
    typeof value.parking === 'string' &&
    typeof value.description === 'string' &&
    (value.terrain === 'sand' || value.terrain === 'rocky' || value.terrain === 'marsh' || value.terrain === 'mixed')
  )
}

function isCrewMember(value: unknown): value is CrewMember {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    (value.role === 'organizer' || value.role === 'volunteer') &&
    Array.isArray(value.skills) &&
    value.skills.every((skill) => typeof skill === 'string')
  )
}

function isSession(value: unknown): value is Session {
  if (!isRecord(value) || typeof value.token !== 'string' || !isRecord(value.user)) return false
  const { user } = value
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    (user.role === 'organizer' || user.role === 'volunteer')
  )
}

// GET or POST with the session's token, if there is one; throws ApiError for an answer that is not OK
async function request(path: string, init: RequestInit = {}): Promise<unknown> {
  const session = readSession()
  const headers = new Headers(init.headers)
  if (session !== null) {
    headers.set('Authorization', `Bearer ${session.token}`)
  }
  const response = await fetch(`${API}${path}`, { ...init, headers })
  const body: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(response.status, isApiErrorBody(body) ? body : null)
  }
  return body
}

/** GET /api/sites/:id (404 for an unknown id) */
export async function getSite(id: string, signal?: AbortSignal): Promise<Site> {
  const body = await request(`/sites/${encodeURIComponent(id)}`, { signal })
  if (!isSite(body)) {
    throw new Error('The API sent something that is not a beach site.')
  }
  return body
}

/** GET /api/volunteers (organizers only: 401 without a token, 403 for a volunteer) */
export async function getCrew(signal?: AbortSignal): Promise<CrewMember[]> {
  const body = await request('/volunteers?perPage=50', { signal })
  if (!Array.isArray(body) || !body.every(isCrewMember)) {
    throw new Error('The API sent something that is not a crew list.')
  }
  return body
}

/** POST /api/auth/sign-in (400 with fieldErrors for empty fields, 401 for a wrong email or password) */
export async function postSignIn(credentials: { email: string; password: string }): Promise<Session> {
  const body = await request('/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  if (!isSession(body)) {
    throw new Error('The API sent something that is not a session.')
  }
  return body
}
