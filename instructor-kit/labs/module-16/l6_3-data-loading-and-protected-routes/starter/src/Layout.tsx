import { useSyncExternalStore } from 'react'
import { Link, Outlet, useNavigation } from 'react-router'
import { onSessionChange, readSession } from './session.ts'

// The frame around every page. Do not edit.
export function Layout() {
  const session = useSyncExternalStore(onSessionChange, readSession)
  // 'loading' while the next page's loaders run: the current page stays on screen until then
  const busy = useNavigation().state === 'loading'

  return (
    <>
      <header>
        <Link to="/">Site desk</Link>
        <nav aria-label="Main">
          <Link to="/sites/north-jetty">North Jetty</Link> <Link to="/crew">Crew</Link>
        </nav>
        <p>{session === null ? 'Not signed in' : `Signed in as ${session.user.name}`}</p>
      </header>
      <div role="status">{busy && 'Loading…'}</div>
      <main aria-busy={busy}>
        <Outlet />
      </main>
    </>
  )
}
