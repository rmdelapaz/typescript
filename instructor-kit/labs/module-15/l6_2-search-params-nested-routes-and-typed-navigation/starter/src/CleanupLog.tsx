import { useState } from 'react'
import { NavLink } from 'react-router'
import type { EventStatus, SiteId } from './cleanups.ts'
import { cleanups, siteIds, siteNames, statusLabels, statuses } from './cleanups.ts'

// /log: the cleanups, filtered by status and site
export function CleanupLog() {
  // TODO 2: the filters live in useState, so a reload, a shared link or Back forgets them.
  // Read them from ?status= and ?site= instead (useSearchParams + readChoice), and write them with
  // setSearchParams + withParams, keeping the other filter. Clear filters empties the search.
  const [status, setStatus] = useState<EventStatus | ''>('')
  const [site, setSite] = useState<SiteId | ''>('')
  const shown = cleanups.filter(
    (cleanup) => (status === '' || cleanup.status === status) && (site === '' || cleanup.siteId === site),
  )

  return (
    <>
      <h1>Cleanup log</h1>
      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={(event) => setStatus(statuses.find((s) => s === event.target.value) ?? '')}>
        <option value="">All statuses</option>
        {statuses.map((value) => (
          <option key={value} value={value}>
            {statusLabels[value]}
          </option>
        ))}
      </select>
      <label htmlFor="site">Site</label>
      <select id="site" value={site} onChange={(event) => setSite(siteIds.find((id) => id === event.target.value) ?? '')}>
        <option value="">Any site</option>
        {siteIds.map((id) => (
          <option key={id} value={id}>
            {siteNames[id]}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => {
          setStatus('')
          setSite('')
        }}
      >
        Clear filters
      </button>
      {/* TODO 3: the nested route (a hint, or one cleanup) renders here */}
      <p role="status">
        Showing {shown.length} {shown.length === 1 ? 'cleanup' : 'cleanups'}.
      </p>
      <ul>
        {shown.map((cleanup) => (
          <li key={cleanup.id}>
            {/* TODO 3: this link drops the ?search: keep it */}
            <NavLink to={cleanup.id}>{cleanup.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

// /log/:cleanupId: one cleanup, shown beside the list (Task 3)
export function CleanupDetails() {
  // TODO 3: read cleanupId with useParams<'cleanupId'>(), narrow it, and show the cleanup: its title as an <h2>
  // and "site name · Status" under it, or the <h2> "No cleanup called <id>"
  return <p>TODO 3: show the cleanup from the address</p>
}
