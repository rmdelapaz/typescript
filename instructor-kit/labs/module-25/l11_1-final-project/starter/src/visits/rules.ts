// Values computed from the data, never stored, and the visit's rule tables (Lab 11.1, Task 2).
import type { Cents, DateString, TuningVisit, VisitStatus } from './types.ts'

/** TODO 2: true for the five statuses only (look the value up in visitStatusLabels with Object.hasOwn, as the
 *  starter's client.ts does for items) */
export function isVisitStatus(value: unknown): value is VisitStatus {
  throw new Error(`TODO 2: isVisitStatus(${String(value)})`)
}

/** TODO 2: where each status may go next: one step at a time, and a paid visit nowhere */
export const nextSteps: Record<VisitStatus, readonly VisitStatus[]> = {}

/** TODO 2: the fee plus every extra line (quantity times unit price), in cents */
export function visitTotal(visit: TuningVisit): Cents {
  throw new Error(`TODO 2: visitTotal(${visit.id})`)
}

/** TODO 2: a SCHEDULED visit whose day is before today (a visit with no day is never overdue) */
export function isOverdue(visit: TuningVisit, today: DateString): boolean {
  throw new Error(`TODO 2: isOverdue(${visit.id}, ${today})`)
}
