import { useState } from 'react'
import type { CleanupEvent } from '../api/types.ts'
import { EventFilters, type StatusFilter } from '../components/EventFilters.tsx'
import { EventList } from '../components/EventList.tsx'
import { events } from '../data/events.ts'

function matchesFilters(event: CleanupEvent, search: string, status: StatusFilter): boolean {
  const statusMatches = status === 'all' || event.status === status
  const text = `${event.title} ${event.description}`.toLowerCase()
  return statusMatches && text.includes(search)
}

export function EventsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  // Derived values: worked out from state on every render, never stored
  const search = query.trim().toLowerCase()
  const visible = events.filter((event) => matchesFilters(event, search, status))
  const upcoming = visible.filter((event) => event.status === 'scheduled')
  const drafts = visible.filter((event) => event.status === 'draft')
  const past = visible
    .filter((event) => event.status === 'completed' || event.status === 'cancelled')
    .toReversed()
  const filtering = search !== '' || status !== 'all'
  const noMatches = 'No cleanups here match your filters.'

  function clearFilters() {
    setQuery('')
    setStatus('all')
  }

  return (
    <>
      <h1>Cleanup events</h1>
      <EventFilters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onClear={clearFilters}
      />
      <p className="lead" role="status">
        Showing {visible.length} of {events.length}: {upcoming.length} coming up,{' '}
        {past.length} in the log.
      </p>
      <h2>Coming up</h2>
      <EventList events={upcoming} emptyMessage={filtering ? noMatches : 'Nothing scheduled yet.'} />
      <h2>Drafts</h2>
      <EventList
        events={drafts}
        emptyMessage={filtering ? noMatches : 'No drafts waiting to be published.'}
      />
      <h2>Past cleanups</h2>
      <EventList events={past} emptyMessage={filtering ? noMatches : 'No cleanups in the log yet.'} />
    </>
  )
}
