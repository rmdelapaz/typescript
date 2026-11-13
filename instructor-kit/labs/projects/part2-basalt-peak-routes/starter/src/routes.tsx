// Every address Basalt Peak Routes knows, and the page it shows there (Lessons 6.1 to 6.3).
// App.tsx hands this list to the browser's router; the tests hand it to a memory router.
import type { RouteObject } from 'react-router'
import { signInAction } from './auth/signInAction.ts'
import { Layout } from './components/Layout.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { homeLoader } from './pages/loaders.ts'
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
          { path: 'sign-in', element: <SignInPage />, action: signInAction },
          // TODO R1: three more routes, each with its page and loader (src/pages/):
          //   routes            RoutesPage, routesLoader      the list (its filters: R3)
          //   routes/:routeId   RoutePage, routeLoader        one route (R2)
          //   setter            SetterPage, setterLoader      setters only (the guard: R4; the form: R5)
          // and make the last route show NotFoundPage for every address the app does not know.
          {
            path: '*',
            element: <p className="todo">TODO R1: no route for this address yet (src/routes.tsx).</p>,
          },
        ],
      },
    ],
  },
]
