import { Card } from '../components/Card.tsx'
import { events } from '../data/events.ts'
import { formatDate } from '../utils/format.ts'

const crewName = 'Shoreline Crew'
const tagline = 'Many hands, cleaner sands.'
const towns = ['Port Marisol', 'Calder Bay', 'Seal Rock']

export function HomePage() {
  const nextCleanup = events.find((event) => event.status === 'scheduled')

  return (
    <>
      <h1>{crewName} HQ</h1>
      <p className="lead">{tagline}</p>
      <p>
        Plan cleanups, sign up volunteers and count what comes off the beaches of{' '}
        {towns.join(', ')}.
      </p>
      <div className="card-grid">
        <Card title="Next cleanup">
          {nextCleanup ? (
            <p>
              {nextCleanup.title},{' '}
              <time dateTime={nextCleanup.date}>{formatDate(nextCleanup.date)}</time> at{' '}
              {nextCleanup.startTime}.
            </p>
          ) : (
            <p>Nothing scheduled yet.</p>
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
