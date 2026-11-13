import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router'
import { isEventStatus } from '../api/client.ts'
import { eventsQuery, sitesQuery, viewerId } from '../api/queries.ts'
import type { CleanupEvent, Site } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { Button } from '../components/Button.tsx'
import { EventFilters, type StatusFilter } from '../components/EventFilters.tsx'
import { EventList } from '../components/EventList.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { useDebouncedValue } from '../hooks/useDebouncedValue.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { readParam, withParam } from '../utils/searchParams.ts'
import styles from './Page.module.css'

interface EventGroupsProps {
  events: CleanupEvent[]
  sites: Site[]
  filtering: boolean
  /** Drafts only reach organizers, so only they get a Drafts list */
  showDrafts: boolean
}

// True when a key press is meant for a field someone is typing in
function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

// The cleanups the API found, in three groups
function EventGroups({ events, sites, filtering, showDrafts }: EventGroupsProps) {
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
      {showDrafts && (
        <>
          <h2>Drafts</h2>
          <EventList
            events={drafts}
            sites={sites}
            emptyMessage={filtering ? noMatches : 'No drafts waiting to be published.'}
          />
        </>
      )}
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
  const { session, isOrganizer } = useAuth()
  // The filters live in the address: /events?q=pelican&status=completed
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const status: StatusFilter = readParam(searchParams, 'status', isEventStatus) ?? 'all'
  const searchRef = useRef<HTMLInputElement>(null)
  useDocumentTitle('Cleanup events')

  // Press / anywhere on the page (except in a field) to jump to the search box
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return
      if (isTyping(event.target)) return
      event.preventDefault() // or the / would be typed into the search box
      searchRef.current?.focus()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // The API searches; the page asks only once the typing has paused
  const search = useDebouncedValue(query.trim(), 300)
  const params = new URLSearchParams({ perPage: '50' })
  if (search !== '') params.set('q', search)
  if (status !== 'all') params.set('status', status)

  const viewer = viewerId(session)
  const sites = useQuery(sitesQuery())
  // While the next search loads, keep showing the last list (not "Loading…" for every search)
  const events = useQuery({
    ...eventsQuery(params.toString(), viewer),
    placeholderData: keepPreviousData,
  })

  // Typing: replace the history entry (Back skips the letters), and update the box right away
  function setQuery(next: string) {
    setSearchParams((current) => withParam(current, 'q', next), {
      replace: true,
      flushSync: true,
    })
  }

  // A status is a new entry: Back undoes it
  function setStatus(next: StatusFilter) {
    setSearchParams((current) => withParam(current, 'status', next === 'all' ? '' : next))
  }

  function clearFilters() {
    setSearchParams({})
    // The Clear filters button is about to disappear: keep the focus somewhere useful
    searchRef.current?.focus()
  }

  // Whichever query has no data yet decides what the status message says
  const waiting = sites.isSuccess ? events : sites

  return (
    <>
      <h1>Cleanup events</h1>
      {isOrganizer && (
        <p>
          <Button as={Link} to="/events/new" variant="primary">
            Plan a cleanup
          </Button>
        </p>
      )}
      <EventFilters
        ref={searchRef}
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onClear={clearFilters}
      />
      {sites.isSuccess && events.isSuccess ? (
        <EventGroups
          events={events.data.items}
          sites={sites.data}
          filtering={search !== '' || status !== 'all'}
          showDrafts={isOrganizer}
        />
      ) : (
        <LoadStatus query={waiting} what="the cleanups" />
      )}
    </>
  )
}
