import type { ChangeEvent } from 'react'
import { NavLink, Outlet, useParams, useSearchParams } from 'react-router'
import { cleanups, siteIds, siteNames, statusLabels, statuses } from './cleanups.ts'
import { readChoice, withParams } from './params.ts'

// /log: the cleanups, filtered by ?status= and ?site= (Task 2), the chosen one at the <Outlet /> (Task 3)
export function CleanupLog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = readChoice(searchParams, 'status', statuses)
  const site = readChoice(searchParams, 'site', siteIds)
  const shown = cleanups.filter(
    (cleanup) =>
      (status === undefined || cleanup.status === status) && (site === undefined || cleanup.siteId === site),
  )

  // A choice is a new history entry (Back undoes it); the other filter stays as it is
  function changeFilter(name: 'status' | 'site') {
    return (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value
      setSearchParams((current) => withParams(current, { [name]: value }))
    }
  }

  return (
    <>
      <h1>Cleanup log</h1>
      <label htmlFor="status">Status</label>
      <select id="status" value={status ?? ''} onChange={changeFilter('status')}>
        <option value="">All statuses</option>
        {statuses.map((value) => (
          <option key={value} value={value}>
            {statusLabels[value]}
          </option>
        ))}
      </select>
      <label htmlFor="site">Site</label>
      <select id="site" value={site ?? ''} onChange={changeFilter('site')}>
        <option value="">Any site</option>
        {siteIds.map((id) => (
          <option key={id} value={id}>
            {siteNames[id]}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => setSearchParams({})}>
        Clear filters
      </button>
      {/* The nested route renders here: a hint, or one cleanup */}
      <Outlet />
      <p role="status">
        Showing {shown.length} {shown.length === 1 ? 'cleanup' : 'cleanups'}.
      </p>
      <ul>
        {shown.map((cleanup) => (
          <li key={cleanup.id}>
            {/* Relative to this route, and the ?search goes along, so the list keeps its filters */}
            <NavLink to={{ pathname: cleanup.id, search: searchParams.toString() }}>{cleanup.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

// /log/:cleanupId: one cleanup, shown at the log's <Outlet /> (Task 3)
export function CleanupDetails() {
  // Naming the parameter: a typo such as cleanupID is a type error
  const { cleanupId } = useParams<'cleanupId'>()
  if (cleanupId === undefined) {
    throw new Error('CleanupDetails needs a route with a :cleanupId parameter')
  }
  const cleanup = cleanups.find((item) => item.id === cleanupId)
  if (cleanup === undefined) {
    return <h2>No cleanup called {cleanupId}</h2>
  }
  return (
    <section aria-label="Chosen cleanup">
      <h2>{cleanup.title}</h2>
      <p>
        {siteNames[cleanup.siteId]} · {statusLabels[cleanup.status]}
      </p>
    </section>
  )
}
