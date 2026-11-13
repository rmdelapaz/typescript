// The six beach sites, as GET /api/sites sends them (only the fields this lab needs). Do not edit.
export type Terrain = 'sand' | 'rocky' | 'marsh' | 'mixed'

export interface SiteSummary {
  id: string
  name: string
  town: string
  terrain: Terrain
}

export const sites: SiteSummary[] = [
  { id: 'pelican-point', name: 'Pelican Point Beach', town: 'Port Marisol', terrain: 'sand' },
  { id: 'driftwood-cove', name: 'Driftwood Cove', town: 'Port Marisol', terrain: 'mixed' },
  { id: 'sandpiper-flats', name: 'Sandpiper Flats', town: 'Calder Bay', terrain: 'marsh' },
  { id: 'north-jetty', name: 'North Jetty', town: 'Calder Bay', terrain: 'rocky' },
  { id: 'otter-creek', name: 'Otter Creek Mouth', town: 'Seal Rock', terrain: 'mixed' },
  { id: 'long-strand', name: 'Long Strand Beach', town: 'Seal Rock', terrain: 'sand' },
]

export function findSite(id: string): SiteSummary | undefined {
  return sites.find((site) => site.id === id)
}
