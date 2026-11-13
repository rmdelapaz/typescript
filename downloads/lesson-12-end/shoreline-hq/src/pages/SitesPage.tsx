import { SiteCard } from '../components/SiteCard.tsx'
import { sites } from '../data/sites.ts'
import styles from './Page.module.css'

export function SitesPage() {
  return (
    <>
      <h1>Beach sites</h1>
      <p className={styles.lead}>Six stretches of coast the crew looks after.</p>
      <div className={styles.grid}>
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </>
  )
}
