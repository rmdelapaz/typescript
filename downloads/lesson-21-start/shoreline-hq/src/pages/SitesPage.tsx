import { getSites } from '../api/client.ts'
import { DataList } from '../components/DataList.tsx'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { SiteCard } from '../components/SiteCard.tsx'
import { useApi } from '../hooks/useApi.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

export function SitesPage() {
  useDocumentTitle('Beach sites')
  const sites = useApi('/sites', getSites)

  return (
    <>
      <h1>Beach sites</h1>
      <p className={styles.lead}>Six stretches of coast the crew looks after.</p>
      {sites.state.kind === 'ready' ? (
        <DataList
          items={sites.state.data}
          getKey={(site) => site.id}
          emptyMessage="No beach sites yet."
          renderItem={(site) => <SiteCard site={site} />}
        />
      ) : (
        <LoadStatus state={sites.state} what="the beach sites" onRetry={sites.reload} />
      )}
    </>
  )
}
