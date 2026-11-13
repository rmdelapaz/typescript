import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

// The router shows this instead of a page whose loader threw, or that crashed (Task 1)
export function ErrorPage() {
  const error = useRouteError()

  // A route answer, thrown with data(): an expected outcome, so no alert
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>{error.statusText || 'There is nothing here'}</h1>
        <p>{typeof error.data === 'string' ? error.data : 'There is nothing to show at this address.'}</p>
        <p>
          Go to the <Link to="/">home page</Link>.
        </p>
      </>
    )
  }
  // Anything else: a request that failed, or a bug in a component
  return (
    <div role="alert">
      <h1>Something went wrong on this page</h1>
      <p>{error instanceof Error ? error.message : 'Something unexpected was thrown.'}</p>
    </div>
  )
}
