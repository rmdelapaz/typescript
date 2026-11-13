// The API client (the HQ's client.ts, trimmed): data from the API is unknown until a check proves its shape.
import { itemStatusLabels } from '../utils/labels.ts'
import type { ApiErrorBody, ErrorCode, Item, ItemStatus, NewItem } from './types.ts'

// ---------------------------------------------------------------- checking data

/** An object (not null, not an array), so its properties can be read */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** One of the statuses the labels table knows (and the table knows them all) */
function isItemStatus(value: unknown): value is ItemStatus {
  return typeof value === 'string' && Object.hasOwn(itemStatusLabels, value)
}

export function isItem(value: unknown): value is Item {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isItemStatus(value.status) &&
    (value.notes === null || typeof value.notes === 'string') &&
    typeof value.createdAt === 'string'
  )
}

/** A check for one item becomes a check for a list of them */
function isListOf<T>(isT: (value: unknown) => value is T) {
  return (value: unknown): value is T[] => Array.isArray(value) && value.every(isT)
}

// A Record, not an array: a new ErrorCode is a type error here until it is listed
const errorCodes: Record<ErrorCode, true> = {
  validation_failed: true,
  not_found: true,
  server_error: true,
  conflict: true,
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    isRecord(value) &&
    typeof value.error === 'string' &&
    Object.hasOwn(errorCodes, value.error) &&
    typeof value.message === 'string'
  )
}

// ---------------------------------------------------------------- errors

/** The API answered, but with an error status (400, 404, 500, ...) */
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
  if (error instanceof ApiError && error.status === 404) {
    return 'Nothing was found at this address. Check the link.'
  }
  if (error instanceof ApiError) {
    return `The server had a problem (${error.status}). Try again in a moment.`
  }
  if (error instanceof TypeError) {
    return 'Could not reach the server. Check your connection, then try again.'
  }
  return 'Something unexpected went wrong. Try again in a moment.'
}

// ---------------------------------------------------------------- talking to the API

function apiBaseUrl(): string {
  // The demo's API runs in the browser and answers on the site's own address (Lesson 10.2)
  if (import.meta.env.MODE === 'demo') {
    return window.location.origin
  }
  const url = import.meta.env.VITE_API_URL
  if (url === undefined || url === '') {
    throw new Error('VITE_API_URL is not set: copy .env.example to .env.local, or use npm run dev:demo')
  }
  return url
}

/** Send a request to a path under /api. Throws ApiError on an error status. */
async function request(path: string, init: RequestInit = {}): Promise<Response> {
  const response = await fetch(`${apiBaseUrl()}/api${path}`, init)
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    throw new ApiError(
      response.status,
      isApiErrorBody(body) ? body : { error: 'server_error', message: `HTTP ${response.status}` },
    )
  }
  return response
}

/** GET a path and check the JSON with a type predicate before anyone uses it */
async function getJSON<T>(path: string, isT: (value: unknown) => value is T, signal?: AbortSignal): Promise<T> {
  const response = await request(path, { signal })
  const data: unknown = await response.json()
  if (!isT(data)) {
    throw new Error(`Unexpected data from GET /api${path}`)
  }
  return data
}

/** POST a JSON body and check the answer */
async function postJSON<T>(path: string, body: unknown, isT: (value: unknown) => value is T): Promise<T> {
  const response = await request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data: unknown = await response.json()
  if (!isT(data)) {
    throw new Error(`Unexpected data from POST /api${path}`)
  }
  return data
}

export function getItems(signal?: AbortSignal): Promise<Item[]> {
  return getJSON('/items', isListOf(isItem), signal)
}

export function getItem(itemId: string, signal?: AbortSignal): Promise<Item> {
  return getJSON(`/items/${encodeURIComponent(itemId)}`, isItem, signal)
}

export function postItem(item: NewItem): Promise<Item> {
  return postJSON('/items', item, isItem)
}
