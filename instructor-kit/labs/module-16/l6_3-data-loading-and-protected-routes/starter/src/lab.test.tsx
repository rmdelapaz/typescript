// Tests (do not edit): npm test (and npm run typecheck, which also checks the type test in Task 1)
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterAll, afterEach, beforeAll, beforeEach, expect, expectTypeOf, test } from 'vitest'
import { API } from './api.ts'
import { crew, crewForbidden, crewNoToken, maya, signInIncomplete, signInRefused, siteNotFound, sites, theo } from './fixtures.ts'
import { nextPath } from './guards.ts'
import type { siteLoader } from './loaders.ts'
import { routes } from './routes.tsx'
import { saveSession } from './session.ts'
import type { Site } from './types.ts'

// What the "API" was asked for in each test
const asked: string[] = []

// MSW answers like shoreline-api (its real answers, saved in fixtures.ts): no server needed
const server = setupServer(
  http.get(`${API}/sites/:siteId`, ({ params }) => {
    asked.push(`GET /sites/${String(params.siteId)}`)
    const site = sites.find((candidate) => candidate.id === params.siteId)
    return site === undefined ? HttpResponse.json(siteNotFound, { status: 404 }) : HttpResponse.json(site)
  }),
  http.get(`${API}/volunteers`, ({ request }) => {
    asked.push('GET /volunteers')
    const auth = request.headers.get('Authorization')
    if (auth === `Bearer ${maya.token}`) return HttpResponse.json(crew)
    if (auth === `Bearer ${theo.token}`) return HttpResponse.json(crewForbidden, { status: 403 })
    return HttpResponse.json(crewNoToken, { status: 401 })
  }),
  http.post(`${API}/auth/sign-in`, async ({ request }) => {
    asked.push('POST /auth/sign-in')
    const body: unknown = await request.json()
    const fields = typeof body === 'object' && body !== null ? body : {}
    const email = 'email' in fields ? fields.email : ''
    const password = 'password' in fields ? fields.password : ''
    if (email === '' || password === '') return HttpResponse.json(signInIncomplete, { status: 400 })
    if (email === maya.user.email && password === 'shoreline-demo') return HttpResponse.json(maya)
    return HttpResponse.json(signInRefused, { status: 401 })
  }),
)
// MSW 3 calls the option onUnhandledFrame. A request no handler answers fails the test it came from.
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
  // The session store lives in a module: it survives from one test to the next unless it is reset
  saveSession(null)
  asked.length = 0
})
afterEach(() => {
  const missed = unhandled.splice(0)
  if (missed.length) throw new Error(`No MSW handler for: ${missed.join(', ')}`)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// The lab's own routes in a memory router: router.state.location is what the address bar would show
function open(address: string) {
  const router = createMemoryRouter(routes, { initialEntries: [address] })
  render(<RouterProvider router={router} />)
  return router
}

function address(router: ReturnType<typeof open>) {
  return router.state.location.pathname + router.state.location.search
}

test('Task 1: the site page appears with the data its loader fetched', async () => {
  // A type test: npm run typecheck fails here until siteLoader returns a Site
  expectTypeOf<Awaited<ReturnType<typeof siteLoader>>>().toEqualTypeOf<Site>()
  open('/sites/north-jetty')
  expect(await screen.findByRole('heading', { level: 1, name: 'North Jetty' })).toBeInTheDocument()
  expect(screen.getByText('Calder Bay · rocky')).toBeInTheDocument()
  expect(asked).toEqual(['GET /sites/north-jetty'])
})

test("Task 1: an unknown id is the route answer 'Site not found', not an alarm", async () => {
  open('/sites/blue-lagoon')
  expect(await screen.findByRole('heading', { level: 1, name: 'Site not found' })).toBeInTheDocument()
  expect(screen.getByText('No beach site has this id. Check the link.')).toBeInTheDocument()
  expect(screen.queryByRole('alert'), 'a route answer is not an alert').toBeNull()
})

test('Task 1: a request that fails shows the alert with the reason', async () => {
  server.use(http.get(`${API}/sites/:siteId`, () =>
    HttpResponse.json({ error: 'server_error', message: 'The server had a problem. Try again.' }, { status: 500 })))
  open('/sites/otter-creek')
  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent('Something went wrong on this page')
  expect(alert).toHaveTextContent('The server had a problem. Try again.')
})

test('Task 2: nextPath keeps paths inside the app and nothing else', () => {
  const next = (value: string) => nextPath(new URL(`http://localhost/sign-in?next=${encodeURIComponent(value)}`))
  expect(next('/crew?skill=first-aid')).toBe('/crew?skill=first-aid')
  expect(next('https://elsewhere.example'), 'a full address is another site').toBe('/')
  expect(next('//elsewhere.example'), 'browsers read // as another site').toBe('/')
  expect(next('/\\elsewhere.example'), 'and /\\ too').toBe('/')
  expect(nextPath(new URL('http://localhost/sign-in'))).toBe('/')
})

test('Task 2: a guest is sent to sign in, the way back in ?next=, and the crew is never requested', async () => {
  const router = open('/crew?skill=first-aid')
  expect(await screen.findByRole('heading', { level: 1, name: 'Sign in' })).toBeInTheDocument()
  expect(address(router)).toBe('/sign-in?next=%2Fcrew%3Fskill%3Dfirst-aid')
  expect(asked, 'a guest\'s visit sent the crew request: call crewOnly(args) first in crewLoader').toEqual([])
})

test('Task 2: a volunteer gets the 403 answer, and the crew is never requested', async () => {
  saveSession(theo)
  open('/crew')
  expect(await screen.findByRole('heading', { level: 1, name: 'Organizers only' })).toBeInTheDocument()
  expect(screen.getByText(/only organizers can open it/)).toBeInTheDocument()
  expect(asked).toEqual([])
})

test('Task 3: a wrong password keeps the address, the email and the way back', async () => {
  const user = userEvent.setup()
  const router = open('/sign-in?next=%2Fcrew')
  await user.type(await screen.findByLabelText('Email'), maya.user.email)
  await user.type(screen.getByLabelText('Password'), 'wrong-password')
  await user.click(screen.getByRole('button', { name: 'Sign in' }))
  expect(await screen.findByText('Email or password is incorrect.')).toBeInTheDocument()
  expect(address(router)).toBe('/sign-in?next=%2Fcrew')
  expect(screen.getByLabelText('Email')).toHaveValue(maya.user.email)
  expect(screen.getByLabelText('Password')).toHaveValue('')
})

test('Task 3: signing in goes back to the page the guard remembered', async () => {
  const user = userEvent.setup()
  const router = open('/crew?skill=first-aid')
  await user.type(await screen.findByLabelText('Email'), maya.user.email)
  await user.type(screen.getByLabelText('Password'), 'shoreline-demo')
  await user.click(screen.getByRole('button', { name: 'Sign in' }))
  expect(await screen.findByRole('heading', { level: 1, name: 'Crew' })).toBeInTheDocument()
  await waitFor(() => expect(address(router)).toBe('/crew?skill=first-aid'))
  expect(screen.getByText('Found 4 people.')).toBeInTheDocument()
  expect(screen.getByText('Signed in as Maya Okafor')).toBeInTheDocument()
  expect(asked).toEqual(['POST /auth/sign-in', 'GET /volunteers'])
})
