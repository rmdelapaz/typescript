import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router'
import { appName } from '../config.ts'
import styles from './AppLayout.module.css'
import { DemoBanner } from './DemoBanner.tsx'

// The frame around every page: the router renders the current page where <Outlet /> is
export function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const shownPath = useRef(pathname)

  // After a link changes the page, start reading from the new page, not from the old link (Lesson 6.1)
  useEffect(() => {
    if (pathname !== shownPath.current) {
      shownPath.current = pathname
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [pathname])

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to main content
      </a>
      {import.meta.env.MODE === 'demo' && <DemoBanner />}
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          {appName}
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <NavLink to="/" end>
            Items
          </NavLink>
          <NavLink to="/items/new">New item</NavLink>
        </nav>
      </header>
      <main id="main" ref={mainRef} tabIndex={-1} className={styles.page}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>{appName}: a React + TypeScript final project.</p>
      </footer>
      <ScrollRestoration />
    </>
  )
}
