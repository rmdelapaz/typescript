// The HQ's check for a Site (src/api/client.ts): data from the API is unknown until a check proves its shape
import type { Site, Terrain } from './types.ts'

/** An object (not null, not an array), so its properties can be read */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const terrains: Terrain[] = ['sand', 'rocky', 'marsh', 'mixed']
const siteTextFields: (keyof Site)[] = ['id', 'name', 'town', 'parking', 'description']

export function isSite(value: unknown): value is Site {
  return (
    isRecord(value) &&
    siteTextFields.every((key) => typeof value[key] === 'string') &&
    terrains.some((terrain) => terrain === value.terrain) &&
    typeof value.accessible === 'boolean' &&
    typeof value.latitude === 'number' &&
    typeof value.longitude === 'number' &&
    isRecord(value.image) &&
    typeof value.image.url === 'string' &&
    typeof value.image.alt === 'string' &&
    typeof value.image.width === 'number' &&
    typeof value.image.height === 'number'
  )
}
