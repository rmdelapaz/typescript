// The mock API: MSW handlers that answer like a real server would, from the data in db.ts.
// The SAME handlers answer in tests (src/test/server.ts), in `npm run dev:demo` and in the demo build
// (src/mocks/browser.ts), so the three can never disagree (the HQ's "one API core" idea).
import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { newItemBodySchema } from '../api/schemas.ts'
import type { ApiErrorBody, ErrorCode } from '../api/types.ts'
import { createDb } from './db.ts'

function problem(status: number, error: ErrorCode, message: string, fieldErrors?: Record<string, string[]>) {
  const body: ApiErrorBody = { error, message, ...(fieldErrors && { fieldErrors }) }
  return HttpResponse.json(body, { status })
}

/** baseUrl = where the app sends its requests: the site's own address in the demo, VITE_API_URL in tests */
export function createHandlers({ baseUrl }: { baseUrl: string }) {
  const db = createDb()
  const handlers = [
    http.get(`${baseUrl}/api/items`, () => HttpResponse.json(db.items)),

    http.get(`${baseUrl}/api/items/:itemId`, ({ params }) => {
      const item = db.items.find((candidate) => candidate.id === params.itemId)
      return item ? HttpResponse.json(item) : problem(404, 'not_found', 'There is no item with this id.')
    }),

    http.post(`${baseUrl}/api/items`, async ({ request }) => {
      const body: unknown = await request.json().catch(() => null)
      // A real server checks everything again: never trust what a browser sends
      const result = newItemBodySchema.safeParse(body)
      if (!result.success) {
        return problem(400, 'validation_failed', 'Some fields need attention.', z.flattenError(result.error).fieldErrors)
      }
      // A rule only the server can check: it is the one that knows every item
      const taken = db.items.some((item) => item.name.toLowerCase() === result.data.name.toLowerCase())
      if (taken) {
        return problem(400, 'validation_failed', 'Some fields need attention.', {
          name: ['An item with this name already exists.'],
        })
      }
      const item = db.add({ ...result.data, status: 'open', createdAt: new Date().toISOString() })
      return HttpResponse.json(item, { status: 201 })
    }),
  ]
  return { handlers, db }
}
