import { Suspense, use } from 'react'
import { ApiError, describeError } from '../api/client.ts'
import { eventPromise, forgetEvent } from '../api/eventPromises.ts'
import { CheckInDesk } from '../components/CheckInDesk.tsx'
import { ErrorBoundary, type FallbackProps } from '../components/ErrorBoundary.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { SitePicture } from '../components/SitePicture.tsx'
import { SpotsLine } from '../components/SpotsLine.tsx'
import { StatusBadge } from '../components/StatusBadge.tsx'
import { sampleRoster, sampleRosterEventId } from '../data/sampleRoster.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate } from '../utils/format.ts'
import styles from './EventPage.module.css'
import pageStyles from './Page.module.css'

interface EventPageProps {
  eventId: string
}

// Rendered only once the cleanup has arrived: until then, use() suspends
function EventDetails({ eventId }: EventPageProps) {
  const event = use(eventPromise(eventId))
  useDocumentTitle(event.title)
  const { site } = event

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
      {event.id === sampleRosterEventId && <CheckInDesk entries={sampleRoster} />}
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
  return (
    <>
      <p>
        <a href="/events">← All cleanups</a>
      </p>
      <ErrorBoundary fallback={EventProblem} onRetry={() => forgetEvent(eventId)}>
        <Suspense fallback={<LoadStatus state={{ kind: 'loading' }} what="the cleanup" />}>
          <EventDetails eventId={eventId} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
