// Tests (do not edit): npm test runs them, npm run typecheck type-checks them with your Hooks.
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse, type JsonBodyType } from 'msw'
import { setupServer } from 'msw/node'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { fetchCount } from './api.ts'
import { useBagCount } from './useBagCount.ts'
import { useLoadedCount } from './useLoadedCount.ts'
import { useRotatingTip } from './useRotatingTip.ts'

// real answers of shoreline-api, saved in the lab's fixtures/ folder (npm test runs in starter/)
const fixture = (name: string): JsonBodyType => JSON.parse(readFileSync(join(process.cwd(), '..', 'fixtures', name), 'utf8'))
const API = 'http://api.test'
const requests: string[] = []
// After 20 requests in one test the "server" answers 500: enough to see a flood, and it ends the loop
const tooMany = () => HttpResponse.json({ error: 'server_error', message: 'Too many requests' }, { status: 500 })
const server = setupServer(
  http.get(`${API}/api/sites`, ({ request }) => {
    requests.push(new URL(request.url).pathname)
    return requests.length > 20 ? tooMany() : HttpResponse.json(fixture('sites.json'))
  }),
  http.get(`${API}/api/events`, ({ request }) => {
    requests.push(new URL(request.url).pathname)
    return requests.length > 20 ? tooMany() : HttpResponse.json(fixture('events-long-strand.json'))
  }),
)
afterEach(() => { requests.length = 0 })
afterEach(() => { vi.useRealTimers() })      // even when a timer test fails half-way

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

function BagButtons({ name }: { name: string }) {
  const [bags, addBag, reset] = useBagCount(0)
  return (
    <p>
      {name}: {bags}{' '}
      <button type="button" onClick={addBag}>Add a bag for {name}</button>
      <button type="button" onClick={reset}>Reset {name}</button>
    </p>
  )
}

test('Task 1: count, add, reset', () => {
  const { result } = renderHook(() => useBagCount(2))
  act(() => result.current[1]())
  act(() => result.current[1]())
  expect(result.current[0]).toBe(4)
  act(() => result.current[2]())
  expect(result.current[0], 'TODO 1: reset goes back to the start').toBe(2)
})

test('Task 1: two volunteers, two counts (Hooks share logic, never state)', async () => {
  const user = userEvent.setup()
  render(<><BagButtons name="Maya" /><BagButtons name="Luis" /></>)
  await user.click(screen.getByRole('button', { name: 'Add a bag for Maya' }))
  await user.click(screen.getByRole('button', { name: 'Add a bag for Maya' }))
  await user.click(screen.getByRole('button', { name: 'Add a bag for Luis' }))
  expect(screen.getByText(/^Maya: 2/)).toBeInTheDocument()
  expect(screen.getByText(/^Luis: 1/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Reset Maya' }))
  expect(screen.getByText(/^Maya: 0/)).toBeInTheDocument()
})

test('Task 2: one tip at a time, the next one every interval, then from the start', () => {
  vi.useFakeTimers()
  const tips = ['Bring gloves', 'Wear sunscreen', 'Count every bag']
  const { result, unmount } = renderHook(() => useRotatingTip(tips, 1000))
  expect(result.current).toBe('Bring gloves')
  act(() => { vi.advanceTimersByTime(1000) })
  expect(result.current).toBe('Wear sunscreen')
  act(() => { vi.advanceTimersByTime(2000) })
  expect(result.current).toBe('Bring gloves')
  unmount()
  expect(vi.getTimerCount()).toBe(0)          // the cleanup stopped the timer
})

test('Task 2: an empty list gives undefined and starts no timer', () => {
  vi.useFakeTimers()
  const { result } = renderHook(() => useRotatingTip<string>([], 1000))
  expect(result.current).toBeUndefined()
  expect(vi.getTimerCount()).toBe(0)
})

function Counter({ path }: { path: string }) {
  // an inline arrow: a NEW function on every render, like a real page writes it
  const sites = useLoadedCount(path, (signal) => fetchCount(`${API}/api${path}`, signal))
  return (
    <p>
      Items: {sites.count ?? '…'}{' '}
      <button type="button" onClick={sites.reload}>Load again</button>
    </p>
  )
}

test('Task 3: one request per key, however often the page renders', async () => {
  const { rerender } = render(<Counter path="/sites" />)
  expect(await screen.findByText(/^Items: 6/)).toBeInTheDocument()
  await new Promise((resolve) => setTimeout(resolve, 200))    // time for a flood, if there is one
  rerender(<Counter path="/sites" />)                          // a new render, the same key
  await new Promise((resolve) => setTimeout(resolve, 100))
  expect(requests.length, 'TODO 3: requests sent for one key').toBe(1)
})

test('Task 3: a new key loads again, and so does reload', async () => {
  const user = userEvent.setup()
  const { rerender } = render(<Counter path="/sites" />)
  expect(await screen.findByText(/^Items: 6/)).toBeInTheDocument()
  rerender(<Counter path="/events?siteId=long-strand" />)
  expect(await screen.findByText(/^Items: 2/)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Load again' }))
  await new Promise((resolve) => setTimeout(resolve, 100))
  expect(requests, 'TODO 3: one request per key, one per reload').toEqual(['/api/sites', '/api/events', '/api/events'])
})

// Tasks 1 and 2 are done when npm run typecheck accepts these lines too
export function TypeChecks() {
  const [bags, addBag] = useBagCount(0)
  const total: number = bags + 1           // the first item is the number...
  addBag()                                 // ...and the second one is a function
  const tip: string | undefined = useRotatingTip(['Bring gloves'], 1000)
  // @ts-expect-error: a list of numbers gives a number, not a string
  const wrong: string | undefined = useRotatingTip([1, 2, 3], 1000)
  return <p>{total} {tip} {wrong}</p>
}
