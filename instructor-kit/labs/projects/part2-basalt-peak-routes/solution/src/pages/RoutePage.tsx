import { Link, useLoaderData } from 'react-router'
import type { routeLoader } from './loaders.ts'

export function RoutePage() {
  const { route, wallName } = useLoaderData<typeof routeLoader>()

  return (
    <>
      <p>
        <Link to={`/routes?wall=${route.wallId}`}>All routes on {wallName}</Link>
      </p>
      <h1>{route.name}</h1>
      <dl className="route-facts">
        <dt>Grade</dt>
        <dd>{route.grade}</dd>
        <dt>Wall</dt>
        <dd>{wallName}</dd>
        <dt>Holds</dt>
        <dd className="hold-color">{route.holdColor}</dd>
        <dt>Set by</dt>
        <dd>{route.setter}</dd>
        <dt>Set on</dt>
        <dd>{route.setOn}</dd>
        <dt>Status</dt>
        <dd>{route.status === 'active' ? 'On the wall' : 'Retired: taken down'}</dd>
      </dl>
    </>
  )
}
