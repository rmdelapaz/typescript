import type { RouteObject } from 'react-router'
import { ErrorPage } from './ErrorPage.tsx'
import { Layout } from './Layout.tsx'
import { crewLoader } from './loaders.ts'
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
          // TODO 1: give this route its loader, siteLoader
          { path: 'sites/:siteId', element: <SitePage /> },
          // TODO 2: move the crew page into the children of a route WITHOUT a path whose loader is crewOnly
          { path: 'crew', element: <CrewPage />, loader: crewLoader },
          { path: 'sign-in', element: <SignInPage />, action: signInAction },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
