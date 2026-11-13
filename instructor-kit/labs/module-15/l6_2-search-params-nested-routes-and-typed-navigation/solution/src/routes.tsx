import type { RouteObject } from 'react-router'
import { CleanupDetails, CleanupLog } from './CleanupLog.tsx'

// Every address of the cleanup log (Task 3)
export const routes: RouteObject[] = [
  {
    path: '/log',
    element: <CleanupLog />,
    // Nested routes: they render inside CleanupLog, at its <Outlet />
    children: [
      { index: true, element: <p>Pick a cleanup to see its details.</p> },
      { path: ':cleanupId', element: <CleanupDetails /> },
    ],
  },
]
