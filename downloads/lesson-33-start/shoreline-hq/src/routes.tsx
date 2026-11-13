// Every address the HQ knows, and the page it shows there. App.tsx gives these routes to the
// browser's router; the tests give the same ones to a router in memory (Lesson 9.2).
// Pages with `lazy` are separate files in the build: downloaded the first time someone opens them.
import type { RouteObject } from 'react-router'
import { guestsOnly, onlyWhenThePathChanges, organizersOnly } from './auth/guards.ts'
import { signInAction } from './auth/signInAction.ts'
import { AppLayout } from './components/AppLayout.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { EventPage } from './pages/EventPage.tsx'
import { EventsPage } from './pages/EventsPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import {
  editEventLoader,
  eventLoader,
  impactLoader,
  impactReportLoader,
  sitesLoader,
} from './pages/loaders.ts'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { SignInPage } from './pages/SignInPage.tsx'
import { SitesPage } from './pages/SitesPage.tsx'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    // Shown on the very first load while the first page's loaders fetch its data
    hydrateFallbackElement: <p role="status">Loading Shoreline Crew HQ…</p>,
    children: [
      {
        // A route without a path: it adds the error page and keeps the layout around it
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'events', element: <EventsPage /> },
          { path: 'events/:eventId', element: <EventPage />, loader: eventLoader },
          { path: 'sites', element: <SitesPage />, loader: sitesLoader },
          {
            path: 'impact',
            loader: impactLoader,
            // The chart and the CSV export: most visitors never open this page
            lazy: async () => {
              const { ImpactPage } = await import('./pages/ImpactPage.tsx')
              return { Component: ImpactPage }
            },
          },
          { path: 'sign-in', element: <SignInPage />, loader: guestsOnly, action: signInAction },
          {
            // Organizers only: this guard runs before any of these pages appears.
            // Their code (and Zod and React Hook Form with it) stays out of the main bundle.
            loader: organizersOnly,
            shouldRevalidate: onlyWhenThePathChanges,
            children: [
              {
                path: 'events/new',
                lazy: async () => {
                  const { NewEventPage } = await import('./pages/NewEventPage.tsx')
                  return { Component: NewEventPage }
                },
              },
              // A child loader runs in parallel with the guard's: editEventLoader checks again first
              {
                path: 'events/:eventId/edit',
                loader: editEventLoader,
                lazy: async () => {
                  const { EditEventPage } = await import('./pages/EditEventPage.tsx')
                  return { Component: EditEventPage }
                },
              },
              {
                path: 'events/:eventId/impact',
                loader: impactReportLoader,
                lazy: async () => {
                  const { ImpactReportPage } = await import('./pages/ImpactReportPage.tsx')
                  return { Component: ImpactReportPage }
                },
              },
              {
                path: 'volunteers',
                lazy: async () => {
                  const { VolunteersPage } = await import('./pages/VolunteersPage.tsx')
                  return { Component: VolunteersPage }
                },
                // Nested routes: they render inside VolunteersPage, at its <Outlet />
                children: [
                  { index: true, element: <p>Pick a name from the list to see their details.</p> },
                  {
                    path: ':volunteerId',
                    lazy: async () => {
                      const { VolunteerPage } = await import('./pages/VolunteerPage.tsx')
                      return { Component: VolunteerPage }
                    },
                  },
                ],
              },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
