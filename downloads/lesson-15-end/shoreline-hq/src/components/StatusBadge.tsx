import type { EventStatus } from '../api/types.ts'
import { Badge, type BadgeTone } from './Badge.tsx'

// One entry per status: TypeScript reports a missing or misspelled one.
const statusBadges: Record<EventStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: 'Draft', tone: 'neutral' },
  scheduled: { label: 'Scheduled', tone: 'info' },
  completed: { label: 'Completed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
}

interface StatusBadgeProps {
  status: EventStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, tone } = statusBadges[status]
  return <Badge label={label} tone={tone} />
}
