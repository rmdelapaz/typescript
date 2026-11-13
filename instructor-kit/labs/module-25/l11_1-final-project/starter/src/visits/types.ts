// Bramblekey Piano Service: the domain types, written FIRST (Lab 11.1, Task 1).
// Each TODO 1 is a decision Lesson 11.1 made for Cobalt Cycle Repairs: make it here for a piano tuner.
// `npx tsc -b` checks these types against types.test.ts. While a type is too loose, an @ts-expect-error line
// there is "unused" (TS2578): together with the other errors, that is your to-do list.
import type { Timestamp } from '../api/types.ts'

/** A day in the tuner's calendar: "YYYY-MM-DD" */
export type DateString = string

/** Money as a whole number of cents: 14500 is $145.00 */
export type Cents = number

// TODO 1: only three kinds of piano: 'upright', 'baby-grand' and 'grand'
export type PianoKind = string

// TODO 1: a visit moves through 'requested', 'scheduled', 'tuned', 'invoiced' and 'paid', in this order
export type VisitStatus = string

export interface Client {
  id: string
  name: string
  phone: string
  // TODO 1: some clients only give a phone number: known to be empty, not "not sent"
  email?: string
}

/** One line of the extras on a visit: a part or a repair on top of the tuning fee */
export interface ExtraLine {
  item: string
  quantity: number
  unitPrice: Cents
}

export interface TuningVisit {
  id: string
  clientId: string
  piano: { kind: PianoKind; maker: string }
  request: string
  status: VisitStatus
  fee: Cents
  extras: ExtraLine[]
  // TODO 1: null until the tuner has promised a day
  scheduledFor?: DateString
  // TODO 1: the total is the fee plus the extras: compute it (Task 2), never store it
  total: Cents
  createdAt: Timestamp
  updatedAt: Timestamp
}

// TODO 1: what the booking form sends: the client, the piano and the request, nothing else (Pick)
export type NewVisit = TuningVisit

// TODO 1: what the tuner may change: status, extras, fee and the day, each one optional (Partial of a Pick)
export type VisitChanges = TuningVisit
