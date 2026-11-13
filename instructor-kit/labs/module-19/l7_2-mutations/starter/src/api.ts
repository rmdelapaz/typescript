// A tiny API client in the HQ's style (Lessons 2.4, 4.1 and 7.2). Given: nothing to change here.
// The person is Theo, a volunteer: the real API would need his token; MSW does not ask for one.
import type { CleanupSummary, MySignup, Signup, SignupStatus } from './types.ts'

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

function isSignup(value: unknown): value is Signup {
  return isRecord(value) && typeof value.id === 'string' && typeof value.eventId === 'string' && typeof value.status === 'string'
}

function isCleanupSummary(value: unknown): value is CleanupSummary {
  return isRecord(value) && typeof value.id === 'string' && typeof value.title === 'string' &&
    typeof value.capacity === 'number' && typeof value.spotsTaken === 'number'
}

function isMySignup(value: unknown): value is MySignup {
  return isSignup(value) && 'event' in value && isCleanupSummary(value.event)
}

async function send<T>(path: string, init: RequestInit, isT: (value: unknown) => value is T): Promise<T> {
  const response = await fetch(API_URL + path, init)
  const body: unknown = await response.json()
  if (!response.ok) {
    const message = isRecord(body) && typeof body.message === 'string' ? body.message : `HTTP ${response.status}`
    throw new ApiError(response.status, message)
  }
  if (!isT(body)) {
    throw new Error(`${path}: not the answer the app expects`)
  }
  return body
}

const json = (method: 'POST' | 'PATCH', body: unknown): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

/** GET /api/events/:id */
export function getEvent(eventId: string, signal?: AbortSignal): Promise<CleanupSummary> {
  return send(`/api/events/${eventId}`, { signal }, isCleanupSummary)
}

/** GET /api/me/signups: Theo's sign-ups, newest first */
export function getMySignups(signal?: AbortSignal): Promise<MySignup[]> {
  const isList = (value: unknown): value is MySignup[] => Array.isArray(value) && value.every(isMySignup)
  return send('/api/me/signups', { signal }, isList)
}

/** POST /api/events/:id/signups: sign yourself up ('waitlisted' when the cleanup is full) */
export function postSignup(eventId: string): Promise<Signup> {
  return send(`/api/events/${eventId}/signups`, json('POST', {}), isSignup)
}

/** PATCH /api/signups/:id */
export function patchSignup(signupId: string, changes: { status: SignupStatus }): Promise<Signup> {
  return send(`/api/signups/${signupId}`, json('PATCH', changes), isSignup)
}
