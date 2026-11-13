// Given: a cleanup's spots, read from the cache
import { useQuery } from '@tanstack/react-query'
import { eventQuery } from './queries.ts'

export function EventSpots({ eventId }: { eventId: string }) {
  const event = useQuery(eventQuery(eventId))
  if (!event.isSuccess) {
    return <p role="status">Loading the cleanup…</p>
  }
  return (
    <p>
      {event.data.title}: {event.data.spotsTaken} of {event.data.capacity} spots taken
    </p>
  )
}
