import { getSites } from '../api/client.ts'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { NewEventForm } from '../components/NewEventForm.tsx'
import { useApi } from '../hooks/useApi.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

export function NewEventPage() {
  useDocumentTitle('Plan a cleanup')
  // The form needs the sites for its menu and its checks
  const sites = useApi('/sites', getSites)

  return (
    <>
      <h1>Plan a cleanup</h1>
      <p className={styles.lead}>
        Fill in the basics. Save it as a draft to finish later, or publish it so volunteers can
        sign up.
      </p>
      {sites.state.kind === 'ready' ? (
        <NewEventForm sites={sites.state.data} />
      ) : (
        <LoadStatus state={sites.state} what="the beach sites" onRetry={sites.reload} />
      )}
    </>
  )
}
