// Tests (do not edit): npm test
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { expect, test } from 'vitest'
import type { EventStatus } from './cleanups.ts'
import { statuses } from './cleanups.ts'
import { readChoice, withParams } from './params.ts'
import { routes } from './routes.tsx'

// The lab's own routes in a memory router: one address per test
function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

test('Task 1: readChoice keeps an allowed value and refuses anything else', () => {
  // The TYPE is tested too: npm run typecheck fails until readChoice returns EventStatus | undefined here
  const status: EventStatus | undefined = readChoice(new URLSearchParams('status=completed'), 'status', statuses)
  expect(status).toBe('completed')
  expect(readChoice(new URLSearchParams('status=banana'), 'status', statuses)).toBeUndefined()
  expect(readChoice(new URLSearchParams('page=2'), 'status', statuses)).toBeUndefined()
})

test('Task 1: withParams changes a copy, keeps the rest and removes empty values', () => {
  const params = new URLSearchParams('status=completed&site=north-jetty')
  expect(withParams(params, { site: 'otter-creek' }).toString()).toBe('status=completed&site=otter-creek')
  expect(withParams(params, { status: '' }).toString()).toBe('site=north-jetty')
  expect(params.toString()).toBe('status=completed&site=north-jetty')
})

test('Task 2: the filters come from the address', async () => {
  renderAt('/log?status=completed&site=pelican-point')
  expect(await screen.findByText('Showing 2 cleanups.')).toBeInTheDocument()
  expect(screen.getByLabelText('Status')).toHaveValue('completed')
  expect(screen.getByLabelText('Site')).toHaveValue('pelican-point')
})

test('Task 2: a value that is not allowed is ignored, an allowed one is kept', async () => {
  renderAt('/log?status=banana&site=north-jetty')
  expect(await screen.findByText('Showing 2 cleanups.')).toBeInTheDocument()
  expect(screen.getByLabelText('Status')).toHaveValue('')
  expect(screen.getByLabelText('Site')).toHaveValue('north-jetty')
})

test('Task 2: choosing a site keeps the status, and Back undoes it', async () => {
  const user = userEvent.setup()
  const router = renderAt('/log?status=scheduled')
  await user.selectOptions(await screen.findByLabelText('Site'), 'north-jetty')
  await waitFor(() => expect(router.state.location.search).toBe('?status=scheduled&site=north-jetty'))
  expect(screen.getByText('Showing 1 cleanup.')).toBeInTheDocument()
  await act(() => router.navigate(-1))
  expect(router.state.location.search).toBe('?status=scheduled')
  expect(screen.getByText('Showing 8 cleanups.')).toBeInTheDocument()
})

test('Task 3: /log shows the hint where the details go', async () => {
  renderAt('/log')
  expect(await screen.findByText('Pick a cleanup to see its details.')).toBeInTheDocument()
})

test('Task 3: a title opens the cleanup beside the list and keeps the filters', async () => {
  const user = userEvent.setup()
  const router = renderAt('/log?status=completed')
  await user.click(await screen.findByRole('link', { name: 'Sunset Stairs Cleanup' }))
  expect(await screen.findByRole('heading', { level: 2, name: 'Sunset Stairs Cleanup' })).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/log/e07')
  expect(router.state.location.search).toBe('?status=completed')
  expect(screen.getByText('Showing 6 cleanups.')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Sunset Stairs Cleanup' })).toHaveAttribute('aria-current', 'page')
})

test('Task 3: an id that is not in the log says so', async () => {
  renderAt('/log/e99')
  expect(await screen.findByRole('heading', { level: 2, name: 'No cleanup called e99' })).toBeInTheDocument()
})
