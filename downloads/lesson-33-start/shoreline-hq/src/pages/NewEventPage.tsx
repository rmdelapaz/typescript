import { useQuery } from '@tanstack/react-query'
import { sitesQuery } from '../api/queries.ts'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { NewEventForm } from '../components/NewEventForm.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

export function NewEventPage() {
  useDocumentTitle('Plan a cleanup')
  // The form needs the sites for its menu and its checks
  const sites = useQuery(sitesQuery())

  return (
    <>
      <h1>Plan a cleanup</h1>
      <p className={styles.lead}>
        Fill in the basics. Save it as a draft to finish later, or publish it so volunteers can
        sign up.
      </p>
      {sites.isSuccess ? (
        <NewEventForm sites={sites.data} />
      ) : (
        <LoadStatus query={sites} what="the beach sites" />
      )}
    </>
  )
}
