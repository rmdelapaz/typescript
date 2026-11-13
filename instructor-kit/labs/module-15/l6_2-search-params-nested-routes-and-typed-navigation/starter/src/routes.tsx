import type { RouteObject } from 'react-router'
import { CleanupLog } from './CleanupLog.tsx'

// Every address of the cleanup log (Task 3)
// TODO 3: give /log two children that render at its <Outlet />: an index route with the hint
// <p>Pick a cleanup to see its details.</p>, and ':cleanupId' with <CleanupDetails />.
export const routes: RouteObject[] = [{ path: '/log', element: <CleanupLog /> }]
