// The words people see for each union value (Lab 11.1, Task 1, reference solution).
// A Record lists EVERY value: add a status to the union and TypeScript points here until it has a label.
import type { PianoKind, VisitStatus } from './types.ts'

export const visitStatusLabels: Record<VisitStatus, string> = {
  requested: 'Requested',
  scheduled: 'Scheduled',
  tuned: 'Tuned',
  invoiced: 'Invoiced',
  paid: 'Paid',
}

export const pianoKindLabels: Record<PianoKind, string> = {
  upright: 'Upright',
  'baby-grand': 'Baby grand',
  grand: 'Grand',
}
