import { useLoaderData } from 'react-router'
import { DataList } from '../components/DataList.tsx'
import { SiteCard } from '../components/SiteCard.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import type { sitesLoader } from './loaders.ts'
import styles from './Page.module.css'

export function SitesPage() {
  useDocumentTitle('Beach sites')
  // The router ran sitesLoader before showing this page: the sites are already here
  const sites = useLoaderData<typeof sitesLoader>()

  return (
    <>
      <h1>Beach sites</h1>
      <p className={styles.lead}>Six stretches of coast the crew looks after.</p>
      <DataList
        items={sites}
        getKey={(site) => site.id}
        emptyMessage="No beach sites yet."
        renderItem={(site) => <SiteCard site={site} />}
      />
    </>
  )
}
