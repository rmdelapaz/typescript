import { isRouteErrorResponse, Link, useLocation, useNavigate, useRouteError } from 'react-router'
import { describeError } from '../api/client.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

// The router shows this instead of a page that could not load or crashed; the header and footer stay
export function ErrorPage() {
  const error = useRouteError()
  const location = useLocation()
  const navigate = useNavigate()
  // A loader's answer (thrown with data()) carries a status, a heading and a message
  const answer = isRouteErrorResponse(error) ? error : null
  const heading = answer?.statusText || 'Something went wrong on this page'
  useDocumentTitle(heading)

  if (answer !== null) {
    return (
      <>
        <h1>{heading}</h1>
        <p className={styles.lead}>
          {typeof answer.data === 'string' ? answer.data : 'There is nothing to show at this address.'}
        </p>
        <p>
          Go to the <Link to="/">home page</Link>.
        </p>
      </>
    )
  }
  // Anything else: a request that failed, or a bug in a component
  return (
    <div role="alert">
      <h1>{heading}</h1>
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
