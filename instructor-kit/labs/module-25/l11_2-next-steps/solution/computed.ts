// Task 2: types computed from other types (Lab 11.2, reference solution)
import type { Terrain } from './tables.ts'

export interface SiteFilters {
  terrain: Terrain
  minSpots: number
  search: string
}

// A mapped type with key remapping: getTerrain, getMinSpots, getSearch
export type Getters<T> = {
  [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K]
}

// A conditional type with infer: Unwrap<Promise<number>> is number, Unwrap<string> is string
export type Unwrap<T> = T extends Promise<infer Value> ? Value : T

export type Collection = 'events' | 'sites' | 'volunteers'
export type Change = 'created' | 'updated' | 'deleted'

// A template literal type: 3 collections x 3 changes = 9 allowed strings
export type ChangeEvent = `${Collection}:${Change}`

export function changeEvent(collection: Collection, change: Change): ChangeEvent {
  return `${collection}:${change}`
}
