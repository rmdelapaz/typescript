// The mock API for tests: the same handlers as the demo answer the app's requests inside the test run
import { setupServer } from 'msw/node'
import { createHandlers } from '../mocks/handlers.ts'

// The same address the app sends its requests to (vite.config.ts sets it for tests)
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export const { handlers, db } = createHandlers({ baseUrl: API_URL })
export const server = setupServer(...handlers)
