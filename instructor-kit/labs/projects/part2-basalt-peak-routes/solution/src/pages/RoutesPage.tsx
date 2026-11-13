import type { ChangeEvent } from 'react'
import { Link, useLoaderData, useSearchParams } from 'react-router'
import { grades, isGrade, isWallId } from '../api/client.ts'
import { readFilters, withParam } from '../utils/filters.ts'
import type { routesLoader } from './loaders.ts'

export function RoutesPage() {
  const { walls, routes } = useLoaderData<typeof routesLoader>()
  // The filters live in the address: /routes?wall=the-cave&grade=V4 (Back and shared links keep them)
  const [searchParams, setSearchParams] = useSearchParams()
  const { wall, grade } = readFilters(searchParams)
  const wallName = (id: string) => walls.find((w) => w.id === id)?.name ?? id

  // A <select> hands over a string: only a value the app knows goes into the address
  function handleWallChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    setSearchParams(withParam(searchParams, 'wall', isWallId(value) ? value : ''))
  }

  function handleGradeChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    setSearchParams(withParam(searchParams, 'grade', isGrade(value) ? value : ''))
  }

  return (
    <>
      <h1>Routes on the walls</h1>
      <section className="filters" aria-label="Filters">
        <div className="field">
          <label htmlFor="wall-filter">Wall</label>
          <select id="wall-filter" value={wall ?? ''} onChange={handleWallChange}>
            <option value="">All walls</option>
            {walls.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="grade-filter">Grade</label>
          <select id="grade-filter" value={grade ?? ''} onChange={handleGradeChange}>
            <option value="">All grades</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </section>
      <p className="count">
        Showing {routes.length} active {routes.length === 1 ? 'route' : 'routes'}.
      </p>
      {routes.length === 0 ? (
        <p>No routes on the walls match these filters. Try another wall or grade.</p>
      ) : (
        <ul className="route-list">
          {routes.map((route) => (
            <li key={route.id}>
              <Link to={`/routes/${route.id}`}>{route.name}</Link>
              <span className="grade">{route.grade}</span>
              <span className="meta">
                {wallName(route.wallId)} · {route.holdColor} holds
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
