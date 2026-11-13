import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigation, useRevalidator } from 'react-router'
import { onSessionChange } from '../api/client.ts'
import styles from './AppLayout.module.css'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

// The frame around every page: the router renders the current page where <Outlet /> is
export function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const shownPath = useRef(pathname)
  // 'loading' while the next page's loaders run; the current page stays on screen until then
  const busy = useNavigation().state === 'loading'
  const { revalidate } = useRevalidator()

  // After a link changes the page, start reading from the new page, not from the old link
  useEffect(() => {
    if (pathname !== shownPath.current) {
      shownPath.current = pathname
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [pathname])

  // Signing out (or a sign-in the API has ended) changes what loaders may show: run them again
  useEffect(() => onSessionChange(() => void revalidate()), [revalidate])

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to main content
      </a>
      <Header />
      <div role="status" className={styles.pending}>
        {busy && 'Loading…'}
      </div>
      <main id="main" ref={mainRef} tabIndex={-1} aria-busy={busy} className={styles.page}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
