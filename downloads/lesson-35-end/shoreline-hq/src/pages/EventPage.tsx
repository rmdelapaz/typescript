import { useQuery, useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Link, useLoaderData } from 'react-router'
import { eventQuery, rosterQuery, viewerId } from '../api/queries.ts'
import type { CleanupEventDetail } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { CheckInDesk } from '../components/CheckInDesk.tsx'
import { ErrorBoundary, type FallbackProps } from '../components/ErrorBoundary.tsx'
import { ImpactSummary } from '../components/ImpactSummary.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { OrganizerTools } from '../components/OrganizerTools.tsx'
import { SitePicture } from '../components/SitePicture.tsx'
import { SpotsLine } from '../components/SpotsLine.tsx'
import { StatusBadge } from '../components/StatusBadge.tsx'
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs.tsx'
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
  const viewer = viewerId(useAuth().session)
  const roster = useQuery(rosterQuery(eventId, viewer))

  if (!roster.isSuccess) {
    return <LoadStatus query={roster} what="today's roster" />
  }
  // The desk is for the people with a spot (not the waiting list or cancellations),
  // including the ones already marked today
  const atTheDesk = roster.data.filter(
    (entry) => entry.status === 'confirmed' || entry.status === 'attended' || entry.status === 'no-show',
  )
  return <CheckInDesk eventId={eventId} viewer={viewer} entries={atTheDesk} />
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

// What the impact tab shows when the report could not be loaded: Try again calls retry
function ImpactProblem({ error, retry }: FallbackProps) {
  return <LoadStatus query={{ status: 'error', error, refetch: retry }} what="the impact report" />
}

// The route is events/:eventId: eventLoader has put the cleanup in the cache before this page renders
export function EventPage() {
  const { eventId, viewer } = useLoaderData<typeof eventLoader>()
  const { data: event } = useSuspenseQuery(eventQuery(eventId, viewer))
  const { isOrganizer } = useAuth()
  // Lets the impact tab's Try again ask the API again instead of showing the same error
  const { reset } = useQueryErrorResetBoundary()
  useDocumentTitle(event.title)
  const checkInDay = isOrganizer && event.status === 'scheduled' && event.date === today
  const completed = event.status === 'completed'

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
        {isOrganizer && <OrganizerTools event={event} />}
        {checkInDay || completed ? (
          // A new key for each cleanup: fresh tabs, nothing selected from the last one
          <Tabs key={event.id} defaultTab={checkInDay ? 'desk' : 'details'}>
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
                <ErrorBoundary fallback={ImpactProblem} onRetry={reset}>
                  <Suspense
                    fallback={<LoadStatus query={{ status: 'pending', error: null }} what="the impact report" />}
                  >
                    <ImpactSummary eventId={event.id} />
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
