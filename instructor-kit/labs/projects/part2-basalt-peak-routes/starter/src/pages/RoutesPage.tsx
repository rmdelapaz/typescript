import { useLoaderData } from 'react-router'
import type { routesLoader } from './loaders.ts'

export function RoutesPage() {
  const { routes } = useLoaderData<typeof routesLoader>()

  // TODO R3: two <select>s, "Wall" (All walls + the four walls) and "Grade" (All grades + V0 to V7), that read
  // their values from the address (useSearchParams + readFilters) and write them back with withParam; the line
  // "Showing 9 active routes." ("1 active route." for one); then the routes, each name a link to /routes/<id>.
  return (
    <>
      <h1>Routes on the walls</h1>
      <p className="todo">TODO R3: the filters and the list ({routes.length} routes loaded)</p>
    </>
  )
}
