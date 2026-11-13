// Tests (do not edit): npm test runs them, npm run typecheck type-checks them with your code.
import { act, render, screen, waitFor } from '@testing-library/react'
import { delay, http, HttpResponse, type JsonBodyType } from 'msw'
import { setupServer } from 'msw/node'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { ApiError, fetchSiteEvents } from './api.ts'
import { ConnectionBadge } from './ConnectionBadge.tsx'
import { statusText, type LoadState } from './loadState.ts'
import { SiteCleanups } from './SiteCleanups.tsx'

// real answers of shoreline-api, saved in the lab's fixtures/ folder (npm test runs in starter/)
const fixture = (name: string): JsonBodyType => JSON.parse(readFileSync(join(process.cwd(), '..', 'fixtures', name), 'utf8'))
const API = 'http://api.test'
const requests: string[] = []
const server = setupServer(
  http.get(`${API}/api/events`, async ({ request }) => {
    const siteId = new URL(request.url).searchParams.get('siteId')
    requests.push(siteId ?? '')
    if (siteId === 'pelican-point') {
      await delay(300)                   // the slow answer: it arrives AFTER Long Strand's
      return HttpResponse.json(fixture('events-pelican-point.json'))
    }
    if (siteId === 'long-strand') return HttpResponse.json(fixture('events-long-strand.json'))
    if (siteId === 'seal-rock') return HttpResponse.json([])
    return HttpResponse.json(fixture('error-500.json'), { status: 500 })
  }),
)
afterEach(() => { requests.length = 0 })

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

test('Task 1: online, then offline, then online again', () => {
  render(<ConnectionBadge />)
  expect(screen.getByRole('status')).toHaveTextContent('Connection: Online')
  act(() => { window.dispatchEvent(new Event('offline')) })
  expect(screen.getByRole('status')).toHaveTextContent('Connection: Offline')
  act(() => { window.dispatchEvent(new Event('online')) })
  expect(screen.getByRole('status')).toHaveTextContent('Connection: Online')
})

test('Task 1: the cleanup removes every listener the effect added', () => {
  const added = vi.spyOn(window, 'addEventListener')
  const removed = vi.spyOn(window, 'removeEventListener')
  const { unmount } = render(<ConnectionBadge />)
  const mine = added.mock.calls.filter(([type]) => type === 'online' || type === 'offline')
  expect(mine).toHaveLength(2)
  unmount()
  for (const [type, listener] of mine) {
    expect(removed).toHaveBeenCalledWith(type, listener)
  }
  added.mockRestore()
  removed.mockRestore()
})

test('Task 2a: an answer with status 500 is an ApiError, not data', async () => {
  const failure = fetchSiteEvents(API, 'no-such-site')
  await expect(failure).rejects.toBeInstanceOf(ApiError)
  await expect(failure).rejects.toMatchObject({ status: 500, message: 'Simulated 500 response (the _status parameter).' })
})

test('Task 2b: loading first, then the titles of the site', async () => {
  render(<SiteCleanups apiUrl={API} siteId="long-strand" />)
  expect(screen.getByRole('status')).toHaveTextContent('Loading the cleanups…')
  expect(await screen.findByText('Long Strand Coastal Cleanup Day')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
  expect(requests).toEqual(['long-strand'])
})

test('Task 2b: an empty list and a failure each get their own words', async () => {
  const { rerender } = render(<SiteCleanups apiUrl={API} siteId="seal-rock" />)
  expect(await screen.findByText('No cleanups at this site yet.')).toBeInTheDocument()
  rerender(<SiteCleanups apiUrl={API} siteId="no-such-site" />)
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the cleanups. The server had a problem (500).')
})

test('Task 2b: a new site cancels the old request, so the slow old answer never shows', async () => {
  const { rerender } = render(<SiteCleanups apiUrl={API} siteId="pelican-point" />)
  await waitFor(() => expect(requests).toEqual(['pelican-point']))   // Pelican Point's request is out (and slow)
  rerender(<SiteCleanups apiUrl={API} siteId="long-strand" />)
  expect(await screen.findByText('Long Strand Big Day')).toBeInTheDocument()
  await new Promise((resolve) => setTimeout(resolve, 500))     // Pelican Point's answer has had time to arrive
  expect(screen.queryByText('Family Beach Morning')).not.toBeInTheDocument()
  expect(screen.getByText('Long Strand Big Day')).toBeInTheDocument()
  expect(requests).toEqual(['pelican-point', 'long-strand'])
})

test('Task 3: the words for each state', () => {
  expect(statusText({ kind: 'loading' }, 'the cleanups')).toBe('Loading the cleanups…')
  expect(statusText({ kind: 'failed', message: 'Try again.' }, 'the cleanups')).toBe('Could not load the cleanups. Try again.')
  expect(statusText({ kind: 'ready', data: [] }, 'the cleanups')).toBe('')
})

// Task 3 is done when npm run typecheck accepts these lines: LoadState must make both mistakes impossible.
const waiting: LoadState<string[]> = { kind: 'loading' }
// @ts-expect-error: there is no data while the request is out
void waiting.data
// @ts-expect-error: a ready state always carries its data
const empty: LoadState<string[]> = { kind: 'ready' }
void empty
