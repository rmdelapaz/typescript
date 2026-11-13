import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getEvents } from './api/client.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Temporary (Lesson 2.4): prove the typed client works. Lesson 4.1 moves fetching into components.
getEvents()
  .then((events) => {
    console.log(`Loaded ${events.length} cleanups. First: ${events[0]?.title ?? 'none'}`)
  })
  .catch((error: unknown) => {
    console.error(error)
  })
