import { useState } from 'react'
import type { CleanupEvent, Site } from '../api/types.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate } from '../utils/format.ts'
import cardStyles from './Card.module.css'
import { ConfirmDialog } from './ConfirmDialog.tsx'
import styles from './EventCard.module.css'
import { SpotsLine } from './SpotsLine.tsx'
import { StatusBadge } from './StatusBadge.tsx'
import { VisuallyHidden } from './VisuallyHidden.tsx'

interface EventCardProps {
  event: CleanupEvent
  /** undefined when the event's site is not in the list */
  site: Site | undefined
}

export function EventCard({ event, site }: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [readyToCancel, setReadyToCancel] = useState(false)

  function cancelCleanup() {
    setConfirming(false)
    setReadyToCancel(true)
  }

  return (
    <article className={cardStyles.card}>
      <h3>
        <a href={`/events/${event.id}`}>{event.title}</a>
      </h3>
      <p className={styles.badges}>
        <StatusBadge status={event.status} />
      </p>
      <p>
        <time dateTime={event.date}>{formatDate(event.date)}</time>, {event.startTime} to{' '}
        {event.endTime}
      </p>
      <p>{site ? site.name : 'Site to be confirmed'}: {event.meetingPoint}</p>
      <SpotsLine availability={getAvailability(event)} capacity={event.capacity} />
      {event.suppliesProvided.length > 0 && (
        <p className={styles.supplies}>We bring: {event.suppliesProvided.join(', ')}</p>
      )}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={showDetails}
          onClick={() => setShowDetails((shown) => !shown)}
        >
          {showDetails ? 'Hide details' : 'Show details'}
          <VisuallyHidden> for {event.title}</VisuallyHidden>
        </button>
        {event.status === 'scheduled' && (
          <button
            type="button"
            className={styles.toggle}
            aria-haspopup="dialog"
            onClick={() => setConfirming(true)}
          >
            Cancel cleanup<VisuallyHidden> for {event.title}</VisuallyHidden>
          </button>
        )}
      </div>
      {showDetails && <p>{event.description}</p>}
      {event.status === 'scheduled' && (
        // Always in the page, so screen readers notice when the text appears
        <p role="status" className={styles.note}>
          {readyToCancel && 'Ready to cancel. Nothing is sent to shoreline-api yet (Lesson 7.2).'}
        </p>
      )}
      {confirming && (
        <ConfirmDialog
          title="Cancel this cleanup?"
          keepLabel="Keep it"
          confirmLabel="Cancel the cleanup"
          onKeep={() => setConfirming(false)}
          onConfirm={cancelCleanup}
        >
          <p>
            <strong>{event.title}</strong>, {formatDate(event.date)}. Volunteers signed up:{' '}
            {event.spotsTaken}. They will need to hear about it.
          </p>
        </ConfirmDialog>
      )}
    </article>
  )
}
