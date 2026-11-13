// Tests (do not edit): npm test
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { expect, test, vi } from 'vitest'
import { routes } from './routes.tsx'

// The lab's own routes in a memory router: one address per test, no browser history needed
function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

const mainNav = () => screen.getByRole('navigation', { name: 'Main' })

test('Task 1: /sites shows the list of sites inside the layout', async () => {
  renderAt('/sites')
  expect(await screen.findByRole('heading', { level: 1, name: 'Beach sites' })).toBeInTheDocument()
  expect(mainNav()).toBeInTheDocument()
})

test('Task 1: an unknown address shows Page not found, and the header stays', async () => {
  renderAt('/sites/driftwood-cove/photos')
  expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  expect(mainNav()).toBeInTheDocument()
})

test('Task 1: a page that crashes shows the error page, and the header stays', async () => {
  const quiet = vi.spyOn(console, 'error').mockImplementation(() => {})   // React logs the crash: expected here
  renderAt('/reports')
  expect(await screen.findByRole('heading', { level: 1, name: 'Something went wrong on this page' })).toBeInTheDocument()
  expect(mainNav()).toBeInTheDocument()
  quiet.mockRestore()
})

test('Task 2: a site name is a router link to that site', async () => {
  const user = userEvent.setup()
  const router = renderAt('/sites')
  await user.click(await screen.findByRole('link', { name: 'Driftwood Cove' }))
  expect(await screen.findByRole('heading', { level: 1, name: 'Driftwood Cove' })).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/sites/driftwood-cove')
})

test('Task 2: the site page reads :siteId from the address', async () => {
  renderAt('/sites/north-jetty')
  expect(await screen.findByRole('heading', { level: 1, name: 'North Jetty' })).toBeInTheDocument()
  expect(screen.getByText('Calder Bay · rocky')).toBeInTheDocument()
  expect(within(mainNav()).getByRole('link', { name: 'Sites' })).toHaveAttribute('aria-current', 'page')
  expect(within(mainNav()).getByRole('link', { name: 'Reports' })).not.toHaveAttribute('aria-current')
})

test('Task 2: an id that is not a site says so', async () => {
  renderAt('/sites/seal-rock')
  expect(await screen.findByRole('heading', { level: 1, name: 'No site called seal-rock' })).toBeInTheDocument()
})

test('Task 3: after a link changes the page, the focus is on main', async () => {
  const user = userEvent.setup()
  renderAt('/')
  await user.click(within(mainNav()).getByRole('link', { name: 'Sites' }))
  await screen.findByRole('heading', { level: 1, name: 'Beach sites' })
  await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('main')))
})

test('Task 3: the first page does not take the focus', async () => {
  renderAt('/')
  await screen.findByRole('heading', { level: 1, name: 'Site guide' })
  expect(document.activeElement).toBe(document.body)
})
