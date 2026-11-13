// Tests (do not edit): npm test. Each test name starts with the requirement it checks (BRIEF.md, RUBRIC.md).
// The requests go to the project's own API code (api/core.ts) through MSW: no server needs to run.
// Vitest RUNS the code without checking types: npx tsc -b is the other half of "done".
import { act, cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test } from 'vitest'
import { createHandlers } from '../api/msw.ts'
import { API_URL, ApiError, getRoute, getRoutes } from './api/client.ts'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { nextPath } from './auth/guards.ts'
import { saveSession } from './auth/session.ts'
import { routes } from './routes.tsx'
import { emptyDraft, routeDraftReducer } from './state/routeDraft.ts'
import { readFilters, withParam } from './utils/filters.ts'

const { handlers, api } = createHandlers(API_URL)
const server = setupServer(...handlers)

// MSW 3 calls the option onUnhandledFrame. A request no handler answers fails the test it came from.
const unhandled: string[] = []
beforeAll(() =>
  server.listen({
    onUnhandledFrame({ frame, defaults }) {
      const { data } = frame // unknown: narrow it before reading the request
      const request =
        typeof data === 'object' && data !== null && 'request' in data && data.request instanceof Request
          ? data.request
          : undefined
      unhandled.push(request ? `${request.method} ${request.url}` : frame.protocol)
      defaults.error()
    },
  }),
)
// Every test starts from the sample routes, with nobody signed in
beforeEach(() => {
  api.reset()
  saveSession(null)
})
afterEach(() => {
  server.resetHandlers()
  const missed = unhandled.splice(0)
  if (missed.length) throw new Error(`No MSW handler for: ${missed.join(', ')}`)
})
afterAll(() => server.close())

// The app's own routes in a memory router: one address per test, inside the app's AuthProvider
function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  )
  return router
}

// The given dev token: Dana, a setter, signed in without the form
function signInAsDana() {
  saveSession({ token: 'dev-setter', user: { id: 'u1', name: 'Dana Okonkwo-Reyes', role: 'setter' } })
}

async function signInWithTheForm(email: string) {
  const user = userEvent.setup()
  await user.type(await screen.findByLabelText('Email'), email)
  await user.type(screen.getByLabelText('Password'), 'basalt-demo')
  await user.click(screen.getByRole('button', { name: 'Sign in' }))
}

test('R1 an address the app does not know shows Page not found, inside the layout', async () => {
  renderAt('/hall-of-fame')
  expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  const nav = screen.getByRole('navigation', { name: 'Main' })
  expect(within(nav).getByRole('link', { name: 'Routes' })).toHaveAttribute('href', '/routes')
})

test('R1 the header link opens the routes list and marks it as the current page', async () => {
  const user = userEvent.setup()
  const router = renderAt('/sign-in')
  await user.click(await screen.findByRole('link', { name: 'Routes' }))
  expect(await screen.findByRole('heading', { level: 1, name: 'Routes on the walls' })).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/routes')
  expect(screen.getByRole('link', { name: 'Routes' })).toHaveAttribute('aria-current', 'page')
})

test('R2 the home page counts the active routes on each wall (a loader)', async () => {
  renderAt('/')
  const list = await screen.findByRole('list', { name: 'The walls' })
  expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
    'The Slab: 3 active routes',
    'The Cave: 3 active routes',
    'The Prow: 2 active routes',
    "Kids' Corner: 1 active route",
  ])
  expect(within(list).getByRole('link', { name: 'The Cave' })).toHaveAttribute('href', '/routes?wall=the-cave')
})

test('R2 a route has its own address and page', async () => {
  renderAt('/routes/r06')
  expect(await screen.findByRole('heading', { level: 1, name: 'Stalactite' })).toBeInTheDocument()
  expect(screen.getByText('V6')).toBeInTheDocument()
  expect(screen.getByText('The Cave')).toBeInTheDocument()
  expect(screen.getByText('Priya Lindqvist')).toBeInTheDocument()
  expect(screen.getByText('On the wall')).toBeInTheDocument()
})

test('R2 an id the API does not know is a 404: Route not found', async () => {
  renderAt('/routes/r99')
  expect(await screen.findByRole('heading', { level: 1, name: 'Route not found' })).toBeInTheDocument()
  expect(screen.getByText(/There is no route "r99"/)).toBeInTheDocument()
})

test('R2 the client checks every answer and turns error answers into ApiErrors', async () => {
  const cave = await getRoutes({ wall: 'the-cave' })
  expect(cave.map((route) => route.name)).toEqual(['Cave Troll', 'Bat Hang', 'Stalactite'])
  const missing = await getRoute('r99').catch((error: unknown) => error)
  expect(missing).toBeInstanceOf(ApiError)
  expect(missing).toMatchObject({ status: 404, code: 'not_found', message: 'No route with that id.' })
  // An answer of the wrong shape never reaches a component
  server.use(http.get(`${API_URL}/api/routes`, () => HttpResponse.json([{ id: 7, name: 'Not a route' }])))
  await expect(getRoutes()).rejects.toThrow('Unexpected data from GET /api/routes')
})

test('R3 the filters come from the address, and a value the app does not know is ignored', async () => {
  expect(readFilters(new URLSearchParams('wall=the-cave&grade=V4'))).toEqual({ wall: 'the-cave', grade: 'V4' })
  expect(readFilters(new URLSearchParams('wall=the-moon&grade=V5'))).toEqual({ wall: undefined, grade: 'V5' })
  renderAt('/routes?wall=the-cave&grade=V4')
  expect(await screen.findByText('Showing 1 active route.')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Bat Hang' })).toHaveAttribute('href', '/routes/r05')
  expect(screen.getByLabelText('Wall')).toHaveValue('the-cave')
  expect(screen.getByLabelText('Grade')).toHaveValue('V4')
  cleanup()
  renderAt('/routes?wall=the-moon&grade=V5')
  expect(await screen.findByText('Showing 2 active routes.')).toBeInTheDocument()
  expect(screen.getByLabelText('Wall')).toHaveValue('')
  expect(screen.getByLabelText('Grade')).toHaveValue('V5')
})

test('R3 choosing a filter changes the address, and Back undoes it', async () => {
  const params = new URLSearchParams('grade=V5')
  expect(withParam(params, 'wall', 'the-slab').toString()).toBe('grade=V5&wall=the-slab')
  expect(withParam(params, 'grade', '').toString()).toBe('')
  expect(params.toString()).toBe('grade=V5') // a copy: the old one is untouched
  const user = userEvent.setup()
  const router = renderAt('/routes?grade=V5')
  expect(await screen.findByText('Showing 2 active routes.')).toBeInTheDocument()
  await user.selectOptions(screen.getByLabelText('Wall'), 'the-slab')
  expect(await screen.findByText('Showing 1 active route.')).toBeInTheDocument()
  expect(router.state.location.search).toBe('?grade=V5&wall=the-slab')
  expect(screen.getByRole('link', { name: 'Glass Ceiling' })).toBeInTheDocument()
  await act(() => router.navigate(-1))
  expect(await screen.findByText('Showing 2 active routes.')).toBeInTheDocument()
  expect(router.state.location.search).toBe('?grade=V5')
  expect(screen.getByLabelText('Wall')).toHaveValue('')
})

test('R4 a guest who opens /setter signs in and comes back to it', async () => {
  // Only a path inside the app is a place to go back to
  expect(nextPath(new URL('http://localhost/sign-in?next=%2Fsetter'))).toBe('/setter')
  expect(nextPath(new URL('http://localhost/sign-in?next=%2F%2Felsewhere.example'))).toBe('/')
  expect(nextPath(new URL('http://localhost/sign-in'))).toBe('/')
  const router = renderAt('/setter')
  expect(await screen.findByRole('heading', { level: 1, name: 'Sign in' })).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/sign-in')
  expect(router.state.location.search).toBe('?next=%2Fsetter')
  await signInWithTheForm('dana@basaltpeak.example')
  expect(await screen.findByRole('heading', { level: 1, name: 'Log a new route' })).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/setter')
  // The header reads the session from the context
  expect(screen.getByText('Signed in as Dana Okonkwo-Reyes')).toBeInTheDocument()
})

test('R4 a staff account can sign in but is turned away from /setter', async () => {
  renderAt('/sign-in?next=%2Fsetter')
  await signInWithTheForm('sam@basaltpeak.example')
  expect(await screen.findByRole('heading', { level: 1, name: 'Only setters can log routes' })).toBeInTheDocument()
  expect(screen.getByText('Signed in as Sam Whitfield')).toBeInTheDocument()
  expect(screen.queryByLabelText('Hold color')).not.toBeInTheDocument()
})

test('R5 the reducer: a field, a refusal, a send and a reset', () => {
  const typed = routeDraftReducer(emptyDraft, { type: 'field', field: 'name', value: 'Crimp Scampi' })
  expect(typed.values).toEqual({ name: 'Crimp Scampi', wallId: '', grade: '', holdColor: '' })
  expect(emptyDraft.values.name).toBe('') // a new state, the old one untouched
  const sending = routeDraftReducer(typed, { type: 'submitted' })
  expect(sending.status).toBe('sending')
  const refused = routeDraftReducer(sending, {
    type: 'failed',
    message: 'Some fields need attention.',
    fieldErrors: { wallId: ['Pick a wall.'], grade: ['Pick a grade from V0 to V7.'] },
  })
  expect(refused).toMatchObject({ status: 'editing', message: 'Some fields need attention.' })
  expect(refused.fieldErrors).toEqual({ wallId: ['Pick a wall.'], grade: ['Pick a grade from V0 to V7.'] })
  // Changing a field takes its own message away and keeps the others
  const fixed = routeDraftReducer(refused, { type: 'field', field: 'wallId', value: 'the-prow' })
  expect(fixed.fieldErrors).toEqual({ grade: ['Pick a grade from V0 to V7.'] })
  expect(routeDraftReducer(fixed, { type: 'reset' })).toEqual(emptyDraft)
})

test('R5 a setter logs a route: the refusals show under their fields, then the new route opens', async () => {
  const user = userEvent.setup()
  signInAsDana()
  const router = renderAt('/setter')
  await user.type(await screen.findByLabelText('Name'), 'Hi')
  await user.selectOptions(screen.getByLabelText('Grade'), 'V3')
  await user.selectOptions(screen.getByLabelText('Hold color'), 'purple')
  await user.click(screen.getByRole('button', { name: 'Log route' }))
  expect(await screen.findByText('Name must be 3 to 40 characters.')).toBeInTheDocument()
  expect(screen.getByText('Pick a wall.')).toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent('Some fields need attention.')
  expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByLabelText('Name')).toHaveAccessibleDescription('Name must be 3 to 40 characters.')
  await user.clear(screen.getByLabelText('Name'))
  await user.type(screen.getByLabelText('Name'), 'Crimp Scampi')
  await user.selectOptions(screen.getByLabelText('Wall'), 'the-prow')
  await user.click(screen.getByRole('button', { name: 'Log route' }))
  expect(await screen.findByRole('heading', { level: 1, name: 'Crimp Scampi' })).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/routes/r13')
  expect(screen.getByText('Dana Okonkwo-Reyes', { selector: 'dd' })).toBeInTheDocument()
})
