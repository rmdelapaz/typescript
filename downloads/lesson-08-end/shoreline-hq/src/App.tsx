import { AppLayout } from './components/AppLayout.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { SitesPage } from './pages/SitesPage.tsx'

// Temporary, until React Router arrives in Lesson 6.1: the header's links load the whole
// page again, so reading the address once, when the app starts, is enough to pick a page.
const path = window.location.pathname

export function App() {
  return <AppLayout>{path === '/sites' ? <SitesPage /> : <HomePage />}</AppLayout>
}
