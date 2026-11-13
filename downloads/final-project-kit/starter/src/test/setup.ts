// Runs before every test file (vite.config.ts → test.setupFiles)
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest'
import { queryClient } from '../api/queries.ts'
import { db, server } from './server.ts'

// jsdom draws nothing, so it cannot scroll: React Router's ScrollRestoration calls this
window.scrollTo = () => {}

// In tests a failed request should fail at once: no retries with pauses in between
queryClient.setDefaultOptions({
  queries: { ...queryClient.getDefaultOptions().queries, retry: false },
})

// Answer requests with the mock API. A request it does not know fails the test.
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
// Every test starts from the sample data
beforeEach(() => db.reset())

afterEach(() => {
  // Take the rendered components off the page, so each test starts with an empty one
  cleanup()
  // Forget the overrides a test added with server.use()
  server.resetHandlers()
  // State that lives in modules, outside React, goes back to the start (add your stores here)
  queryClient.clear()
  localStorage.clear()
  sessionStorage.clear()
})

afterAll(() => server.close())
