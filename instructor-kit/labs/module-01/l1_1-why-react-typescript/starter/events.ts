// Lab 1.1, Tasks 1 and 3. Open ../fixtures/events.json first: it is what GET /api/events sends.

// TODO 1: describe a cleanup the way the API sends it. At least: id, title, status, date, startTime,
// endTime, capacity and spotsTaken (look at the JSON: which values are text, which are numbers?).
export interface CleanupEvent {}

// TODO 3: a status is always one of four words (draft, scheduled, completed, cancelled): say exactly that.
export type EventStatus = string

// Task 1: "Storm Debris Sweep (completed), 09:00 to 12:00: 10 spots left"
export function summary(event: CleanupEvent): string {
  throw new Error(`TODO 1: the summary of a cleanup (${JSON.stringify(event).slice(0, 30)}...)`)
}

// Task 3: "scheduled" -> "Scheduled"
export function statusLabel(status: EventStatus): string {
  throw new Error(`TODO 3: a label for ${status}`)
}
