import type { SiteSummary, Terrain } from './types.ts'

const terrains: Terrain[] = ['sand', 'rocky', 'marsh', 'mixed']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Task 1 (Lesson 2.4): data from an API is unknown until a check proves its shape.
export function isSiteSummary(value: unknown): value is SiteSummary {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.town === 'string' &&
    terrains.some((terrain) => terrain === value.terrain) &&
    typeof value.accessible === 'boolean'
  )
}

// Task 1 (Lesson 3.3): one label per terrain, and TypeScript checks that none is missing.
export const terrainLabels: Record<Terrain, string> = {
  sand: 'Sandy beach',
  rocky: 'Rocky shore',
  marsh: 'Tidal marsh',
  mixed: 'Sand and rocks',
}
