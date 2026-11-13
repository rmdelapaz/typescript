import type { ReactNode } from 'react'
import styles from './AppLayout.module.css'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" className={styles.page}>
        {children}
      </main>
      <Footer />
    </>
  )
}
