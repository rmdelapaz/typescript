import type { CleanupEvent, Site } from '../api/types.ts'
import { DataList } from './DataList.tsx'
import { EventCard } from './EventCard.tsx'

interface EventListProps {
  events: CleanupEvent[]
  sites: Site[]
  emptyMessage: string
}

export function EventList({ events, sites, emptyMessage }: EventListProps) {
  return (
    <DataList
      items={events}
      getKey={(event) => event.id}
      emptyMessage={emptyMessage}
      renderItem={(event) => (
        <EventCard event={event} site={sites.find((site) => site.id === event.siteId)} />
      )}
    />
  )
}
