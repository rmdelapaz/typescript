// Checkpoint 3 tests (handed out, do not edit): npm test
import { MutationObserver } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { API_URL } from './api.ts'
import { addShiftMutation, queryClient, shiftsQuery } from './queries.ts'
import { shiftFormSchema, type ShiftFormData, type ShiftFormValues } from './schemas.ts'
import type { NewShift, Shift } from './types.ts'

const saved: Shift[] = [
  { id: 'sh1', siteId: 'pelican-point', volunteer: 'Theo Nakamura', date: '2026-07-04', hours: 3 },
  { id: 'sh7', siteId: 'driftwood-cove', volunteer: 'Diego Herrera', date: '2026-07-04', hours: 2 },
]
const posted: unknown[] = []
const server = setupServer(
  http.get(`${API_URL}/api/shifts`, ({ request }) => {
    const site = new URL(request.url).searchParams.get('site')
    return HttpResponse.json(saved.filter((shift) => shift.siteId === site))
  }),
  http.post(`${API_URL}/api/shifts`, async ({ request }) => {
    const body = (await request.json()) as NewShift
    posted.push(body)
    return HttpResponse.json({ id: 'sh9', ...body } satisfies Shift, { status: 201 })
  }),
)
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
  posted.length = 0
})
afterAll(() => server.close())

const HOURS = 'Hours must be a whole number from 1 to 12.'

describe('C1 shiftFormSchema', () => {
  it('turns the form text into data for the API', () => {
    const values: ShiftFormValues = { volunteer: '  Theo Nakamura ', date: '2026-07-11', hours: '4' }
    const data: ShiftFormData = shiftFormSchema.parse(values)
    expect(data).toEqual({ volunteer: 'Theo Nakamura', date: '2026-07-11', hours: 4 })
  })

  it('names every problem under its own field', () => {
    const result = shiftFormSchema.safeParse({ volunteer: ' T ', date: '', hours: '2.5' })
    expect(result.success ? [] : z.flattenError(result.error).fieldErrors).toEqual({
      volunteer: ['Add a name (2 letters or more).'],
      date: ['Pick a date.'],
      hours: [HOURS],
    })
  })

  it.each(['0', '13', 'lots'])('refuses %s hours with one clear message', (hours) => {
    const result = shiftFormSchema.safeParse({ volunteer: 'Maya Okafor', date: '2026-07-11', hours })
    expect(result.success ? [] : z.flattenError(result.error).fieldErrors.hours).toEqual([HOURS])
  })
})

describe('C2 shiftsQuery and addShiftMutation', () => {
  it('keys one site from general to specific', () => {
    expect(shiftsQuery('pelican-point').queryKey).toEqual(['shifts', 'pelican-point'])
  })

  it('fetches that site only', async () => {
    expect(await queryClient.query(shiftsQuery('pelican-point'))).toEqual([saved[0]])
  })

  it('sends the new shift, then marks every list of shifts out of date', async () => {
    await queryClient.query(shiftsQuery('pelican-point'))
    await queryClient.query(shiftsQuery('driftwood-cove'))
    const shift: NewShift = { siteId: 'pelican-point', volunteer: 'Maya Okafor', date: '2026-07-11', hours: 2 }

    await new MutationObserver(queryClient, addShiftMutation()).mutate(shift)

    expect(posted).toEqual([shift])
    expect(queryClient.getQueryState(['shifts', 'pelican-point'])?.isInvalidated).toBe(true)
    expect(queryClient.getQueryState(['shifts', 'driftwood-cove'])?.isInvalidated).toBe(true)
  })
})
