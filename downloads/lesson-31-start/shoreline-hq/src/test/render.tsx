// Render a component the way the app shows it: inside the cache, the sign-in state and a router
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { createMemoryRouter, type DataRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { saveSession, type Session } from '../api/client.ts'
import { queryClient } from '../api/queries.ts'
import { AuthProvider } from '../auth/AuthProvider.tsx'
import { routes } from '../routes.tsx'

export interface RenderOptions {
  /** The address the test starts at (default '/') */
  route?: string
  /** The route pattern the component is shown at, for useParams (default: the same as route) */
  path?: string
  /** Who is signed in (default: nobody) */
  session?: Session | null
}

// The providers App.tsx puts around the router, around a router made for the test
function renderRouter(router: DataRouter, session: Session | null) {
  saveSession(session)
  // A pretend person who types and clicks: set up before rendering
  const user = userEvent.setup()
  const result = render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>,
  )
  return { ...result, router, user }
}

/** One component, shown at one route */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', path = route, session = null }: RenderOptions = {},
) {
  // A router that keeps its history in memory: no browser address bar needed
  const router = createMemoryRouter([{ path, element: ui }], { initialEntries: [route] })
  return renderRouter(router, session)
}

/** The whole app at an address: the layout, the real routes, their loaders and guards */
export function renderApp(route: string, session: Session | null = null) {
  const router = createMemoryRouter(routes, { initialEntries: [route] })
  return renderRouter(router, session)
}
