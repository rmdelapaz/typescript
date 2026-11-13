// Task 2: types computed from other types (Lab 11.2)
import type { Terrain } from './tables.ts'

export interface SiteFilters {
  terrain: Terrain
  minSpots: number
  search: string
}

// TODO 2: a MAPPED type: for each string key K of T, a property named get + K with a capital first letter
// (Capitalize), whose value is a function with no parameters that returns T[K]
export type Getters<T> = Record<string, unknown>

// TODO 2: a CONDITIONAL type with infer: what a Promise resolves to; any other type unchanged
export type Unwrap<T> = unknown

export type Collection = 'events' | 'sites' | 'volunteers'
export type Change = 'created' | 'updated' | 'deleted'

// TODO 2: a TEMPLATE LITERAL type: every "collection:change" pair, such as 'sites:updated'
export type ChangeEvent = string

export function changeEvent(collection: Collection, change: Change): ChangeEvent {
  throw new Error(`TODO 2: changeEvent(${collection}, ${change})`)
}
