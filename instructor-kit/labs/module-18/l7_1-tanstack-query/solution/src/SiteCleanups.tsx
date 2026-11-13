// Task 2: the cleanups at one site, read from the cache with useQuery
import { useQuery } from '@tanstack/react-query'
import { siteEventsQuery } from './queries.ts'

interface SiteCleanupsProps {
  siteId: string
  viewer: string
}

export function SiteCleanups({ siteId, viewer }: SiteCleanupsProps) {
  const events = useQuery(siteEventsQuery(siteId, viewer))
  // The result is a union tagged by status: each early return narrows what is left
  if (events.isPending) {
    return <p role="status">Loading the cleanups…</p>
  }
  if (events.isError) {
    return <p role="alert">Could not load the cleanups. {events.error.message}</p>
  }
  // Only 'success' is left: data is CleanupEvent[], without undefined
  if (events.data.length === 0) {
    return <p>No cleanups at this site yet.</p>
  }
  return (
    <ul aria-label="Cleanups at this site">
      {events.data.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  )
}
