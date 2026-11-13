// Shoreline Crew HQ's API client (Lesson 2.4).
// Data from the API is unknown until a check proves its shape.
import type { CleanupEvent, EventStatus } from './types.ts'

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

function isCleanupEventList(value: unknown): value is CleanupEvent[] {
  return Array.isArray(value) && value.every(isCleanupEvent)
}

// ---------------------------------------------------------------- talking to the API

function apiBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL
  if (url === undefined || url === '') {
    throw new Error('VITE_API_URL is not set: copy .env.example to .env.local')
  }
  return url
}

/** GET a path under /api and return the JSON body, unchecked */
export async function apiFetch(path: string): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl()}/api${path}`)
  if (!response.ok) {
    throw new Error(`GET /api${path} failed: HTTP ${response.status}`)
  }
  return response.json()
}

/** GET a path and check the JSON with a type predicate before anyone uses it */
export async function getJSON<T>(path: string, isT: (value: unknown) => value is T): Promise<T> {
  const data = await apiFetch(path)
  if (!isT(data)) {
    throw new Error(`Unexpected data from GET /api${path}`)
  }
  return data
}

export function getEvents(): Promise<CleanupEvent[]> {
  return getJSON('/events', isCleanupEventList)
}
