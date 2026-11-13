import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useLoaderData } from 'react-router'
import { eventQuery } from '../api/queries.ts'
import { ImpactReportForm } from '../components/ImpactReportForm.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { canReportImpact } from '../utils/impactForm.ts'
import type { impactReportLoader } from './loaders.ts'
import styles from './Page.module.css'

// The route is events/:eventId/impact: impactReportLoader has checked the organizer,
// put the cleanup in the cache, and read the saved report (null when there is none yet)
export function ImpactReportPage() {
  const { eventId, viewer, report } = useLoaderData<typeof impactReportLoader>()
  const { data: event } = useSuspenseQuery(eventQuery(eventId, viewer))
  useDocumentTitle(`Impact of ${event.title}`)

  return (
    <>
      <p>
        <Link to={`/events/${event.id}`}>← {event.title}</Link>
      </p>
      <h1>{report === null ? 'Report the impact' : 'Update the impact report'}</h1>
      {canReportImpact(event) ? (
        <>
          <p className={styles.lead}>
            What the crew took off the beach. It counts toward the totals on the Impact page.
          </p>
          <ImpactReportForm event={event} report={report} />
        </>
      ) : (
        <p>Impact can be reported once a cleanup has taken place. This one is {event.status}.</p>
      )}
    </>
  )
}
