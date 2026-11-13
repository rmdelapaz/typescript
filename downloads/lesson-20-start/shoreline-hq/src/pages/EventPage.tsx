import { Suspense, use } from 'react'
import { ApiError, describeError, getRoster } from '../api/client.ts'
import { eventPromise, forgetEvent } from '../api/eventPromises.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { CheckInDesk } from '../components/CheckInDesk.tsx'
import { ErrorBoundary, type FallbackProps } from '../components/ErrorBoundary.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { SitePicture } from '../components/SitePicture.tsx'
import { SpotsLine } from '../components/SpotsLine.tsx'
import { StatusBadge } from '../components/StatusBadge.tsx'
import { useApi } from '../hooks/useApi.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate, toDateString } from '../utils/format.ts'
import styles from './EventPage.module.css'
import pageStyles from './Page.module.css'

// Read once, when the app starts: the pages reload whenever you follow a link
const today = toDateString(new Date())

interface EventPageProps {
  eventId: string
}

interface EventDetailsProps {
  eventId: string
  viewer: string
}

// Today's roster from the API, loaded on its own, so the cleanup's details never wait for it
function TodaysDesk({ eventId }: EventPageProps) {
  const roster = useApi(`/events/${eventId}/signups`, (signal) => getRoster(eventId, signal))

  if (roster.state.kind !== 'ready') {
    return <LoadStatus state={roster.state} what="today's roster" onRetry={roster.reload} />
  }
  // The desk is for the people with a spot (not the waiting list or cancellations)
  const expected = roster.state.data.filter((entry) => entry.status === 'confirmed')
  return <CheckInDesk entries={expected} />
}

// Rendered only once the cleanup has arrived: until then, use() suspends
function EventDetails({ eventId, viewer }: EventDetailsProps) {
  const { isOrganizer } = useAuth()
  const event = use(eventPromise(eventId, viewer))
  useDocumentTitle(event.title)
  const { site } = event
  const checkInDay = isOrganizer && event.status === 'scheduled' && event.date === today

  return (
    <article>
      <h1>{event.title}</h1>
      <p className={styles.badges}>
        <StatusBadge status={event.status} />
      </p>
      <p className={pageStyles.lead}>
        <time dateTime={event.date}>{formatDate(event.date)}</time>, {event.startTime} to{' '}
        {event.endTime}
      </p>
      <SpotsLine availability={getAvailability(event)} capacity={event.capacity} />
      <p>{event.description}</p>
      {event.suppliesProvided.length > 0 && (
        <p>We bring: {event.suppliesProvided.join(', ')}.</p>
      )}
      {checkInDay && <TodaysDesk eventId={event.id} />}
      <h2>Where to meet</h2>
      <p>
        {event.meetingPoint}, {site.name} ({site.town}).
      </p>
      <p>Parking: {site.parking}</p>
      <SitePicture image={site.image} />
    </article>
  )
}

// What the error boundary shows instead of EventDetails
function EventProblem({ error, retry }: FallbackProps) {
  const notFound = error instanceof ApiError && error.status === 404
  useDocumentTitle(notFound ? 'Cleanup not found' : 'Cleanup')

  if (notFound) {
    return (
      <>
        <h1>Cleanup not found</h1>
        <p>There is no cleanup at this address. The link may be wrong, or the cleanup is not public.</p>
      </>
    )
  }
  return (
    <LoadStatus
      state={{ kind: 'failed', message: describeError(error) }}
      what="this cleanup"
      onRetry={retry}
    />
  )
}

export function EventPage({ eventId }: EventPageProps) {
  const { session } = useAuth()
  const viewer = session?.user.id ?? 'guest'

  return (
    <>
      <p>
        <a href="/events">← All cleanups</a>
      </p>
      <ErrorBoundary fallback={EventProblem} onRetry={() => forgetEvent(eventId, viewer)}>
        <Suspense fallback={<LoadStatus state={{ kind: 'loading' }} what="the cleanup" />}>
          <EventDetails eventId={eventId} viewer={viewer} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
