// Bramblekey's sample data (Lab 11.1, given): three clients and six visits, one of them awkward on purpose.
// Do not edit: the tests count on it.
import type { Client, TuningVisit } from './types.ts'

export function sampleClients(): Client[] {
  return [
    { id: 'c1', name: 'Inés Okafor', phone: '555-0141', email: 'ines.okafor@example.com' },
    // Only a phone number
    { id: 'c2', name: 'Wendell Park', phone: '555-0178', email: null },
    { id: 'c3', name: 'Riverbend Community Hall', phone: '555-0102', email: 'bookings@riverbend.example.com' },
  ]
}

export function sampleVisits(): TuningVisit[] {
  return [
    {
      id: 'pv1',
      clientId: 'c1',
      piano: { kind: 'upright', maker: 'Halden' },
      request: 'Yearly tuning.',
      status: 'scheduled',
      fee: 14500,
      extras: [],
      scheduledFor: '2026-06-18',
      createdAt: '2026-06-01T17:05:00.000Z',
      updatedAt: '2026-06-02T09:30:00.000Z',
    },
    {
      id: 'pv2',
      clientId: 'c3',
      piano: { kind: 'grand', maker: 'Aldine' },
      request: 'Tune before the Saturday concert.',
      status: 'scheduled',
      fee: 18500,
      extras: [],
      scheduledFor: '2026-06-18',
      createdAt: '2026-06-03T15:20:00.000Z',
      updatedAt: '2026-06-03T15:45:00.000Z',
    },
    {
      id: 'pv3',
      clientId: 'c2',
      piano: { kind: 'baby-grand', maker: 'Morrow & Lyle' },
      request: 'Pitch raise: it has not been tuned in years.',
      status: 'scheduled',
      fee: 14500,
      extras: [{ item: 'Pitch raise', quantity: 1, unitPrice: 6000 }],
      scheduledFor: '2026-06-18',
      createdAt: '2026-06-04T18:00:00.000Z',
      updatedAt: '2026-06-05T08:10:00.000Z',
    },
    {
      // The awkward one: just asked for, nothing known yet (no fee agreed, no extras, no day)
      id: 'pv4',
      clientId: 'c2',
      piano: { kind: 'upright', maker: 'Unknown (no name on the fallboard)' },
      request: 'Some keys stick.',
      status: 'requested',
      fee: 0,
      extras: [],
      scheduledFor: null,
      createdAt: '2026-06-10T19:40:00.000Z',
      updatedAt: '2026-06-10T19:40:00.000Z',
    },
    {
      id: 'pv5',
      clientId: 'c1',
      piano: { kind: 'upright', maker: 'Halden' },
      request: 'Tuning, and two hammers that stopped working.',
      status: 'tuned',
      fee: 14500,
      extras: [{ item: 'Hammer felt repair', quantity: 2, unitPrice: 1250 }],
      scheduledFor: '2026-06-12',
      createdAt: '2026-05-28T16:00:00.000Z',
      updatedAt: '2026-06-12T13:15:00.000Z',
    },
    {
      id: 'pv6',
      clientId: 'c3',
      piano: { kind: 'grand', maker: 'Aldine' },
      request: 'Regulation after the move to the new stage.',
      status: 'paid',
      fee: 18500,
      extras: [],
      scheduledFor: '2026-06-05',
      createdAt: '2026-05-20T10:00:00.000Z',
      updatedAt: '2026-06-09T11:00:00.000Z',
    },
  ]
}

/** The visits the mock API keeps in memory: a fresh copy of the sample data each time it is created */
export function createVisitDb() {
  let visits = sampleVisits()
  return {
    get visits(): readonly TuningVisit[] {
      return visits
    },
    /** Replace a visit with a changed copy: the saved object is never edited */
    save(changed: TuningVisit): TuningVisit {
      visits = visits.map((visit) => (visit.id === changed.id ? changed : visit))
      return changed
    },
  }
}
