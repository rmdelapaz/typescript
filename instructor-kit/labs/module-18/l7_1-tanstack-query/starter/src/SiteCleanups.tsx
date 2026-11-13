// Task 2: the cleanups at one site, read from the cache with useQuery
import { siteEventsQuery } from './queries.ts'

interface SiteCleanupsProps {
  siteId: string
  viewer: string
}

// TODO 2: read siteEventsQuery(siteId, viewer) with useQuery, then show one of:
//   <p role="status">Loading the cleanups…</p>
//   <p role="alert">Could not load the cleanups. MESSAGE</p>
//   <p>No cleanups at this site yet.</p>
//   <ul aria-label="Cleanups at this site"> with one <li> per title
export function SiteCleanups({ siteId, viewer }: SiteCleanupsProps) {
  const options = siteEventsQuery(siteId, viewer)
  return <p>TODO 2: {options.queryKey.join(' ')}</p>
}
