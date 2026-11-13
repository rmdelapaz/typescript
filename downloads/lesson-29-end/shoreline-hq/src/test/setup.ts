// Runs before every test file (vite.config.ts → test.setupFiles)
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { saveSession } from '../api/client.ts'
import { queryClient } from '../api/queries.ts'
import { useUiStore } from '../state/uiStore.ts'

afterEach(() => {
  // Take the rendered components off the page, so each test starts with an empty one
  cleanup()
  // The app keeps state in modules, outside React: put each piece back the way the app starts
  queryClient.clear()
  saveSession(null)
  useUiStore.setState(useUiStore.getInitialState())
  localStorage.clear()
  sessionStorage.clear()
})
