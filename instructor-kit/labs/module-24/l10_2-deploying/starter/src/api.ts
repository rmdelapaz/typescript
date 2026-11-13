import type { GearItem } from './types.ts'

/** Where the API is: the site's own address in the demo build, VITE_API_URL everywhere else */
export function apiBaseUrl(): string {
  if (import.meta.env.MODE === 'demo') return window.location.origin
  return import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
}

export async function getGear(): Promise<GearItem[]> {
  const response = await fetch(`${apiBaseUrl()}/api/gear`)
  if (!response.ok) throw new Error(`GET /api/gear failed (${response.status})`)
  return (await response.json()) as GearItem[]
}
