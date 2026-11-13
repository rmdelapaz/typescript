// Every address Basalt Peak Routes knows, and the page it shows there (Lessons 6.1 to 6.3).
// App.tsx hands this list to the browser's router; the tests hand it to a memory router.
import type { RouteObject } from 'react-router'
import { signInAction } from './auth/signInAction.ts'
import { Layout } from './components/Layout.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { homeLoader, routeLoader, routesLoader, setterLoader } from './pages/loaders.ts'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { RoutePage } from './pages/RoutePage.tsx'
import { RoutesPage } from './pages/RoutesPage.tsx'
import { SetterPage } from './pages/SetterPage.tsx'
import { SignInPage } from './pages/SignInPage.tsx'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    // Shown while the first page's loaders run (only when the app starts)
    hydrateFallbackElement: <p>Loading…</p>,
    children: [
      {
        // A route without a path: it adds the error page and keeps the layout around it
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage />, loader: homeLoader },
          { path: 'routes', element: <RoutesPage />, loader: routesLoader },
          { path: 'routes/:routeId', element: <RoutePage />, loader: routeLoader },
          { path: 'sign-in', element: <SignInPage />, action: signInAction },
          // Setters only: setterLoader runs the guard before the page appears
          { path: 'setter', element: <SetterPage />, loader: setterLoader },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
