import { Link, useLoaderData } from 'react-router'
import type { homeLoader } from './loaders.ts'

export function HomePage() {
  const walls = useLoaderData<typeof homeLoader>()

  return (
    <>
      <h1>Basalt Peak Climbing Gym</h1>
      <p className="lead">What is up on the walls this week. Pick a wall to see its routes.</p>
      <h2 id="walls-heading">The walls</h2>
      <ul className="wall-list" aria-labelledby="walls-heading">
        {walls.map(({ wall, count }) => (
          <li key={wall.id}>
            <Link to={`/routes?wall=${wall.id}`}>{wall.name}</Link>: {count} active{' '}
            {count === 1 ? 'route' : 'routes'}
          </li>
        ))}
      </ul>
    </>
  )
}
