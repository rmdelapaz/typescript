import { SiteCard } from '../components/SiteCard.tsx'
import { sites } from '../data/sites.ts'

export function SitesPage() {
  return (
    <>
      <h1>Beach sites</h1>
      <p className="lead">Six stretches of coast the crew looks after.</p>
      <div className="card-grid">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </>
  )
}
