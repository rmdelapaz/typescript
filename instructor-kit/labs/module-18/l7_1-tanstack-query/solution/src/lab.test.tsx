// Tests (do not edit): npm test
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { http, HttpResponse, type JsonBodyType } from 'msw'
import { setupServer } from 'msw/node'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ReactElement } from 'react'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test } from 'vitest'
import { API_URL, ApiError } from './api.ts'
import { shouldRetry, siteEventsQuery } from './queries.ts'
import { SiteCleanups } from './SiteCleanups.tsx'
import type { CleanupEvent } from './types.ts'

// Real answers, saved from shoreline-api (../fixtures/): MSW answers with them, so no server is needed.
// The tests trust these saved files; the app's own code checks what it receives (api.ts).
const read = (name: string) => readFileSync(resolve(process.cwd(), '..', 'fixtures', name), 'utf8')
const events: CleanupEvent[] = JSON.parse(read('events.json'))
const notFound: { error: string; message: string } = JSON.parse(read('not-found.json'))
const titlesAt = (siteId: string) => events.filter((e) => e.siteId === siteId).map((e) => e.title)

// Every request MSW answers, written as '/api/events?siteId=north-jetty&perPage=50'
let requests: string[] = []
const server = setupServer(
  http.get(`${API_URL}/api/events`, ({ request }) => {
    const url = new URL(request.url)
    requests.push(url.pathname + url.search)
    const siteId = url.searchParams.get('siteId')
    return HttpResponse.json(events.filter((e) => e.siteId === siteId))
  }),
)
const failWith = (status: number, body: JsonBodyType) =>
  server.use(http.get(`${API_URL}/api/events`, ({ request }) => {
    requests.push(new URL(request.url).pathname)
    return HttpResponse.json(body, { status })
  }))
// MSW 3: a request no handler answers fails the test it came from
const unhandled: string[] = []
beforeAll(() => server.listen({
  onUnhandledFrame({ frame, defaults }) {
    const { data } = frame
    const request = typeof data === 'object' && data !== null && 'request' in data
      && data.request instanceof Request ? data.request : undefined
    unhandled.push(request ? `${request.method} ${request.url}` : frame.protocol)
    defaults.error()
  },
}))
beforeEach(() => {
  requests = []
})
afterEach(() => {
  const missed = unhandled.splice(0)
  if (missed.length) throw new Error(`No MSW handler for: ${missed.join(', ')}`)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// A fresh cache for every test, without retries (Task 3 tests retries on purpose)
function renderWithCache(ui: ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

test('Task 1: the key holds everything the answer depends on, general to specific', () => {
  expect(siteEventsQuery('north-jetty', 'guest').queryKey).toEqual(['events', 'site', 'north-jetty', 'guest'])
  expect(siteEventsQuery('north-jetty', 'v01').queryKey).not.toEqual(siteEventsQuery('north-jetty', 'guest').queryKey)
})

test('Task 1: two sites, two entries, two requests', async () => {
  // Like the HQ's 30 seconds: an answer in the cache counts as fresh, so nothing is asked twice
  const client = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })
  expect(await client.query(siteEventsQuery('north-jetty', 'guest'))).toHaveLength(2)
  const pelican = await client.query(siteEventsQuery('pelican-point', 'guest'))
  expect(pelican.map((event) => event.title)).toEqual(titlesAt('pelican-point'))
  expect(requests).toHaveLength(2)
})

test('Task 2: "Loading", then the titles', async () => {
  renderWithCache(<SiteCleanups siteId="north-jetty" viewer="guest" />)
  expect(screen.getByRole('status')).toHaveTextContent('Loading the cleanups…')
  const items = await screen.findAllByRole('listitem')
  expect(items.map((item) => item.textContent)).toEqual(titlesAt('north-jetty'))
})

test('Task 2: a site with no cleanups yet', async () => {
  server.use(http.get(`${API_URL}/api/events`, () => HttpResponse.json([])))
  renderWithCache(<SiteCleanups siteId="north-jetty" viewer="guest" />)
  expect(await screen.findByText('No cleanups at this site yet.')).toBeInTheDocument()
})

test("Task 2: the API's message when it says no", async () => {
  failWith(404, notFound)
  renderWithCache(<SiteCleanups siteId="seal-rock" viewer="guest" />)
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the cleanups. No site with that id.')
})

test('Task 3: a 401, 403 or 404 is never retried', () => {
  for (const status of [401, 403, 404]) {
    expect(shouldRetry(0, new ApiError(status, 'No'))).toBe(false)
  }
})

test('Task 3: network and server failures get two more tries', () => {
  expect(shouldRetry(0, new ApiError(500, 'Server error'))).toBe(true)
  expect(shouldRetry(1, new TypeError('Failed to fetch'))).toBe(true)
  expect(shouldRetry(2, new ApiError(500, 'Server error'))).toBe(false)
})

test('Task 3: counted requests: a 404 is asked once, a 500 three times', async () => {
  const client = new QueryClient()
  const options = { ...siteEventsQuery('north-jetty', 'guest'), retry: shouldRetry, retryDelay: 0 }
  failWith(404, notFound)
  await expect(client.query(options)).rejects.toThrow('No site with that id.')
  expect(requests).toHaveLength(1)
  requests = []
  client.clear()
  failWith(500, { error: 'server_error', message: 'The server had a problem.' })
  await expect(client.query(options)).rejects.toThrow('The server had a problem.')
  expect(requests).toHaveLength(3)
})
