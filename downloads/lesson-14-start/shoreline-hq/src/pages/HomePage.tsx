import { useEffect, useState } from 'react'
import { describeError, getEvents, type Page } from '../api/client.ts'
import type { CleanupEvent } from '../api/types.ts'
import { Card } from '../components/Card.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { formatDate } from '../utils/format.ts'
import type { LoadState } from '../utils/loadState.ts'
import styles from './Page.module.css'

const crewName = 'Shoreline Crew'
const tagline = 'Many hands, cleaner sands.'
const towns = ['Port Marisol', 'Calder Bay', 'Seal Rock']

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
  const [state, setState] = useState<LoadState<Page<CleanupEvent>>>({ kind: 'loading' })

  // One cleanup is enough: the first scheduled one from today on
  useEffect(() => {
    const controller = new AbortController()
    getEvents('status=scheduled&when=upcoming&perPage=1', controller.signal)
      .then((upcoming) => setState({ kind: 'ready', data: upcoming }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error(error)
        setState({ kind: 'failed', message: describeError(error) })
      })
    return () => controller.abort()
  }, [])

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
          {state.kind === 'ready' ? (
            <NextCleanup upcoming={state.data} />
          ) : (
            <LoadStatus state={state} what="the next cleanup" />
          )}
          <a href="/events">See all cleanups</a>
        </Card>
        <Card title="Our beach sites">
          <p>Six stretches of coast, from sandy beaches to a tidal marsh.</p>
          <a href="/sites">See all six sites</a>
        </Card>
      </div>
    </>
  )
}
