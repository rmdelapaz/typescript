// Task 1's tests (do not edit). `npx tsc -b` checks this file like every other one: each @ts-expect-error line
// says "the next line MUST be an error". While your type is too loose, that line is no error, and tsc reports the
// directive as unused (TS2578). Fix the type, never this file.
import { describe, expect, it } from 'vitest'
import { sampleVisits } from './db.ts'
import { pianoKindLabels, visitStatusLabels } from './labels.ts'
import type { Client, NewVisit, PianoKind, TuningVisit, VisitChanges, VisitStatus } from './types.ts'

describe('Task 1: the domain types', () => {
  it('lets only real values through (npx tsc -b checks this test)', () => {
    // @ts-expect-error a misspelled status is not a VisitStatus
    const typo: VisitStatus = 'tunned'
    // @ts-expect-error a harpsichord is not a piano this business tunes
    const kind: PianoKind = 'harpsichord'
    const notYet: TuningVisit['scheduledFor'] = null
    const phoneOnly: Client['email'] = null
    const booking: NewVisit = {
      clientId: 'c2',
      piano: { kind: 'upright', maker: 'Halden' },
      request: 'Two sticky keys before the recital.',
      // @ts-expect-error the API decides the status, not the booking form
      status: 'paid',
    }
    const change: VisitChanges = { scheduledFor: '2026-06-20' }
    const [first] = sampleVisits()
    // @ts-expect-error the total is computed (Task 2), never stored
    const stored = first?.total
    expect([typo, kind, notYet, phoneOnly, booking.request, change.scheduledFor, stored]).toHaveLength(7)
  })

  it('has a label for every status and every kind of piano, in order', () => {
    expect(Object.keys(visitStatusLabels), 'TODO 1: a label for every status').toEqual([
      'requested',
      'scheduled',
      'tuned',
      'invoiced',
      'paid',
    ])
    expect(Object.keys(pianoKindLabels), 'TODO 1: a label for every kind of piano').toEqual(['upright', 'baby-grand', 'grand'])
  })
})
