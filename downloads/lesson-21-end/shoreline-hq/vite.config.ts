import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // The React Compiler: works out what each component can reuse between renders
    babel({ presets: [reactCompilerPreset()] }),
  ],
})
