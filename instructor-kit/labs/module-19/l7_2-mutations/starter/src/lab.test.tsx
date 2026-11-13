// Tests (do not edit): npm test
import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ReactNode } from 'react'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test } from 'vitest'
import { API_URL } from './api.ts'
import { EventSpots } from './EventSpots.tsx'
import { MySignups } from './MySignups.tsx'
import { queryClient } from './queries.ts'
import { SignUpButton } from './SignUpButton.tsx'
import type { CleanupSummary, MySignup, Signup } from './types.ts'

// Real answers saved from shoreline-api (../fixtures/). MSW plays the API: it keeps the cleanups and Theo's
// sign-ups in memory, so a POST or PATCH changes what the next GET returns, like the real server.
const read = (name: string) => JSON.parse(readFileSync(resolve(process.cwd(), '..', 'fixtures', name), 'utf8'))
const e09: CleanupSummary = read('event-e09.json')
const e14: CleanupSummary = read('event-e14-full.json')
const signupE09: Signup = read('signup-e09.json')
const signupE14: Signup = read('signup-e14.json')
const already: { error: string; message: string } = read('signup-again.json')
const cancelled: Signup = read('cancelled.json')
const serverError: { error: string; message: string } = read('server-error.json')
// Theo's sign-ups before this lab's sign-ups (the saved list is from after them)
const theosList: MySignup[] = read('my-signups.json')
const before = theosList.filter((s) => s.id !== signupE09.id && s.id !== signupE14.id)

let events: Record<string, CleanupSummary> = {}
let mine: MySignup[] = []
let patchGate: Promise<void> | undefined
let patchFails = false
let requests: string[] = []

const server = setupServer(
  http.get(`${API_URL}/api/events/:id`, ({ params }) => {
    requests.push(`GET /api/events/${String(params.id)}`)
    const event = events[String(params.id)]
    return event ? HttpResponse.json(event) : HttpResponse.json({ error: 'not_found', message: 'No cleanup event with that id.' }, { status: 404 })
  }),
  http.post(`${API_URL}/api/events/:id/signups`, ({ params }) => {
    const id = String(params.id)
    requests.push(`POST /api/events/${id}/signups`)
    if (mine.some((s) => s.eventId === id && s.status !== 'cancelled')) {
      return HttpResponse.json(already, { status: 409 })
    }
    const saved = id === 'e09' ? signupE09 : signupE14
    const event = events[id] ?? e09
    if (saved.status === 'confirmed') {
      events[id] = { ...event, spotsTaken: event.spotsTaken + 1 }
    }
    mine = [{ ...saved, event: events[id] ?? event }, ...mine]
    return HttpResponse.json(saved, { status: 201 })
  }),
  http.get(`${API_URL}/api/me/signups`, () => {
    requests.push('GET /api/me/signups')
    return HttpResponse.json(mine)
  }),
  http.patch(`${API_URL}/api/signups/:id`, async ({ params }) => {
    requests.push(`PATCH /api/signups/${String(params.id)}`)
    if (patchGate) await patchGate
    if (patchFails) return HttpResponse.json(serverError, { status: 500 })
    mine = mine.map((s) => (s.id === params.id ? { ...s, status: 'cancelled' } : s))
    return HttpResponse.json(cancelled)
  }),
)
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
  events = { e09, e14 }
  mine = before
  patchGate = undefined
  patchFails = false
  requests = []
})
afterEach(() => {
  const missed = unhandled.splice(0)
  if (missed.length) throw new Error(`No MSW handler for: ${missed.join(', ')}`)
})
afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
})
afterAll(() => server.close())

const withCache = (ui: ReactNode) => render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)

/** A promise the test resolves itself: the PATCH waits for it, so the test sees the screen before the answer */
function gate() {
  let open = () => {}
  patchGate = new Promise<void>((resolve) => {
    open = resolve
  })
  return open
}

const rowOf = (title: string) => {
  const row = screen.getByText(title).closest('li')
  if (!row) throw new Error(`no list item for ${title}`)
  return row
}

test('Task 1: sign up, then say which list Theo is on', async () => {
  const user = userEvent.setup()
  withCache(<SignUpButton eventId="e09" title="Boardwalk and Mudflats" />)
  await user.click(screen.getByRole('button', { name: 'Sign up for Boardwalk and Mudflats' }))
  expect(await screen.findByRole('status')).toHaveTextContent("You're signed up.")
  expect(requests).toEqual(['POST /api/events/e09/signups'])
})

test('Task 1: a full cleanup puts him on the waiting list', async () => {
  const user = userEvent.setup()
  withCache(<SignUpButton eventId="e14" title="Night Heron Walk and Clean" />)
  await user.click(screen.getByRole('button', { name: 'Sign up for Night Heron Walk and Clean' }))
  expect(await screen.findByRole('status')).toHaveTextContent("You're on the waiting list.")
})

test("Task 1: the API's 409 message, under the button", async () => {
  const user = userEvent.setup()
  withCache(<SignUpButton eventId="e13" title="Long Strand Coastal Cleanup Day" />)
  await user.click(screen.getByRole('button', { name: 'Sign up for Long Strand Coastal Cleanup Day' }))
  expect(await screen.findByRole('alert')).toHaveTextContent(already.message)
})

test("Task 2: the cleanup's spots update after a sign-up", async () => {
  const user = userEvent.setup()
  withCache(<><EventSpots eventId="e09" /><SignUpButton eventId="e09" title="Boardwalk and Mudflats" /></>)
  expect(await screen.findByText('Boardwalk and Mudflats: 7 of 16 spots taken')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Sign up for Boardwalk and Mudflats' }))
  expect(await screen.findByText('Boardwalk and Mudflats: 8 of 16 spots taken')).toBeInTheDocument()
})

test("Task 2: Theo's own list shows the new sign-up", async () => {
  const user = userEvent.setup()
  withCache(<><MySignups /><SignUpButton eventId="e09" title="Boardwalk and Mudflats" /></>)
  await screen.findByRole('heading', { name: 'My cleanups' })
  expect(screen.queryByText('Boardwalk and Mudflats', { selector: 'li span' })).toBeNull()
  await user.click(screen.getByRole('button', { name: 'Sign up for Boardwalk and Mudflats' }))
  expect(await screen.findByText('Boardwalk and Mudflats', { selector: 'li span' })).toBeInTheDocument()
})

test('Task 3: "Cancelled" shows before the API has answered', async () => {
  const user = userEvent.setup()
  const open = gate()
  withCache(<MySignups />)
  await user.click(await screen.findByRole('button', { name: 'Cancel my spot at Family Beach Morning' }))
  expect(await within(rowOf('Family Beach Morning')).findByText('Cancelled', {}, { timeout: 500 })).toBeInTheDocument()
  expect(requests).toContain('PATCH /api/signups/s129')
  open()
  await waitFor(() => expect(requests.at(-1)).toBe('GET /api/me/signups'))
  expect(within(rowOf('Family Beach Morning')).getByText('Cancelled')).toBeInTheDocument()
})

test('Task 3: a failed cancel puts the old status back, and says so', async () => {
  const user = userEvent.setup()
  patchFails = true
  const open = gate()
  withCache(<MySignups />)
  await user.click(await screen.findByRole('button', { name: 'Cancel my spot at Family Beach Morning' }))
  expect(await within(rowOf('Family Beach Morning')).findByText('Cancelled', {}, { timeout: 500 })).toBeInTheDocument()
  open()
  expect(await screen.findByRole('alert')).toHaveTextContent('Your spot at Family Beach Morning was not cancelled. Try again in a moment.')
  expect(within(rowOf('Family Beach Morning')).getByText('Confirmed')).toBeInTheDocument()
})
