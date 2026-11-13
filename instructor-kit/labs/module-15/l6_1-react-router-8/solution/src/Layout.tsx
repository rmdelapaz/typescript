import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

// The frame around every page: the router renders the current page where <Outlet /> is
export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const shownPath = useRef(pathname)

  // Task 3: after a link changes the page, start reading from the new page (never on the first page)
  useEffect(() => {
    if (pathname !== shownPath.current) {
      shownPath.current = pathname
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [pathname])

  return (
    <>
      <header>
        <Link to="/">Site guide</Link>
        {/* Task 2: NavLink adds aria-current="page" to the link of the current section */}
        <nav aria-label="Main">
          <ul>
            <li><NavLink to="/sites">Sites</NavLink></li>
            <li><NavLink to="/reports">Reports</NavLink></li>
          </ul>
        </nav>
      </header>
      {/* tabIndex -1: a script can focus it, the Tab key never stops on it */}
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
    </>
  )
}
