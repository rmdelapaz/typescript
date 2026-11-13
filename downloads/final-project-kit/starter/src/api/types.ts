// YOUR DOMAIN TYPES: write these first (Milestone 1). Every other file builds on them.
// The example below is one kind of thing, an Item. Add your brief's types next to it; Milestone 2
// replaces the Item pages with yours and deletes Item: then TypeScript lists every file still to change.

/** When something happened: an ISO date and time in UTC, such as "2026-05-01T16:30:00.000Z" */
export type Timestamp = string

/** A union of literal types, not a string: TypeScript knows every value (Lesson 2.2) */
export type ItemStatus = 'open' | 'done'

/** One thing your app lists and shows (the example: rename it and give it your fields) */
export interface Item {
  id: string
  name: string
  status: ItemStatus
  /** null when nobody wrote any (an empty answer, not a missing one) */
  notes: string | null
  createdAt: Timestamp
}

/** What a form sends to create an Item: the API decides id, status and createdAt (Lesson 2.4) */
export type NewItem = Pick<Item, 'name' | 'notes'>

/** The error codes your API answers with */
export type ErrorCode = 'validation_failed' | 'not_found' | 'server_error'

/** Every error answer: { error, message } plus a message list per field for a 400 */
export interface ApiErrorBody {
  error: ErrorCode
  message: string
  fieldErrors?: Record<string, string[]>
}
