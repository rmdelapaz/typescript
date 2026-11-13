// Lab 1.1, Tasks 1 and 3 (reference solution)

export interface CleanupEvent {
  id: string
  title: string
  status: EventStatus
  date: string
  startTime: string
  endTime: string
  capacity: number
  spotsTaken: number
}

export type EventStatus = 'draft' | 'scheduled' | 'completed' | 'cancelled'

export function summary(event: CleanupEvent): string {
  const left = event.capacity - event.spotsTaken
  return `${event.title} (${event.status}), ${event.startTime} to ${event.endTime}: ${left} spots left`
}

export function statusLabel(status: EventStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}
