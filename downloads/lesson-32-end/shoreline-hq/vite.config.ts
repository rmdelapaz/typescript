/// <reference types="vitest/config" />
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // The React Compiler: works out what each component can reuse between renders
    babel({ presets: [reactCompilerPreset()] }),
    // `npm run analyze` only: a map of every chunk and what is inside it (dist/stats.html)
    mode === 'analyze' && visualizer({ filename: 'dist/stats.html', gzipSize: true }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              // What every page needs: one file that stays cached when only the HQ's own code changes
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|@tanstack|zustand)[\\/]/,
            },
            {
              // Only the organizer forms import these, so only they load this file
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
