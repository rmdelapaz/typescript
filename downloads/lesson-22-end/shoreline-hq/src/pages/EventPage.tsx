import { Suspense, use } from 'react'
import { Link, useParams } from 'react-router'
import { ApiError, describeError, getRoster } from '../api/client.ts'
import { eventPromise, forgetEvent } from '../api/eventPromises.ts'
import type { CleanupEventDetail } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { CheckInDesk } from '../components/CheckInDesk.tsx'
import { ErrorBoundary, type FallbackProps } from '../components/ErrorBoundary.tsx'
import { ImpactSummary } from '../components/ImpactSummary.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { SitePicture } from '../components/SitePicture.tsx'
import { SpotsLine } from '../components/SpotsLine.tsx'
import { StatusBadge } from '../components/StatusBadge.tsx'
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs.tsx'
import { useApi } from '../hooks/useApi.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate, toDateString } from '../utils/format.ts'
import styles from './EventPage.module.css'
import pageStyles from './Page.module.css'

// Read once, when the app starts. An HQ left open past midnight keeps the old date until it
// reloads: fine for a check-in desk that opens in the morning.
const today = toDateString(new Date())

interface TodaysDeskProps {
  eventId: string
}

interface EventDetailsProps {
  eventId: string
  viewer: string
}

// Today's roster from the API, loaded on its own, so the cleanup's details never wait for it
function TodaysDesk({ eventId }: TodaysDeskProps) {
  const roster = useApi(`/events/${eventId}/signups`, (signal) => getRoster(eventId, signal))

  if (roster.state.kind !== 'ready') {
    return <LoadStatus state={roster.state} what="today's roster" onRetry={roster.reload} />
  }
  // The desk is for the people with a spot (not the waiting list or cancellations)
  const expected = roster.state.data.filter((entry) => entry.status === 'confirmed')
  return <CheckInDesk entries={expected} />
}

interface AboutCleanupProps {
  event: CleanupEventDetail
}

// What everyone wants to know: what happens, and where to meet
function AboutCleanup({ event }: AboutCleanupProps) {
  const { site } = event
  return (
    <>
      <p>{event.description}</p>
      {event.suppliesProvided.length > 0 && (
        <p>We bring: {event.suppliesProvided.join(', ')}.</p>
      )}
      <h2>Where to meet</h2>
      <p>
        {event.meetingPoint}, {site.name} ({site.town}).
      </p>
      <p>Parking: {site.parking}</p>
      <SitePicture image={site.image} />
    </>
  )
}

// Rendered only once the cleanup has arrived: until then, use() suspends
function EventDetails({ eventId, viewer }: EventDetailsProps) {
  const { isOrganizer } = useAuth()
  const event = use(eventPromise(eventId, viewer))
  useDocumentTitle(event.title)
  const checkInDay = isOrganizer && event.status === 'scheduled' && event.date === today
  const completed = event.status === 'completed'

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
      {checkInDay || completed ? (
        // More than one thing to show: tabs, with only the tabs this cleanup needs
        <Tabs defaultTab={checkInDay ? 'desk' : 'details'}>
          <TabList label="About this cleanup">
            <Tab id="details">Details</Tab>
            {checkInDay && <Tab id="desk">Check-in desk</Tab>}
            {completed && <Tab id="impact">Impact</Tab>}
          </TabList>
          <TabPanel id="details">
            <AboutCleanup event={event} />
          </TabPanel>
          {checkInDay && (
            <TabPanel id="desk">
              <TodaysDesk eventId={event.id} />
            </TabPanel>
          )}
          {completed && (
            <TabPanel id="impact">
              <ImpactSummary eventId={event.id} />
            </TabPanel>
          )}
        </Tabs>
      ) : (
        <AboutCleanup event={event} />
      )}
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

// The route is events/:eventId, so the router fills in eventId from the address
export function EventPage() {
  const { eventId } = useParams<'eventId'>()
  const { session } = useAuth()
  const viewer = session?.user.id ?? 'guest'

  if (eventId === undefined) {
    throw new Error('EventPage needs a route with an :eventId parameter')
  }
  return (
    <>
      <p>
        <Link to="/events">← All cleanups</Link>
      </p>
      {/* A new key for each cleanup: a fresh boundary, fresh tabs, nothing left from the last one */}
      <ErrorBoundary
        key={eventId}
        fallback={EventProblem}
        onRetry={() => forgetEvent(eventId, viewer)}
      >
        <Suspense fallback={<LoadStatus state={{ kind: 'loading' }} what="the cleanup" />}>
          <EventDetails eventId={eventId} viewer={viewer} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
