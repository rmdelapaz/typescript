import type { RouteObject } from 'react-router'
import { ErrorPage } from './ErrorPage.tsx'
import { crewOnly } from './guards.ts'
import { Layout } from './Layout.tsx'
import { crewLoader, siteLoader } from './loaders.ts'
import { CrewPage, HomePage, NotFoundPage } from './pages.tsx'
import { SignInPage } from './SignInPage.tsx'
import { signInAction } from './signInAction.ts'
import { SitePage } from './SitePage.tsx'

// Every address the site desk knows
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    // Shown once, while the loaders of the very first page run (there is no page yet to keep on screen)
    hydrateFallbackElement: <p>Loading…</p>,
    children: [
      {
        // No path: one error page for every route, inside the layout
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'sites/:siteId', element: <SitePage />, loader: siteLoader },
          {
            // Organizers only: this guard runs before any page below it appears
            loader: crewOnly,
            children: [{ path: 'crew', element: <CrewPage />, loader: crewLoader }],
          },
          { path: 'sign-in', element: <SignInPage />, action: signInAction },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
