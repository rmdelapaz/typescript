import { defineConfig } from '@playwright/test'
import { API_URL } from './e2e/helpers.ts'

export default defineConfig({
  testDir: './e2e',
  // One shoreline-api serves every test, and the tests change its data: one test at a time
  workers: 1,
  // A forgotten test.only must not hide the other tests on a CI service
  forbidOnly: !!process.env.CI,
  // After the last test, put the API's sample data back
  globalTeardown: './e2e/global-teardown.ts',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    // The crew's time zone, so the browser's "today" is the API's "today"
    timezoneId: 'America/Los_Angeles',
    // Keep a step-by-step recording of every test that fails
    trace: 'retain-on-failure',
  },
  // Playwright starts both servers (or reuses them if they are already running)
  webServer: [
    {
      command: 'node server.ts --quiet',
      cwd: '../shoreline-api',
      url: `${API_URL}/api`,
      reuseExistingServer: true,
    },
    {
      command: 'npm run build && npm run preview -- --strictPort',
      url: 'http://localhost:4173',
      env: { VITE_API_URL: API_URL },
      reuseExistingServer: true,
    },
  ],
})
