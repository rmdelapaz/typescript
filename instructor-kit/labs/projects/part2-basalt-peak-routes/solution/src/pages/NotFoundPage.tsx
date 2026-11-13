import { Link } from 'react-router'

// The router's last route, path '*': any address the app does not know ends up here
export function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p className="lead">There is no page at this address in Basalt Peak Routes.</p>
      <p>
        Check the address for a typo, or go to the <Link to="/">home page</Link> or the{' '}
        <Link to="/routes">routes on the walls</Link>.
      </p>
    </>
  )
}
