import { useLoaderData } from 'react-router'
import type { routeLoader } from './loaders.ts'

export function RoutePage() {
  const { route } = useLoaderData<typeof routeLoader>()

  // TODO R2: a link back to the routes on this route's wall, the name as the <h1>, then a <dl className="route-facts">
  // with Grade, Wall (its name), Holds, Set by, Set on, and Status ("On the wall" or "Retired: taken down")
  return <p className="todo">TODO R2: the page for {route.name}</p>
}
