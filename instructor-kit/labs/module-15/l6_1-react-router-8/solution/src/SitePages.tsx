import { Link, useParams } from 'react-router'
import { findSite, sites } from './sites.ts'

// /sites: every site, each name a router link to its own page
export function SitesPage() {
  return (
    <>
      <h1>Beach sites</h1>
      <ul>
        {sites.map((site) => (
          <li key={site.id}>
            <Link to={`/sites/${site.id}`}>{site.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

// /sites/:siteId: one site, read from the address
export function SitePage() {
  const { siteId } = useParams<'siteId'>()
  if (siteId === undefined) {
    throw new Error('SitePage needs a route with a :siteId parameter')
  }
  const site = findSite(siteId)
  if (site === undefined) {
    return <h1>No site called {siteId}</h1>
  }
  return (
    <>
      <h1>{site.name}</h1>
      <p>
        {site.town} · {site.terrain}
      </p>
    </>
  )
}
