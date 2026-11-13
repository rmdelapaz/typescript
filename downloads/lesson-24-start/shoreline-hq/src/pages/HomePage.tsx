import { Link } from 'react-router'
import { getEvents, type Page } from '../api/client.ts'
import type { CleanupEvent } from '../api/types.ts'
import { Card } from '../components/Card.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { useApi } from '../hooks/useApi.ts'
import { formatDate } from '../utils/format.ts'
import styles from './Page.module.css'

const crewName = 'Shoreline Crew'
const tagline = 'Many hands, cleaner sands.'
const towns = ['Port Marisol', 'Calder Bay', 'Seal Rock']

// One cleanup is enough: the first scheduled one from today on
const nextQuery = 'status=scheduled&when=upcoming&perPage=1'

interface NextCleanupProps {
  upcoming: Page<CleanupEvent>
}

// The first upcoming cleanup, and how many there are in all (from the X-Total-Count header)
function NextCleanup({ upcoming }: NextCleanupProps) {
  const next = upcoming.items[0]
  if (next === undefined) {
    return <p>Nothing scheduled yet.</p>
  }
  return (
    <p>
      {next.title}, <time dateTime={next.date}>{formatDate(next.date)}</time> at{' '}
      {next.startTime}. Cleanups coming up: {upcoming.page.total}.
    </p>
  )
}

export function HomePage() {
  const upcoming = useApi(`/events?${nextQuery}`, (signal) => getEvents(nextQuery, signal))

  return (
    <>
      <h1>{crewName} HQ</h1>
      <p className={styles.lead}>{tagline}</p>
      <p>
        Plan cleanups, sign up volunteers and count what comes off the beaches of{' '}
        {towns.join(', ')}.
      </p>
      <div className={styles.grid}>
        <Card title="Next cleanup">
          {upcoming.state.kind === 'ready' ? (
            <NextCleanup upcoming={upcoming.state.data} />
          ) : (
            <LoadStatus state={upcoming.state} what="the next cleanup" onRetry={upcoming.reload} />
          )}
          <Link to="/events">See all cleanups</Link>
        </Card>
        <Card title="Our beach sites">
          <p>Six stretches of coast, from sandy beaches to a tidal marsh.</p>
          <Link to="/sites">See all six sites</Link>
        </Card>
      </div>
    </>
  )
}
