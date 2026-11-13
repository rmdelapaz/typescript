// Tests (do not edit): npm test runs them, npm run typecheck type-checks them with your code.
import { useState } from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse, type JsonBodyType } from 'msw'
import { setupServer } from 'msw/node'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { API_URL } from './api.ts'
import { ErrorBoundary, type FallbackProps } from './ErrorBoundary.tsx'
import { SitePanel } from './SitePanel.tsx'
import { forgetSite, sitePromise } from './sitePromises.ts'

// real answers of shoreline-api, saved in the lab's fixtures/ folder (npm test runs in starter/)
const fixture = (name: string): JsonBodyType => JSON.parse(readFileSync(join(process.cwd(), '..', 'fixtures', name), 'utf8'))
const sites = fixture('sites.json') as { id: string }[]
const requests: string[] = []
let failNext = new Set<string>()           // ids whose NEXT request answers 500
const server = setupServer(
  http.get(`${API_URL}/api/sites/:id`, async ({ params }) => {
    const id = String(params.id)
    requests.push(id)
    await delay(100)                       // a real network takes a moment: long enough to see the fallback
    if (failNext.delete(id)) return HttpResponse.json(fixture('error-500.json'), { status: 500 })
    const site = sites.find((s) => s.id === id)
    return site ? HttpResponse.json(site) : HttpResponse.json(fixture('site-404.json'), { status: 404 })
  }),
)
afterEach(() => { requests.length = 0; failNext = new Set() })
// React reports every error a boundary catches with console.error: keep the test output readable
beforeAll(() => { vi.spyOn(console, 'error').mockImplementation(() => {}) })
// A suspended component shows its data once React has seen the promise settle: let it, inside act
async function settle(id: string) {
  await act(async () => { await sitePromise(id).catch(() => {}) })
}

// MSW 3 calls the option onUnhandledFrame. A request no handler answers fails the test it came from.
const unhandled: string[] = []
beforeAll(() => server.listen({
  onUnhandledFrame({ frame, defaults }) {
    const { data } = frame         // unknown: narrow it before reading the request
    const request = typeof data === 'object' && data !== null && 'request' in data
      && data.request instanceof Request ? data.request : undefined
    unhandled.push(request ? `${request.method} ${request.url}` : frame.protocol)
    defaults.error()
  },
}))
afterEach(() => {
  const missed = unhandled.splice(0)
  if (missed.length) throw new Error(`No MSW handler for: ${missed.join(', ')}`)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Task 1: one promise per id, until it is forgotten', async () => {
  const first = sitePromise('north-jetty')
  expect(sitePromise('north-jetty')).toBe(first)
  expect(sitePromise('long-strand')).not.toBe(first)
  await Promise.all([first, sitePromise('long-strand')])
  forgetSite('north-jetty')
  expect(sitePromise('north-jetty')).not.toBe(first)
  await sitePromise('north-jetty')
  expect(requests).toEqual(['north-jetty', 'long-strand', 'north-jetty'])
})

test('Task 2: the fallback while waiting, then the site, with one request', async () => {
  await act(async () => { render(<SitePanel siteId="driftwood-cove" />) })   // awaited: React may suspend inside it
  expect(screen.getByRole('status')).toHaveTextContent('Loading the site…')
  await settle('driftwood-cove')
  expect(screen.getByRole('heading', { name: 'Driftwood Cove' })).toBeInTheDocument()
  expect(screen.getByText(/^Town: /)).toBeInTheDocument()
  expect(screen.getByText(/^Parking: /)).toBeInTheDocument()
  expect(requests).toEqual(['driftwood-cove'])
})

test('Task 2: an id the API does not have is "Site not found", with nothing to retry', async () => {
  await act(async () => { render(<SitePanel siteId="seal-rock" />) })   // awaited: React may suspend inside it
  await settle('seal-rock')
  expect(screen.getByRole('heading', { name: 'Site not found' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
})

test('Task 2: a failure offers Try again, and Try again really asks again', async () => {
  failNext.add('pelican-point')
  await act(async () => { render(<SitePanel siteId="pelican-point" />) })   // awaited: React may suspend inside it
  await settle('pelican-point')
  expect(screen.getByRole('alert')).toHaveTextContent('Could not load the site.')
  await act(async () => { screen.getByRole('button', { name: 'Try again' }).click() })
  await settle('pelican-point')
  expect(screen.getByRole('heading', { name: 'Pelican Point Beach' })).toBeInTheDocument()
  expect(requests).toEqual(['pelican-point', 'pelican-point'])
})

// Task 3: the boundary on its own, with a child that throws while rendering
let broken = true
function Flaky() {
  if (broken) throw new Error('Test crash')
  return <p>The crew list is back.</p>
}
function Caught({ error, retry }: FallbackProps) {
  return (
    <p>
      Caught: {error instanceof Error ? error.message : 'something'}{' '}
      <button type="button" onClick={retry}>Retry</button>
    </p>
  )
}

test('Task 3: the boundary shows its fallback, and retry renders the children again', async () => {
  const user = userEvent.setup()
  const onRetry = vi.fn(() => { broken = false })
  render(
    <section>
      <h2>Outside the boundary</h2>
      <ErrorBoundary fallback={Caught} onRetry={onRetry}>
        <Flaky />
      </ErrorBoundary>
    </section>,
  )
  expect(screen.getByText(/^Caught: Test crash/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Outside the boundary' })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Retry' }))
  expect(onRetry).toHaveBeenCalledOnce()
  expect(screen.getByText('The crew list is back.')).toBeInTheDocument()
})

test('Task 3: an error in a click handler is NOT caught: the page stays as it is', async () => {
  const user = userEvent.setup()
  function ClickError() {
    const [clicks, setClicks] = useState(0)
    return (
      <button type="button" onClick={() => { setClicks(clicks + 1); if (clicks >= 0) throw new Error('in a handler') }}>
        Clicked {clicks}
      </button>
    )
  }
  const errors: unknown[] = []
  const keep = (event: ErrorEvent) => { errors.push(event.error); event.preventDefault() }
  window.addEventListener('error', keep)
  render(<ErrorBoundary fallback={Caught}><ClickError /></ErrorBoundary>)
  await user.click(screen.getByRole('button', { name: 'Clicked 0' }))
  window.removeEventListener('error', keep)
  expect(screen.queryByText(/^Caught:/)).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Clicked 1' })).toBeInTheDocument()
  expect(errors).toHaveLength(1)
})
