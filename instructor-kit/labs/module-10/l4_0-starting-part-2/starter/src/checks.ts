import type { SiteSummary, Terrain } from './types.ts'

// Task 1 (Lesson 2.4): data from an API is unknown until a check proves its shape.
// Return true only for an object with string id, name and town, one of the four terrains and a boolean accessible.
export function isSiteSummary(value: unknown): value is SiteSummary {
  throw new Error(`TODO 1: check ${JSON.stringify(value)?.slice(0, 40)}`)
}

// Task 1 (Lesson 3.3): one label per terrain. A Record over the union means a missing terrain is a type error.
export const terrainLabels: Partial<Record<Terrain, string>> = {
  sand: 'Sandy beach',
}
