import type { RouteObject } from 'react-router'
import { Layout } from './Layout.tsx'
import { HomePage } from './pages.tsx'

// Every address the site guide knows (Task 1)
// TODO 1: keep the layout route; inside it, add a route WITHOUT a path whose errorElement is <PageProblem />,
// and move the pages into its children: the index page, sites, sites/:siteId, reports and a catch-all *.
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]
