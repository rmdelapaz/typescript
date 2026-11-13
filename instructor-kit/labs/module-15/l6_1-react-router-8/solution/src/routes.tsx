import type { RouteObject } from 'react-router'
import { Layout } from './Layout.tsx'
import { HomePage, NotFoundPage, PageProblem, ReportsPage } from './pages.tsx'
import { SitePage, SitesPage } from './SitePages.tsx'

// Every address the site guide knows (Task 1)
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // No path: it only adds the error page, INSIDE the layout, so the header stays when a page crashes
        errorElement: <PageProblem />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'sites', element: <SitesPage /> },
          { path: 'sites/:siteId', element: <SitePage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
