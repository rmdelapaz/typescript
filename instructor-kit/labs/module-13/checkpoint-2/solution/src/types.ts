// The API's Site type (shoreline-api core/types.ts, as in the HQ's src/api/types.ts)
export type Terrain = 'sand' | 'rocky' | 'marsh' | 'mixed'

export interface Site {
  id: string
  name: string
  town: string
  terrain: Terrain
  /** step-free route to the meeting point */
  accessible: boolean
  latitude: number
  longitude: number
  parking: string
  description: string
  /** an illustration of the site, served by the API (absolute URL) */
  image: { url: string; alt: string; width: number; height: number }
}
