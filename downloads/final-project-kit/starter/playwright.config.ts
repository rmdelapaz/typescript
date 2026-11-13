import { defineConfig } from '@playwright/test'

// End-to-end tests run against the DEMO build: the mock API in src/mocks answers inside the browser,
// so no server of your own has to start. If your app has a real API, start it here as a second
// webServer and test the normal build against it (Lessons 9.3 and 10.2).
export default defineConfig({
  testDir: './e2e',
  // A forgotten test.only must not hide the other tests on a CI service
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    // Keep a step-by-step recording of every test that fails
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build:demo && npm run preview -- --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
