import type { NewShift, Shift } from './types.ts'

// In the tests, MSW answers at this address (no server needed)
export const API_URL = 'http://api.test'

export async function getShifts(siteId: string): Promise<Shift[]> {
  const response = await fetch(`${API_URL}/api/shifts?site=${encodeURIComponent(siteId)}`)
  if (!response.ok) throw new Error(`GET /api/shifts failed (${response.status})`)
  return (await response.json()) as Shift[]
}

export async function postShift(shift: NewShift): Promise<Shift> {
  const response = await fetch(`${API_URL}/api/shifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shift),
  })
  if (!response.ok) throw new Error(`POST /api/shifts failed (${response.status})`)
  return (await response.json()) as Shift
}
