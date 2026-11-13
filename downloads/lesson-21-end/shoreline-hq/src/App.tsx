import { createBrowserRouter, Link, useLocation, useNavigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { AppLayout } from './components/AppLayout.tsx'
import { Button } from './components/Button.tsx'
import { EventPage } from './pages/EventPage.tsx'
import { EventsPage } from './pages/EventsPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NewEventPage } from './pages/NewEventPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { SignInPage } from './pages/SignInPage.tsx'
import { SitesPage } from './pages/SitesPage.tsx'

// Shown instead of a page that crashed while rendering; the header and footer keep working
function PageCrashed() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div role="alert">
      <h1>Something went wrong on this page</h1>
      <p>It is not something you did. Try again, or start over from the home page.</p>
      <p>
        <Button onClick={() => navigate(location, { replace: true })}>Try again</Button>{' '}
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

// Every address the HQ knows, and the page it shows there
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        // A route without a path: it adds the error page and keeps the layout around it
        errorElement: <PageCrashed />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'events', element: <EventsPage /> },
          { path: 'events/new', element: <NewEventPage /> },
          { path: 'events/:eventId', element: <EventPage /> },
          { path: 'sites', element: <SitesPage /> },
          { path: 'sign-in', element: <SignInPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
