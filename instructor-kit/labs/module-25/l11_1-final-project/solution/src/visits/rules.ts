// Values computed from the data, never stored, and the visit's rule tables (Lab 11.1, Task 2, reference solution).
import { visitStatusLabels } from './labels.ts'
import type { Cents, DateString, TuningVisit, VisitStatus } from './types.ts'

/** One of the five statuses: the label table knows them all */
export function isVisitStatus(value: unknown): value is VisitStatus {
  return typeof value === 'string' && Object.hasOwn(visitStatusLabels, value)
}

/** Where each status may go next: one step at a time, and a paid visit nowhere */
export const nextSteps: Record<VisitStatus, readonly VisitStatus[]> = {
  requested: ['scheduled'],
  scheduled: ['tuned'],
  tuned: ['invoiced'],
  invoiced: ['paid'],
  paid: [],
}

/** The fee plus every extra line, in cents: worked out every time, never stored */
export function visitTotal(visit: TuningVisit): Cents {
  const extras = visit.extras.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0)
  return visit.fee + extras
}

/** A scheduled visit whose day is before today ("YYYY-MM-DD" strings compare in calendar order) */
export function isOverdue(visit: TuningVisit, today: DateString): boolean {
  return visit.status === 'scheduled' && visit.scheduledFor !== null && visit.scheduledFor < today
}
