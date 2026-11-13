// Runs before every test file (vite.config.ts → test.setupFiles)
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest'
import { saveSession } from '../api/client.ts'
import { queryClient } from '../api/queries.ts'
import { useUiStore } from '../state/uiStore.ts'
import { api, server } from './server.ts'

// jsdom draws nothing, so it cannot scroll: React Router's ScrollRestoration calls this
window.scrollTo = () => {}

// In tests a failed request should fail at once: no retries with pauses in between
queryClient.setDefaultOptions({
  queries: { ...queryClient.getDefaultOptions().queries, retry: false },
})

// Answer requests with the mock API. A request it does not know fails the test.
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
// Every test starts from the sample data, with only the API's own handlers
beforeEach(() => api.reset())

afterEach(() => {
  // Take the rendered components off the page, so each test starts with an empty one
  cleanup()
  // Forget the overrides a test added with server.use()
  server.resetHandlers()
  server.events.removeAllListeners()
  // The app keeps state in modules, outside React: put each piece back the way the app starts
  queryClient.clear()
  saveSession(null)
  useUiStore.setState(useUiStore.getInitialState())
  localStorage.clear()
  sessionStorage.clear()
})

afterAll(() => server.close())
