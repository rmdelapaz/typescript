import type { ReactNode } from 'react'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" className="page">
        {children}
      </main>
      <Footer />
    </>
  )
}
