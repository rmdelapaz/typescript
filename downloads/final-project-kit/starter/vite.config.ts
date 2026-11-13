/// <reference types="vitest/config" />
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { msw } from 'msw/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// The same setup as Shoreline Crew HQ at the end of Lesson 10.2
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // The React Compiler: works out what each component can reuse between renders (Lesson 5.3)
    babel({ presets: [reactCompilerPreset()] }),
    // `npm run analyze` only: a map of every chunk and what is inside it (dist/stats.html)
    mode === 'analyze' && visualizer({ filename: 'dist/stats.html', gzipSize: true }),
    // `npm run dev:demo` and `npm run build:demo` only: serves / adds MSW's mockServiceWorker.js
    mode === 'demo' && msw({ mode: 'worker-only' }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              // What every page needs: one file that stays cached when only your own code changes
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|@tanstack|zustand)[\\/]/,
            },
            {
              // Only the pages with forms import these: keep those pages lazy and only they load this file
              name: 'forms',
              test: /node_modules[\\/](zod|react-hook-form|@hookform)[\\/]/,
            },
          ],
        },
      },
    },
  },
  // Vitest reads the same file, so tests run the code exactly as the app's build does
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    env: { VITE_API_URL: 'http://localhost:4000' },
  },
}))
