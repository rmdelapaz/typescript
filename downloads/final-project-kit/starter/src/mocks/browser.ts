// The demo's API (Lesson 10.2): the mock API's handlers, running in this browser tab.
// MSW's service worker hands every request for /api/... on this site to them.
import { setupWorker } from 'msw/browser'
import { createHandlers } from './handlers.ts'

export async function startDemoApi() {
  // The demo answers on the site's own address, wherever it is deployed
  const { handlers } = createHandlers({ baseUrl: window.location.origin })
  const worker = setupWorker(...handlers)
  await worker.start({
    // Everything that is not /api (the page, its files, pictures) goes to the host as usual
    onUnhandledFrame: 'bypass',
    // No "[MSW] …" line in the console for every request
    quiet: true,
  })
}
