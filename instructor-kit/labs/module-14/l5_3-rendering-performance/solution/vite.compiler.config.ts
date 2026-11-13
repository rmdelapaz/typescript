/// <reference types="vitest/config" />
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// The same tests with the React Compiler on, set up the way Lesson 5.3 sets up the HQ: npm run test:compiler
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: { environment: 'jsdom', setupFiles: ['./src/setupTests.ts'] },
})
