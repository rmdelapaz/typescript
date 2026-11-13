import type { CleanupEvent } from '../api/types.ts'
import { EventCard } from './EventCard.tsx'
import styles from './EventList.module.css'

interface EventListProps {
  events: CleanupEvent[]
  emptyMessage: string
}

export function EventList({ events, emptyMessage }: EventListProps) {
  if (events.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>
  }

  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  )
}
