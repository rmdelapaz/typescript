// Sample data for tests: complete, correctly typed objects. A test passes only the parts it is about.
import type { Shift } from '../types.ts'

/** A worked 3-hour shift at Pelican Point Beach */
export function makeShift(changes: Partial<Shift> = {}): Shift {
  // TODO 1: return a complete Shift (every property, status 'worked', 3 hours), with `changes` spread on top
  throw new Error(`TODO 1: makeShift(${JSON.stringify(changes)}) is not written yet`)
}
