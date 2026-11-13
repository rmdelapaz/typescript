import { sites } from './sites.ts'

// /sites: every site, each name a link to its own page
export function SitesPage() {
  return (
    <>
      <h1>Beach sites</h1>
      <ul>
        {sites.map((site) => (
          <li key={site.id}>
            {/* TODO 2: a link that changes the page without loading the app again */}
            <a href={`/sites/${site.id}`}>{site.name}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

// /sites/:siteId: one site, read from the address
export function SitePage() {
  // TODO 2: read siteId with useParams<'siteId'>(), narrow it, and show the site (findSite in sites.ts):
  // its name as the heading and "town · terrain" under it, or the heading "No site called <id>"
  return <p>TODO 2: show the site from the address</p>
}
