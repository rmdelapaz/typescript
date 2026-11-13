import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

// The demo build (npx vite build --mode demo) starts its own API in the browser before the first request.
// In every other build this is 'production' === 'demo': the branch and its import() are removed.
if (import.meta.env.MODE === 'demo') {
  const { startDemoApi } = await import('./demo/browser.ts')
  await startDemoApi()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
