import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

// The demo (npm run dev:demo, npm run build:demo) starts its own API in the browser before the first request
if (import.meta.env.MODE === 'demo') {
  const { startDemoApi } = await import('./mocks/browser.ts')
  await startDemoApi()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
