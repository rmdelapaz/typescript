// Render the whole app at an address, the way a visitor sees it: the cache, the layout and the real routes
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { queryClient } from '../api/queries.ts'
import { routes } from '../routes.tsx'

export function renderApp(route = '/') {
  // A router that keeps its history in memory: no browser address bar needed
  const router = createMemoryRouter(routes, { initialEntries: [route] })
  // A pretend person who types and clicks: set up before rendering
  const user = userEvent.setup()
  const result = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
  return { ...result, router, user }
}
