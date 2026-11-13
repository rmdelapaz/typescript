/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { msw } from 'msw/vite'
import { defineConfig } from 'vite'

// The mode decides the build: MSW's worker file (mockServiceWorker.js) is added only in demo mode (Lesson 10.2)
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === 'demo' && msw({ mode: 'worker-only' })],
  test: { environment: 'jsdom', setupFiles: ['./src/setupTests.ts'] },
}))
