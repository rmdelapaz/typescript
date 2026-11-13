import { useSuspenseQuery } from '@tanstack/react-query'
import { sitesQuery } from '../api/queries.ts'
import { DataList } from '../components/DataList.tsx'
import { SiteCard } from '../components/SiteCard.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

export function SitesPage() {
  useDocumentTitle('Beach sites')
  // sitesLoader put the sites in the cache before this page renders: data is never undefined
  const { data: sites } = useSuspenseQuery(sitesQuery())

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
