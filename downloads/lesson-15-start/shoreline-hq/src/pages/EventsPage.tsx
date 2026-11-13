import { useState } from 'react'
import { getEvents, getSites } from '../api/client.ts'
import type { CleanupEvent, Site } from '../api/types.ts'
import { EventFilters, type StatusFilter } from '../components/EventFilters.tsx'
import { EventList } from '../components/EventList.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { useApi } from '../hooks/useApi.ts'
import { useDebouncedValue } from '../hooks/useDebouncedValue.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

interface EventGroupsProps {
  events: CleanupEvent[]
  sites: Site[]
  filtering: boolean
}

// The cleanups the API found, in three groups
function EventGroups({ events, sites, filtering }: EventGroupsProps) {
  const upcoming = events.filter((event) => event.status === 'scheduled')
  const drafts = events.filter((event) => event.status === 'draft')
  const past = events
    .filter((event) => event.status === 'completed' || event.status === 'cancelled')
    .toReversed()
  const noMatches = 'No cleanups here match your filters.'

  return (
    <>
      <p className={styles.lead} role="status">
        Found {events.length} {events.length === 1 ? 'cleanup' : 'cleanups'}: {upcoming.length}{' '}
        coming up, {past.length} in the log.
      </p>
      <h2>Coming up</h2>
      <EventList
        events={upcoming}
        sites={sites}
        emptyMessage={filtering ? noMatches : 'Nothing scheduled yet.'}
      />
      <h2>Drafts</h2>
      <EventList
        events={drafts}
        sites={sites}
        emptyMessage={filtering ? noMatches : 'No drafts waiting to be published.'}
      />
      <h2>Past cleanups</h2>
      <EventList
        events={past}
        sites={sites}
        emptyMessage={filtering ? noMatches : 'No cleanups in the log yet.'}
      />
    </>
  )
}

export function EventsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  useDocumentTitle('Cleanup events')

  // The API searches; the page asks only once the typing has paused
  const search = useDebouncedValue(query.trim(), 300)
  const params = new URLSearchParams({ perPage: '50' })
  if (search !== '') params.set('q', search)
  if (status !== 'all') params.set('status', status)
  const eventsQuery = params.toString()

  const sites = useApi('/sites', getSites)
  const events = useApi(`/events?${eventsQuery}`, (signal) => getEvents(eventsQuery, signal))

  function clearFilters() {
    setQuery('')
    setStatus('all')
  }

  // Whichever request is not ready yet decides what the status message says
  const waiting = sites.state.kind !== 'ready' ? sites : events

  return (
    <>
      <h1>Cleanup events</h1>
      <p>
        <a href="/events/new">Plan a cleanup</a>
      </p>
      <EventFilters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onClear={clearFilters}
      />
      {sites.state.kind === 'ready' && events.state.kind === 'ready' ? (
        <EventGroups
          events={events.state.data.items}
          sites={sites.state.data}
          filtering={search !== '' || status !== 'all'}
        />
      ) : (
        <LoadStatus state={waiting.state} what="the cleanups" onRetry={waiting.reload} />
      )}
    </>
  )
}
