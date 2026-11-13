import { HomePage } from '../pages/HomePage.tsx'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

export function AppLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" className="page">
        <HomePage />
      </main>
      <Footer />
    </>
  )
}
