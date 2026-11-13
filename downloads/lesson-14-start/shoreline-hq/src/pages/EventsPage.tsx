import { useEffect, useState } from 'react'
import { describeError, getEvents, getSites } from '../api/client.ts'
import type { CleanupEvent, Site } from '../api/types.ts'
import { EventFilters, type StatusFilter } from '../components/EventFilters.tsx'
import { EventList } from '../components/EventList.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import type { LoadState } from '../utils/loadState.ts'
import styles from './Page.module.css'

// Everything this page needs from the API, loaded together
interface EventsData {
  events: CleanupEvent[]
  sites: Site[]
}

function matchesFilters(event: CleanupEvent, search: string, status: StatusFilter): boolean {
  const statusMatches = status === 'all' || event.status === status
  const text = `${event.title} ${event.description}`.toLowerCase()
  return statusMatches && text.includes(search)
}

export function EventsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [state, setState] = useState<LoadState<EventsData>>({ kind: 'loading' })

  // Two requests at once; the page is ready when both have answered
  useEffect(() => {
    const controller = new AbortController()
    Promise.all([getEvents('perPage=50', controller.signal), getSites(controller.signal)])
      .then(([eventsPage, sites]) => {
        setState({ kind: 'ready', data: { events: eventsPage.items, sites } })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error(error)
        setState({ kind: 'failed', message: describeError(error) })
      })
    return () => controller.abort()
  }, [])

  if (state.kind !== 'ready') {
    return (
      <>
        <h1>Cleanup events</h1>
        <LoadStatus state={state} what="the cleanups" />
      </>
    )
  }

  // Derived values: worked out from state on every render, never stored
  const { events, sites } = state.data
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
      <p className={styles.lead} role="status">
        Showing {visible.length} of {events.length}: {upcoming.length} coming up,{' '}
        {past.length} in the log.
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
