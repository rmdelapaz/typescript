import { isRouteErrorResponse, Link, useLocation, useNavigate, useRouteError } from 'react-router'
import { describeError } from '../api/client.ts'

// The router shows this instead of a page that could not load or crashed; the header stays
export function ErrorPage() {
  const error = useRouteError()
  const location = useLocation()
  const navigate = useNavigate()

  // A loader's answer, thrown with data(): it carries a status, a heading and a message
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>{error.statusText || `Error ${error.status}`}</h1>
        <p className="lead">
          {typeof error.data === 'string' ? error.data : 'There is nothing to show at this address.'}
        </p>
        <p>
          Go to the <Link to="/">home page</Link> or the <Link to="/routes">routes on the walls</Link>.
        </p>
      </>
    )
  }
  // Anything else: a request that failed, an answer of the wrong shape, or a bug in a component
  return (
    <div role="alert">
      <h1>Something went wrong</h1>
      <p>{describeError(error)}</p>
      <p>
        <button type="button" onClick={() => navigate(location, { replace: true })}>
          Try again
        </button>{' '}
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
