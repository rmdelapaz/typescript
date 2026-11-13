// The router shows this instead of a page whose loader threw, or that crashed (Task 1)
export function ErrorPage() {
  // TODO 1: read the error with useRouteError() (its type is unknown). A route answer (isRouteErrorResponse) shows
  // its statusText as the <h1> and its data under it, when the data is a string. Anything else is a crash or a
  // failed request: <div role="alert"> with the <h1> "Something went wrong on this page" and the error's message.
  return <p>TODO 1: show what went wrong</p>
}
