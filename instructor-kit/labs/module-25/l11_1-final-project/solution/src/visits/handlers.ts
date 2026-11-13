// Bramblekey's mock API for visits (Lab 11.1, Task 3, reference solution): MSW handlers like the starter's src/mocks/handlers.ts,
// answering from the data in db.ts. The tests add them to the starter's test server.
import { http, HttpResponse } from 'msw'
import type { ApiErrorBody, ErrorCode } from '../api/types.ts'
import { createVisitDb } from './db.ts'
import { visitStatusLabels } from './labels.ts'
import type { DateString } from './types.ts'

function problem(status: number, error: ErrorCode, message: string, fieldErrors?: Record<string, string[]>) {
  const body: ApiErrorBody = { error, message, ...(fieldErrors && { fieldErrors }) }
  return HttpResponse.json(body, { status })
}

/** "YYYY-MM-DD" and a real day */
function isDateString(value: unknown): value is DateString {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
}

/** One tuner, at most three visits a day */
export const VISITS_PER_DAY = 3

export function createVisitHandlers({ baseUrl }: { baseUrl: string }) {
  const db = createVisitDb()
  const handlers = [
    http.get(`${baseUrl}/api/visits`, () => HttpResponse.json(db.visits)),

    http.get(`${baseUrl}/api/visits/:visitId`, ({ params }) => {
      const visit = db.visits.find((candidate) => candidate.id === params.visitId)
      return visit ? HttpResponse.json(visit) : problem(404, 'not_found', 'There is no visit with this id.')
    }),

    // Give a visit its day: the body is { "scheduledFor": "YYYY-MM-DD" }
    http.patch(`${baseUrl}/api/visits/:visitId/schedule`, async ({ params, request }) => {
      const visit = db.visits.find((candidate) => candidate.id === params.visitId)
      if (!visit) {
        return problem(404, 'not_found', 'There is no visit with this id.')
      }
      const body: unknown = await request.json().catch(() => null)
      const day = typeof body === 'object' && body !== null && 'scheduledFor' in body ? body.scheduledFor : undefined
      if (!isDateString(day)) {
        return problem(400, 'validation_failed', 'Some fields need attention.', { scheduledFor: ['Choose a day.'] })
      }
      // Rule 1: a visit that is tuned, invoiced or paid keeps its day
      if (visit.status !== 'requested' && visit.status !== 'scheduled') {
        return problem(409, 'conflict', `A ${visitStatusLabels[visit.status]} visit can't be rescheduled.`)
      }
      // Rule 2: one tuner, at most VISITS_PER_DAY visits a day (this visit not counted, so it can stay put)
      const sameDay = db.visits.filter((other) => other.id !== visit.id && other.scheduledFor === day)
      if (sameDay.length >= VISITS_PER_DAY) {
        return problem(409, 'conflict', `${day} is full: the tuner has ${sameDay.length} visits that day. Choose another day.`)
      }
      return HttpResponse.json(
        db.save({ ...visit, status: 'scheduled', scheduledFor: day, updatedAt: new Date().toISOString() }),
      )
    }),
  ]
  return { handlers, db }
}
