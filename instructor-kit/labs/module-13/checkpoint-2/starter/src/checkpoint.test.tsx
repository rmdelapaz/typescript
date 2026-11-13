// Tests (do not edit): npm test runs them, npm run typecheck checks them with your code
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { driftwoodCove, pelicanPoint, siteNotFound } from './fixtures.ts'
import { SiteName } from './SiteName.tsx'
import { initialTally, tallyReducer, type TallyAction, type TallyState } from './tally.ts'
import { BagButtons, TallyLine } from './TallyPanel.tsx'
import { TallyProvider } from './TallyProvider.tsx'

const API = 'http://api.test'

// MSW answers like shoreline-api (the answers were saved from it): no server needed
const server = setupServer(
  http.get(`${API}/api/sites/:siteId`, ({ params }) => {
    const site = [pelicanPoint, driftwoodCove].find((known) => known.id === params.siteId)
    return site ? HttpResponse.json(site) : HttpResponse.json(siteNotFound, { status: 404 })
  }),
)
// A request no handler answers fails the test it came from (MSW 3: onUnhandledFrame)
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

test('Task 1: loading first, then the site', async () => {
  render(<SiteName apiUrl={API} siteId="pelican-point" />)
  expect(screen.getByRole('status')).toHaveTextContent('Loading the site…')
  expect(await screen.findByRole('heading', { name: 'Pelican Point Beach' })).toBeInTheDocument()
})

test('Task 1: an error status becomes a message', async () => {
  render(<SiteName apiUrl={API} siteId="seal-rock" />)
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the site (404).')
})

test('Task 1: a new id loads the new site', async () => {
  const { rerender } = render(<SiteName apiUrl={API} siteId="pelican-point" />)
  expect(await screen.findByRole('heading', { name: 'Pelican Point Beach' })).toBeInTheDocument()
  rerender(<SiteName apiUrl={API} siteId="driftwood-cove" />)
  expect(await screen.findByRole('heading', { name: 'Driftwood Cove' })).toBeInTheDocument()
})

function tallyAfter(actions: TallyAction[]): TallyState {
  return actions.reduce(tallyReducer, initialTally)
}

test('Task 2: add counts each kind of bag, in order', () => {
  expect(tallyAfter([
    { type: 'add', kind: 'trash' }, { type: 'add', kind: 'trash' }, { type: 'add', kind: 'recycling' },
  ])).toEqual({ trash: 2, recycling: 1, history: ['trash', 'trash', 'recycling'] })
})

test('Task 2: undo takes back the last bag, and changes nothing when there is none', () => {
  expect(tallyAfter([
    { type: 'add', kind: 'trash' }, { type: 'add', kind: 'recycling' }, { type: 'undo' },
  ])).toEqual({ trash: 1, recycling: 0, history: ['trash'] })
  expect(tallyReducer(initialTally, { type: 'undo' })).toBe(initialTally)
})

test('Task 2: reset starts over', () => {
  expect(tallyAfter([{ type: 'add', kind: 'recycling' }, { type: 'reset' }])).toEqual(initialTally)
})

// Task 2 is checked by the TYPE as well (npm run typecheck): these two actions must not compile
export function actionsThatDoNotExist(state: TallyState) {
  // @ts-expect-error 'weigh' is not one of the tally's actions
  tallyReducer(state, { type: 'weigh' })
  // @ts-expect-error an 'add' must say which kind of bag
  tallyReducer(state, { type: 'add' })
}

test('Task 3: the buttons and the line share one tally through the context', async () => {
  const user = userEvent.setup()
  render(
    <TallyProvider>
      <section>
        <BagButtons />
      </section>
      <footer>
        <TallyLine />
      </footer>
    </TallyProvider>,
  )
  await user.click(screen.getByRole('button', { name: 'Add trash' }))
  await user.click(screen.getByRole('button', { name: 'Add trash' }))
  await user.click(screen.getByRole('button', { name: 'Add recycling' }))
  await user.click(screen.getByRole('button', { name: 'Undo' }))
  expect(screen.getByRole('status')).toHaveTextContent('Trash: 2 · Recycling: 0')
})

test('Task 3: outside a provider, useTally() says what to fix', () => {
  const quiet = vi.spyOn(console, 'error').mockImplementation(() => {})   // React reports the error too
  expect(() => render(<TallyLine />)).toThrow('useTally() must be used inside <TallyProvider>')
  quiet.mockRestore()
})
