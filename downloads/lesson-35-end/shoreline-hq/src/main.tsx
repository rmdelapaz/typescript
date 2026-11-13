import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/outfit'
import './index.css'
import { App } from './App.tsx'
import { showTheme, useUiStore } from './state/uiStore.ts'

// The saved theme goes on <html> before the first render, then follows every change
showTheme(useUiStore.getState().theme)
useUiStore.subscribe((state, previous) => {
  if (state.theme !== previous.theme) {
    showTheme(state.theme)
  }
})

// The demo build (npm run build:demo) starts its own API in the browser before the first request
if (import.meta.env.MODE === 'demo') {
  const { startDemoApi } = await import('./mocks/browser.ts')
  await startDemoApi()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
