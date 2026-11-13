import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useLoaderData } from 'react-router'
import { eventQuery, sitesQuery } from '../api/queries.ts'
import { EditEventForm } from '../components/EditEventForm.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import type { editEventLoader } from './loaders.ts'
import styles from './Page.module.css'

// The route is events/:eventId/edit: editEventLoader has checked the organizer and filled the cache
export function EditEventPage() {
  const { eventId, viewer } = useLoaderData<typeof editEventLoader>()
  const { data: event } = useSuspenseQuery(eventQuery(eventId, viewer))
  const { data: sites } = useSuspenseQuery(sitesQuery())
  useDocumentTitle(`Edit ${event.title}`)
  // Completed and cancelled cleanups are history: their details stay as they were
  const editable = event.status === 'draft' || event.status === 'scheduled'

  return (
    <>
      <p>
        <Link to={`/events/${event.id}`}>← {event.title}</Link>
      </p>
      <h1>Edit cleanup details</h1>
      {editable ? (
        <>
          <p className={styles.lead}>
            Volunteers who signed up see the new details on the cleanup's page.
          </p>
          <EditEventForm event={event} sites={sites} />
        </>
      ) : (
        <p>Only drafts and scheduled cleanups can be edited. This one is {event.status}.</p>
      )}
    </>
  )
}
