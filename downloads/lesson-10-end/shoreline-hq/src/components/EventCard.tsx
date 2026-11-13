import { useState } from 'react'
import type { CleanupEvent } from '../api/types.ts'
import { sites } from '../data/sites.ts'
import { getAvailability } from '../utils/availability.ts'
import { formatDate } from '../utils/format.ts'
import { SpotsLine } from './SpotsLine.tsx'
import { StatusBadge } from './StatusBadge.tsx'

interface EventCardProps {
  event: CleanupEvent
}

export function EventCard({ event }: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const site = sites.find((s) => s.id === event.siteId)

  return (
    <article className="card event-card">
      <h3>{event.title}</h3>
      <p className="badges">
        <StatusBadge status={event.status} />
      </p>
      <p>
        <time dateTime={event.date}>{formatDate(event.date)}</time>, {event.startTime} to{' '}
        {event.endTime}
      </p>
      <p>{site ? site.name : 'Site to be confirmed'}: {event.meetingPoint}</p>
      <SpotsLine availability={getAvailability(event)} capacity={event.capacity} />
      {event.suppliesProvided.length > 0 && (
        <p className="muted">We bring: {event.suppliesProvided.join(', ')}</p>
      )}
      <button
        type="button"
        className="button-link"
        aria-expanded={showDetails}
        onClick={() => setShowDetails((shown) => !shown)}
      >
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails && <p>{event.description}</p>}
    </article>
  )
}
