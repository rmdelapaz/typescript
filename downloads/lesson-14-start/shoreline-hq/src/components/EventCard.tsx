import { useState } from 'react'
import type { CleanupEvent, Site } from '../api/types.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate } from '../utils/format.ts'
import cardStyles from './Card.module.css'
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

  return (
    <article className={cardStyles.card}>
      <h3>{event.title}</h3>
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
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={showDetails}
        onClick={() => setShowDetails((shown) => !shown)}
      >
        {showDetails ? 'Hide details' : 'Show details'}
        <VisuallyHidden> for {event.title}</VisuallyHidden>
      </button>
      {showDetails && <p>{event.description}</p>}
    </article>
  )
}
