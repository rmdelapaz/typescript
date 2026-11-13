// The 15 public cleanups, as GET /api/events sends them (only the fields this lab needs). Do not edit.
export type EventStatus = 'draft' | 'scheduled' | 'completed' | 'cancelled'

export const statuses: readonly EventStatus[] = ['draft', 'scheduled', 'completed', 'cancelled']

export const statusLabels: Record<EventStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

// The six beach sites (GET /api/sites)
export type SiteId =
  | 'pelican-point'
  | 'driftwood-cove'
  | 'sandpiper-flats'
  | 'north-jetty'
  | 'otter-creek'
  | 'long-strand'

export const siteIds: readonly SiteId[] = [
  'pelican-point',
  'driftwood-cove',
  'sandpiper-flats',
  'north-jetty',
  'otter-creek',
  'long-strand',
]

export const siteNames: Record<SiteId, string> = {
  'pelican-point': 'Pelican Point Beach',
  'driftwood-cove': 'Driftwood Cove',
  'sandpiper-flats': 'Sandpiper Flats',
  'north-jetty': 'North Jetty',
  'otter-creek': 'Otter Creek Mouth',
  'long-strand': 'Long Strand Beach',
}

export interface CleanupSummary {
  id: string
  title: string
  status: EventStatus
  siteId: SiteId
}

export const cleanups: CleanupSummary[] = [
  { id: 'e01', title: 'Storm Debris Sweep', status: 'completed', siteId: 'driftwood-cove' },
  { id: 'e02', title: 'Jetty Fishing Line Roundup', status: 'completed', siteId: 'north-jetty' },
  { id: 'e03', title: 'Marsh Boardwalk Cleanup', status: 'completed', siteId: 'sandpiper-flats' },
  { id: 'e04', title: 'Pelican Point Beach Sweep', status: 'completed', siteId: 'pelican-point' },
  { id: 'e05', title: 'Creek Mouth After the Rains', status: 'cancelled', siteId: 'otter-creek' },
  { id: 'e06', title: 'Long Strand Big Day', status: 'completed', siteId: 'long-strand' },
  { id: 'e07', title: 'Sunset Stairs Cleanup', status: 'completed', siteId: 'pelican-point' },
  { id: 'e17', title: 'Tide Pool Morning Cleanup', status: 'scheduled', siteId: 'otter-creek' },
  { id: 'e08', title: 'Weekend Cove Cleanup', status: 'scheduled', siteId: 'driftwood-cove' },
  { id: 'e09', title: 'Boardwalk and Mudflats', status: 'scheduled', siteId: 'sandpiper-flats' },
  { id: 'e10', title: 'Family Beach Morning', status: 'scheduled', siteId: 'pelican-point' },
  { id: 'e11', title: 'Jetty Rocks Deep Clean', status: 'scheduled', siteId: 'north-jetty' },
  { id: 'e12', title: 'Creek Mouth Willows', status: 'scheduled', siteId: 'otter-creek' },
  { id: 'e13', title: 'Long Strand Coastal Cleanup Day', status: 'scheduled', siteId: 'long-strand' },
  { id: 'e14', title: 'Night Heron Walk and Clean', status: 'scheduled', siteId: 'sandpiper-flats' },
]
