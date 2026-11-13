// Route loaders: the router calls them when an address is opened, and shows the page once they finish (Lesson 6.3)
import type { LoaderFunctionArgs } from 'react-router'
import { getRoutes, getWalls } from '../api/client.ts'
import type { ClimbRoute, Wall } from '../api/types.ts'
import { settersOnly } from '../auth/guards.ts'

/** One wall and how many active routes it has */
export interface WallCount {
  wall: Wall
  count: number
}

/** /: every wall with its number of active routes (given: the pattern for the two loaders below) */
export async function homeLoader({ request }: LoaderFunctionArgs): Promise<WallCount[]> {
  // Both requests at once: neither needs the other's answer
  const [walls, routes] = await Promise.all([getWalls(request.signal), getRoutes({}, request.signal)])
  return walls.map((wall) => ({ wall, count: routes.filter((route) => route.wallId === wall.id).length }))
}

/** /routes?wall=&grade=: the walls (for the filter) and the routes that match the address */
export async function routesLoader(_args: LoaderFunctionArgs): Promise<{ walls: Wall[]; routes: ClimbRoute[] }> {
  // TODO R3: read the filters from the address (readFilters in src/utils/filters.ts, on
  // new URL(request.url).searchParams), then fetch the walls and the matching routes at once.
  throw new Error('TODO R3: routesLoader is not written yet')
}

/** /routes/:routeId: one route and the name of its wall */
export async function routeLoader(_args: LoaderFunctionArgs): Promise<{ route: ClimbRoute; wallName: string }> {
  // TODO R2: params.routeId, then the route and the walls at once. An ApiError with status 404 becomes
  // throw data(message, { status: 404, statusText: 'Route not found' }): the ErrorPage shows it.
  throw new Error('TODO R2: routeLoader is not written yet')
}

/** /setter: setters only (the guard runs first), then the walls for the form */
export async function setterLoader(args: LoaderFunctionArgs) {
  settersOnly(args)
  return { walls: await getWalls(args.request.signal) }
}
