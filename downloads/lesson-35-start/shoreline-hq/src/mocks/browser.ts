// The demo build's API (Lesson 10.2): shoreline-api's own code, running in this browser tab.
// MSW's service worker hands every request for /api/... on this site to the same handlers the tests use.
import { setupWorker } from 'msw/browser'
import { createHandlers } from './msw/handlers.ts'

export async function startDemoApi() {
  // The demo answers on the site's own address, wherever it is deployed
  const { handlers } = createHandlers({ baseUrl: window.location.origin })
  const worker = setupWorker(...handlers)
  await worker.start({
    // Everything that is not /api (the page, its files, the site pictures) goes to the host as usual
    onUnhandledFrame: 'bypass',
    // No "[MSW] …" line in the console for every request
    quiet: true,
  })
}
