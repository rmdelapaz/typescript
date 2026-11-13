// MSW 3 handlers that answer exactly like the Basalt Peak API, for the tests. They run the API's own code
// (core.ts) in memory, so a test sees the same routes, rules and errors as `npm run api`, with no server running.
//
//   const { handlers, api } = createHandlers('http://localhost:4400')
//   const server = setupServer(...handlers)
//   beforeEach(() => api.reset())          // every test starts from the sample data
import { http } from 'msw'
import { createApi, type ApiOptions } from './core.ts'

export function createHandlers(baseUrl: string, options: ApiOptions = {}) {
  const api = createApi(options)
  const handlers = [http.all(`${baseUrl}/api/*`, ({ request }) => api.handle(request))]
  return { handlers, api }
}
