// Render a component the way the app shows it: inside the cache, the sign-in state and a router
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { saveSession, type Session } from '../api/client.ts'
import { queryClient } from '../api/queries.ts'
import { AuthProvider } from '../auth/AuthProvider.tsx'

export interface RenderOptions {
  /** The address the test starts at (default '/') */
  route?: string
  /** The route pattern the component is shown at, for useParams (default: the same as route) */
  path?: string
  /** Who is signed in (default: nobody) */
  session?: Session | null
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', path = route, session = null }: RenderOptions = {},
) {
  saveSession(session)
  // A router that keeps its history in memory: no browser address bar needed
  const router = createMemoryRouter([{ path, element: ui }], { initialEntries: [route] })
  const result = render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>,
  )
  return { ...result, router }
}
