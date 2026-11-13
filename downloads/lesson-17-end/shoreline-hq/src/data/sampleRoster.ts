import type { RosterRow } from '../components/RosterTable.tsx'

// A saved copy of today's roster for Tide Pool Morning Cleanup, from GET /api/events/e17/signups.
// That request needs an organizer's sign-in (Lesson 5.2); until then the check-in desk practices here.
// Names and notes only: everything in src/ ships to every visitor's browser, so no emails or phones.
export const sampleRosterEventId = 'e17'

export const sampleRoster: RosterRow[] = [
  { id: 's088', note: 'Bringing my own gloves.', volunteer: { name: 'Diego Herrera' } },
  { id: 's091', note: '', volunteer: { name: 'Grace Whitaker' } },
  { id: 's094', note: '', volunteer: { name: 'Ines Moreau' } },
  { id: 's092', note: '', volunteer: { name: 'Ravi Patel' } },
  { id: 's090', note: '', volunteer: { name: 'Sofia Lindgren' } },
  { id: 's093', note: 'Bringing my own gloves.', volunteer: { name: 'Tariq Mensah' } },
  { id: 's089', note: '', volunteer: { name: 'Theo Nakamura' } },
]
