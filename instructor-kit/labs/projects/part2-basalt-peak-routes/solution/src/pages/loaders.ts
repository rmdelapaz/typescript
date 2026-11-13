// Route loaders: the router calls them when an address is opened, and shows the page once they finish (Lesson 6.3)
import { data, type LoaderFunctionArgs } from 'react-router'
import { ApiError, getRoute, getRoutes, getWalls } from '../api/client.ts'
import type { Wall } from '../api/types.ts'
import { settersOnly } from '../auth/guards.ts'
import { readFilters } from '../utils/filters.ts'

/** One wall and how many active routes it has */
export interface WallCount {
  wall: Wall
  count: number
}

/** /: every wall with its number of active routes */
export async function homeLoader({ request }: LoaderFunctionArgs): Promise<WallCount[]> {
  // Both requests at once: neither needs the other's answer
  const [walls, routes] = await Promise.all([getWalls(request.signal), getRoutes({}, request.signal)])
  return walls.map((wall) => ({ wall, count: routes.filter((route) => route.wallId === wall.id).length }))
}

/** /routes?wall=&grade=: the walls (for the filter) and the routes that match the address */
export async function routesLoader({ request }: LoaderFunctionArgs) {
  const filters = readFilters(new URL(request.url).searchParams)
  const [walls, routes] = await Promise.all([getWalls(request.signal), getRoutes(filters, request.signal)])
  return { walls, routes }
}

/** /routes/:routeId: one route and the name of its wall */
export async function routeLoader({ params, request }: LoaderFunctionArgs) {
  const { routeId } = params
  if (routeId === undefined) {
    throw new Error('routeLoader needs a route with a :routeId parameter')
  }
  try {
    const [route, walls] = await Promise.all([getRoute(routeId, request.signal), getWalls(request.signal)])
    const wallName = walls.find((wall) => wall.id === route.wallId)?.name ?? route.wallId
    return { route, wallName }
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      const message = `There is no route "${routeId}" at Basalt Peak. The link may be wrong.`
      throw data(message, { status: 404, statusText: 'Route not found' })
    }
    throw error
  }
}

/** /setter: setters only (the guard runs first), then the walls for the form */
export async function setterLoader(args: LoaderFunctionArgs) {
  settersOnly(args)
  return { walls: await getWalls(args.request.signal) }
}
