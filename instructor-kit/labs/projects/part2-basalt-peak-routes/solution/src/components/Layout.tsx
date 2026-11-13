import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useNavigation } from 'react-router'
import { useAuth } from '../auth/AuthContext.ts'

// The frame around every page: the router renders the current page where <Outlet /> is
export function Layout() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const shownPath = useRef(pathname)
  // 'loading' while the next page's loaders run; the current page stays on screen until then
  const busy = useNavigation().state === 'loading'

  // After a link changes the page, start reading from the new page, not from the old link
  useEffect(() => {
    if (pathname !== shownPath.current) {
      shownPath.current = pathname
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [pathname])

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header">
        <Link className="brand" to="/">
          Basalt Peak Routes
        </Link>
        <nav aria-label="Main">
          <ul>
            <li><NavLink to="/routes">Routes</NavLink></li>
            <li><NavLink to="/setter">Log a route</NavLink></li>
          </ul>
        </nav>
        <div className="user">
          {session === null ? (
            <Link to="/sign-in">Sign in</Link>
          ) : (
            <>
              <span>Signed in as {session.user.name}</span>
              <button type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          )}
        </div>
      </header>
      <p role="status" className="pending">
        {busy && 'Loading…'}
      </p>
      <main id="main" ref={mainRef} tabIndex={-1} aria-busy={busy}>
        <Outlet />
      </main>
      <footer className="site-footer">Basalt Peak Climbing Gym, Millbrook. The walls are reset every week.</footer>
    </>
  )
}
