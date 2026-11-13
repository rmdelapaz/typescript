// Bramblekey's mock API for visits (Lab 11.1, Task 3): MSW handlers like the starter's src/mocks/handlers.ts,
// answering from the data in db.ts. The tests add them to the starter's test server.
import { http, HttpResponse } from 'msw'
import type { ApiErrorBody, ErrorCode } from '../api/types.ts'
import { createVisitDb } from './db.ts'
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
      // TODO 3: the two rules only the server can be trusted with (it knows every visit), each answered with
      // status 409 and the error code 'conflict' (add it to ErrorCode in src/api/types.ts; tsc then shows the
      // one other place that must learn about it):
      //   1. only a requested or scheduled visit can get a (new) day. Message, with the status's label from
      //      visitStatusLabels:  A Tuned visit can't be rescheduled.
      //   2. at most VISITS_PER_DAY visits on one day, not counting this visit. Message:
      //      2026-06-18 is full: the tuner has 3 visits that day. Choose another day.
      return HttpResponse.json(
        db.save({ ...visit, status: 'scheduled', scheduledFor: day, updatedAt: new Date().toISOString() }),
      )
    }),
  ]
  return { handlers, db }
}
