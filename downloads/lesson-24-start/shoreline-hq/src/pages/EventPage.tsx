import { Suspense } from 'react'
import { Link, useLoaderData } from 'react-router'
import { describeError, getRoster } from '../api/client.ts'
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
import type { eventLoader } from './loaders.ts'
import pageStyles from './Page.module.css'

// Read once, when the app starts. An HQ left open past midnight keeps the old date until it
// reloads: fine for a check-in desk that opens in the morning.
const today = toDateString(new Date())

interface TodaysDeskProps {
  eventId: string
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

// What the impact tab shows when the report could not be loaded
function ImpactProblem({ error }: FallbackProps) {
  return (
    <LoadStatus state={{ kind: 'failed', message: describeError(error) }} what="the impact report" />
  )
}

// The route is events/:eventId: eventLoader has loaded the cleanup before this page renders
export function EventPage() {
  const { event, impact } = useLoaderData<typeof eventLoader>()
  const { isOrganizer } = useAuth()
  useDocumentTitle(event.title)
  const checkInDay = isOrganizer && event.status === 'scheduled' && event.date === today

  return (
    <>
      <p>
        <Link to="/events">← All cleanups</Link>
      </p>
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
        {checkInDay || impact !== null ? (
          // A new key for each cleanup: fresh tabs, nothing selected from the last one
          <Tabs key={event.id} defaultTab={checkInDay ? 'desk' : 'details'}>
            <TabList label="About this cleanup">
              <Tab id="details">Details</Tab>
              {checkInDay && <Tab id="desk">Check-in desk</Tab>}
              {impact !== null && <Tab id="impact">Impact</Tab>}
            </TabList>
            <TabPanel id="details">
              <AboutCleanup event={event} />
            </TabPanel>
            {checkInDay && (
              <TabPanel id="desk">
                <TodaysDesk eventId={event.id} />
              </TabPanel>
            )}
            {impact !== null && (
              <TabPanel id="impact">
                <ErrorBoundary fallback={ImpactProblem}>
                  <Suspense fallback={<LoadStatus state={{ kind: 'loading' }} what="the impact report" />}>
                    <ImpactSummary impact={impact} />
                  </Suspense>
                </ErrorBoundary>
              </TabPanel>
            )}
          </Tabs>
        ) : (
          <AboutCleanup event={event} />
        )}
      </article>
    </>
  )
}
