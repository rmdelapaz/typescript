import { defineConfig } from '@playwright/test'

// The lab's own config: one small site, one browser (Chromium), one test at a time
export default defineConfig({
  testDir: './e2e',
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  globalSetup: './e2e/global-setup.ts',
  use: { baseURL: 'http://localhost:4322' },
})
