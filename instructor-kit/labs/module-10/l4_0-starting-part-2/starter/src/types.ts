// The fields of a shoreline-api site this lab reads (the full type is Site, in shoreline-hq/src/api/types.ts)
export type Terrain = 'sand' | 'rocky' | 'marsh' | 'mixed'

export interface SiteSummary {
  id: string
  name: string
  town: string
  terrain: Terrain
  accessible: boolean
}
