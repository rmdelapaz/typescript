import { Card } from '../components/Card.tsx'

const crewName = 'Shoreline Crew'
const tagline = 'Many hands, cleaner sands.'
const towns = ['Port Marisol', 'Calder Bay', 'Seal Rock']

export function HomePage() {
  return (
    <>
      <h1>{crewName} HQ</h1>
      <p className="lead">{tagline}</p>
      <p>
        Plan cleanups, sign up volunteers and count what comes off the beaches of{' '}
        {towns.join(', ')}. The first real screens arrive over the next lessons.
      </p>
      <Card title="Our beach sites">
        <p>Six stretches of coast, from sandy beaches to a tidal marsh.</p>
        <a href="/sites">See all six sites</a>
      </Card>
    </>
  )
}
