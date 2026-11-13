import { Link, useLoaderData, useSearchParams } from 'react-router'
import type { crewLoader } from './loaders.ts'

// Pages this lab gives you. Do not edit.

export function HomePage() {
  return (
    <>
      <h1>Site desk</h1>
      <p>
        Open a beach site such as <Link to="/sites/north-jetty">North Jetty</Link>, or the{' '}
        <Link to="/crew">crew list</Link> (organizers only).
      </p>
    </>
  )
}

export function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        There is no page at this address. Go to the <Link to="/">home page</Link>.
      </p>
    </>
  )
}

// /crew?skill=first-aid: the crew, filtered by the skill in the address. crewLoader has loaded it already.
export function CrewPage() {
  const crew = useLoaderData<typeof crewLoader>()
  const [searchParams] = useSearchParams()
  const skill = searchParams.get('skill')
  const shown = skill === null ? crew : crew.filter((person) => person.skills.includes(skill))

  return (
    <>
      <h1>Crew</h1>
      <p>Found {shown.length} people.</p>
      <ul>
        {shown.map((person) => (
          <li key={person.id}>
            {person.name}
            {person.role === 'organizer' && ' (organizer)'}
          </li>
        ))}
      </ul>
    </>
  )
}
