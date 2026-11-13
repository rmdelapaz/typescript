// Bramblekey Piano Service: the domain types, written FIRST (Lab 11.1, Task 1, reference solution).
import type { Timestamp } from '../api/types.ts'

/** A day in the tuner's calendar: "YYYY-MM-DD" */
export type DateString = string

/** Money as a whole number of cents: 14500 is $145.00 */
export type Cents = number

export type PianoKind = 'upright' | 'baby-grand' | 'grand'

/** A visit moves through these steps, in this order */
export type VisitStatus = 'requested' | 'scheduled' | 'tuned' | 'invoiced' | 'paid'

export interface Client {
  id: string
  name: string
  phone: string
  /** Some clients only give a phone number */
  email: string | null
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
  /** null until the tuner has promised a day */
  scheduledFor: DateString | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

// NOT stored, computed when needed (rules.ts): the total (fee + extras) and "overdue" (scheduledFor before today)

/** The booking form: the API adds id, status 'requested', the fee, no extras, no day and the timestamps */
export type NewVisit = Pick<TuningVisit, 'clientId' | 'piano' | 'request'>

/** What the tuner may change on a visit */
export type VisitChanges = Partial<Pick<TuningVisit, 'status' | 'extras' | 'fee' | 'scheduledFor'>>
