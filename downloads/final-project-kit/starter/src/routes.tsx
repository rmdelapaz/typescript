// Every address the app knows, and the page it shows there (Lessons 6.1 and 10.1). App.tsx gives these
// routes to the browser's router; the tests give the same ones to a router in memory.
import type { RouteObject } from 'react-router'
import { AppLayout } from './components/AppLayout.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { ItemPage } from './pages/ItemPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        // A route without a path: it adds the error page and keeps the layout around it
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'items/new',
            // A page with a form: lazy, so Zod and React Hook Form load only when someone opens it
            lazy: async () => {
              const { NewItemPage } = await import('./pages/NewItemPage.tsx')
              return { Component: NewItemPage }
            },
          },
          { path: 'items/:itemId', element: <ItemPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
