import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import styles from './AppLayout.module.css'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

// The frame around every page: the router renders the current page where <Outlet /> is
export function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const shownPath = useRef(pathname)

  // After a link changes the page, start reading from the new page, not from the old link
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
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className={styles.page}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
