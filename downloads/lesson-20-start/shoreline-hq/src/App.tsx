import { AuthProvider } from './auth/AuthProvider.tsx'
import { AppLayout } from './components/AppLayout.tsx'
import buttonStyles from './components/Button.module.css'
import { ErrorBoundary, type FallbackProps } from './components/ErrorBoundary.tsx'
import { EventPage } from './pages/EventPage.tsx'
import { EventsPage } from './pages/EventsPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NewEventPage } from './pages/NewEventPage.tsx'
import { SignInPage } from './pages/SignInPage.tsx'
import { SitesPage } from './pages/SitesPage.tsx'

// Temporary, until React Router arrives in Lesson 6.1: the header's links load the whole
// page again, so reading the address once, when the app starts, is enough to pick a page.
const path = window.location.pathname

// /events/e08 is the cleanup with the id e08
const eventPath = /^\/events\/([^/]+)$/

function CurrentPage() {
  if (path === '/events/new') {
    return <NewEventPage />
  }
  const eventId = eventPath.exec(path)?.[1]
  if (eventId !== undefined) {
    return <EventPage eventId={eventId} />
  }
  if (path === '/events') {
    return <EventsPage />
  }
  if (path === '/sites') {
    return <SitesPage />
  }
  if (path === '/sign-in') {
    return <SignInPage />
  }
  return <HomePage />
}

// Shown instead of a page that crashed while rendering; the header and footer keep working
function PageCrashed({ retry }: FallbackProps) {
  return (
    <div role="alert">
      <h1>Something went wrong on this page</h1>
      <p>It is not something you did. Try again, or start over from the home page.</p>
      <p>
        <button type="button" className={buttonStyles.secondary} onClick={retry}>
          Try again
        </button>{' '}
        <a href="/">Go to the home page</a>
      </p>
    </div>
  )
}

export function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <ErrorBoundary fallback={PageCrashed}>
          <CurrentPage />
        </ErrorBoundary>
      </AppLayout>
    </AuthProvider>
  )
}
