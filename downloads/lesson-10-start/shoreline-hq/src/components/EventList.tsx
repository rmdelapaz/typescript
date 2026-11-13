import type { CleanupEvent } from '../api/types.ts'
import { EventCard } from './EventCard.tsx'

interface EventListProps {
  events: CleanupEvent[]
  emptyMessage: string
}

export function EventList({ events, emptyMessage }: EventListProps) {
  if (events.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  )
}
