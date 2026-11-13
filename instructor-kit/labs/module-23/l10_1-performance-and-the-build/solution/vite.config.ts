/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vitest reads its settings from here, like the course app (Lesson 9.1)
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: ['./src/setupTests.ts'] },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // React on every visit, in a file whose name stays the same when only the app's code changes
            { name: 'vendor', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
