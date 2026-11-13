// The lab's mock API (given, do not change): MSW answers the form's requests inside the tests.
// One cleanup, e08, with 6 spots; sign-ups are kept in memory until api.reset().
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const API_URL = 'http://api.test'

/** The API's error shape: a code for programs, a message for people */
export interface ApiErrorBody {
  error: 'full' | 'server_error'
  message: string
}

const data = { spotsLeft: 6, signups: [] as string[] }

export const api = {
  /** The sample data, fresh (the test setup calls it before every test) */
  reset() {
    data.spotsLeft = 6
    data.signups = []
  },
  /** Every spot taken: the next sign-up gets the API's real 409 */
  fill() {
    data.spotsLeft = 0
  },
  /** The names signed up so far (newest last) */
  get signups(): readonly string[] {
    return data.signups
  },
}

export const server = setupServer(
  http.get(`${API_URL}/api/events/:eventId`, ({ params }) =>
    HttpResponse.json({ id: params.eventId, title: 'Weekend Cove Cleanup', spotsLeft: data.spotsLeft }),
  ),
  http.post(`${API_URL}/api/events/:eventId/signups`, async ({ request }) => {
    const { name } = (await request.json()) as { name: string }
    if (data.spotsLeft === 0) {
      return HttpResponse.json({ error: 'full', message: 'This cleanup is full.' } satisfies ApiErrorBody, { status: 409 })
    }
    data.spotsLeft -= 1
    data.signups.push(name)
    return HttpResponse.json({ name }, { status: 201 })
  }),
)

/** Starts writing down every request as 'METHOD /path'; read the array at the end of the test */
export function recordRequests(): string[] {
  const requests: string[] = []
  server.events.on('request:start', ({ request }) => {
    requests.push(`${request.method} ${new URL(request.url).pathname}`)
  })
  return requests
}
