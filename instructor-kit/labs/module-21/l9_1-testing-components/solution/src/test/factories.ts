// Sample data for tests: complete, correctly typed objects. A test passes only the parts it is about.
import type { Shift } from '../types.ts'

/** A worked 3-hour shift at Pelican Point Beach */
export function makeShift(changes: Partial<Shift> = {}): Shift {
  return {
    id: 'sh1',
    volunteer: 'v04',
    site: 'Pelican Point Beach',
    date: '2026-07-04',
    hours: 3,
    status: 'worked',
    ...changes,
  }
}
