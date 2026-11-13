import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

// TODO 1: this decides "demo or not" while the app runs, so the demo API stays in EVERY build.
// Decide it when Vite builds instead (Lesson 10.2): import.meta.env.MODE === 'demo'
if (window.location.hostname.endsWith('.netlify.app')) {
  const { startDemoApi } = await import('./demo/browser.ts')
  await startDemoApi()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
