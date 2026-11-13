import type { CleanupEvent, Site } from '../api/types.ts'
import { EventCard } from './EventCard.tsx'
import styles from './EventList.module.css'

interface EventListProps {
  events: CleanupEvent[]
  sites: Site[]
  emptyMessage: string
}

export function EventList({ events, sites, emptyMessage }: EventListProps) {
  if (events.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>
  }

  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} site={sites.find((site) => site.id === event.siteId)} />
        </li>
      ))}
    </ul>
  )
}
