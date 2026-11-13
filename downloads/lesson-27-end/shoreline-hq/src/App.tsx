import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { queryClient } from './api/queries.ts'
import { guestsOnly, onlyWhenThePathChanges, organizersOnly } from './auth/guards.ts'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { signInAction } from './auth/signInAction.ts'
import { AppLayout } from './components/AppLayout.tsx'
import { EditEventPage } from './pages/EditEventPage.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { EventPage } from './pages/EventPage.tsx'
import { EventsPage } from './pages/EventsPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { ImpactPage } from './pages/ImpactPage.tsx'
import { editEventLoader, eventLoader, impactLoader, sitesLoader } from './pages/loaders.ts'
import { NewEventPage } from './pages/NewEventPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { SignInPage } from './pages/SignInPage.tsx'
import { SitesPage } from './pages/SitesPage.tsx'
import { VolunteerPage } from './pages/VolunteerPage.tsx'
import { VolunteersPage } from './pages/VolunteersPage.tsx'

// Every address the HQ knows, and the page it shows there
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        // A route without a path: it adds the error page and keeps the layout around it
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'events', element: <EventsPage /> },
          { path: 'events/:eventId', element: <EventPage />, loader: eventLoader },
          { path: 'sites', element: <SitesPage />, loader: sitesLoader },
          { path: 'impact', element: <ImpactPage />, loader: impactLoader },
          { path: 'sign-in', element: <SignInPage />, loader: guestsOnly, action: signInAction },
          {
            // Organizers only: this guard runs before any of these pages appears
            loader: organizersOnly,
            shouldRevalidate: onlyWhenThePathChanges,
            children: [
              { path: 'events/new', element: <NewEventPage /> },
              // A child loader runs in parallel with the guard's: editEventLoader checks again first
              { path: 'events/:eventId/edit', element: <EditEventPage />, loader: editEventLoader },
              {
                path: 'volunteers',
                element: <VolunteersPage />,
                // Nested routes: they render inside VolunteersPage, at its <Outlet />
                children: [
                  { index: true, element: <p>Pick a name from the list to see their details.</p> },
                  { path: ':volunteerId', element: <VolunteerPage /> },
                ],
              },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])

export function App() {
  return (
    // The cache is outside everything else: every page and loader shares it
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
