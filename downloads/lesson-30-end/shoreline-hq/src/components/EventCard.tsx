import { useState } from 'react'
import { Link } from 'react-router'
import type { CleanupEvent, Site } from '../api/types.ts'
import { useUiStore } from '../state/uiStore.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate } from '../utils/format.ts'
import { Button } from './Button.tsx'
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
  // true or false: this card re-renders only when the answer changes, not on every store change
  const compact = useUiStore((state) => state.density === 'compact')

  return (
    <article className={cardStyles.card}>
      <h3>
        <Link to={`/events/${event.id}`}>{event.title}</Link>
      </h3>
      <p className={styles.badges}>
        <StatusBadge status={event.status} />
      </p>
      <p>
        <time dateTime={event.date}>{formatDate(event.date)}</time>, {event.startTime} to{' '}
        {event.endTime}
      </p>
      {!compact && <p>{site ? site.name : 'Site to be confirmed'}: {event.meetingPoint}</p>}
      <SpotsLine availability={getAvailability(event)} capacity={event.capacity} />
      {!compact && event.suppliesProvided.length > 0 && (
        <p className={styles.supplies}>We bring: {event.suppliesProvided.join(', ')}</p>
      )}
      <div className={styles.actions}>
        {/* The space before the hidden text stays outside it: some tools drop a space at its start */}
        <Button
          variant="link"
          aria-expanded={showDetails}
          onClick={() => setShowDetails((shown) => !shown)}
        >
          {showDetails ? 'Hide details' : 'Show details'}{' '}
          <VisuallyHidden>for {event.title}</VisuallyHidden>
        </Button>
      </div>
      {showDetails && <p>{event.description}</p>}
    </article>
  )
}
