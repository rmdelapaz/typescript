// The six beach sites (ids and names from GET /api/sites). Given: nothing to change here.
export const siteIds = ['pelican-point', 'driftwood-cove', 'sandpiper-flats', 'north-jetty', 'otter-creek', 'long-strand'] as const
export type SiteId = (typeof siteIds)[number]

export const siteNames: Record<SiteId, string> = {
  'pelican-point': 'Pelican Point Beach',
  'driftwood-cove': 'Driftwood Cove',
  'sandpiper-flats': 'Sandpiper Flats',
  'north-jetty': 'North Jetty',
  'otter-creek': 'Otter Creek Mouth',
  'long-strand': 'Long Strand Beach',
}

/** Data from outside the program (localStorage) is unknown until a check proves it is a site id */
export function isSiteId(value: unknown): value is SiteId {
  return siteIds.some((id) => id === value)
}
