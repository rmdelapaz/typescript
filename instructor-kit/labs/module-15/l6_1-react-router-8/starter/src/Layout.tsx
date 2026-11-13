import { Link, Outlet } from 'react-router'

// The frame around every page: the router renders the current page where <Outlet /> is
export function Layout() {
  // TODO 3: after a link changes the page (the pathname), move the focus to <main>; never on the first page

  return (
    <>
      <header>
        <Link to="/">Site guide</Link>
        {/* TODO 2: the current section should be marked with aria-current="page" */}
        <nav aria-label="Main">
          <ul>
            <li><Link to="/sites">Sites</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}
