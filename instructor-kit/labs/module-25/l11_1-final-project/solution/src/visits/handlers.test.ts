// Task 3's tests (do not edit): the mock API keeps the rules only a server can check
import { beforeEach, describe, expect, it } from 'vitest'
import { API_URL, server } from '../test/server.ts'
import { createVisitHandlers } from './handlers.ts'

// The starter's test server answers for items; each test adds the visit routes, with fresh sample data
beforeEach(() => {
  server.use(...createVisitHandlers({ baseUrl: API_URL }).handlers)
})

function schedule(visitId: string, body: unknown) {
  return fetch(`${API_URL}/api/visits/${visitId}/schedule`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('Task 3: the rules only the server can check', () => {
  it('lists the sample visits', async () => {
    const response = await fetch(`${API_URL}/api/visits`)
    expect(await response.json()).toHaveLength(6)
  })

  it('answers 404 for a visit that does not exist', async () => {
    const response = await schedule('pv99', { scheduledFor: '2026-06-19' })
    expect(response.status).toBe(404)
  })

  it('refuses a day that is not YYYY-MM-DD, field by field', async () => {
    const response = await schedule('pv4', { scheduledFor: 'next Tuesday' })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ fieldErrors: { scheduledFor: ['Choose a day.'] } })
  })

  it('schedules a requested visit on a free day', async () => {
    const response = await schedule('pv4', { scheduledFor: '2026-06-19' })
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ id: 'pv4', status: 'scheduled', scheduledFor: '2026-06-19' })
  })

  it('refuses a fourth visit on a full day, and says why', async () => {
    const response = await schedule('pv4', { scheduledFor: '2026-06-18' })
    expect(response.status, 'TODO 3: at most 3 visits a day').toBe(409)
    expect(await response.json()).toEqual({
      error: 'conflict',
      message: '2026-06-18 is full: the tuner has 3 visits that day. Choose another day.',
    })
  })

  it('lets a visit on a full day keep its own day', async () => {
    const response = await schedule('pv1', { scheduledFor: '2026-06-18' })
    expect(response.status).toBe(200)
  })

  it('refuses to reschedule a visit that is already tuned', async () => {
    const response = await schedule('pv5', { scheduledFor: '2026-06-22' })
    expect(response.status, 'TODO 3: only a requested or scheduled visit gets a new day').toBe(409)
    expect(await response.json()).toEqual({ error: 'conflict', message: "A Tuned visit can't be rescheduled." })
  })
})
