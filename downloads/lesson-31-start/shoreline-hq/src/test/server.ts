// The mock API for tests: shoreline-api's own code answers the app's requests inside the test run
import { setupServer } from 'msw/node'
import { createHandlers } from '../mocks/msw/handlers.ts'

// The same address the app sends its requests to (vite.config.ts sets it for tests)
export const API_URL = import.meta.env.VITE_API_URL

// api = the API's code with its sample data; handlers = MSW's way in to it
export const { handlers, api } = createHandlers({ baseUrl: API_URL })
export const server = setupServer(...handlers)

/** Every request the app sends from now on, written as 'PATCH /api/events/e08' */
export function recordRequests(): string[] {
  const requests: string[] = []
  server.events.on('request:start', ({ request }) => {
    requests.push(`${request.method} ${new URL(request.url).pathname}`)
  })
  return requests
}
