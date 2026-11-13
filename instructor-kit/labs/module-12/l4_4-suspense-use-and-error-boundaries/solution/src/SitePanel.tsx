import { Suspense, use } from 'react'
import { ApiError } from './api.ts'
import { ErrorBoundary, type FallbackProps } from './ErrorBoundary.tsx'
import { forgetSite, sitePromise } from './sitePromises.ts'

// Task 2: only the happy path: the boundaries above handle the waiting and the failing
function SiteFacts({ siteId }: { siteId: string }) {
  const site = use(sitePromise(siteId))
  return (
    <article>
      <h2>{site.name}</h2>
      <p>Town: {site.town}</p>
      <p>Parking: {site.parking}</p>
    </article>
  )
}

// Not found is not something to retry; anything else is
function SiteProblem({ error, retry }: FallbackProps) {
  if (error instanceof ApiError && error.status === 404) {
    return <h2>Site not found</h2>
  }
  return (
    <div>
      <p role="alert">Could not load the site.</p>
      <button type="button" onClick={retry}>
        Try again
      </button>
    </div>
  )
}

export function SitePanel({ siteId }: { siteId: string }) {
  return (
    <ErrorBoundary fallback={SiteProblem} onRetry={() => forgetSite(siteId)}>
      <Suspense fallback={<p role="status">Loading the site…</p>}>
        <SiteFacts siteId={siteId} />
      </Suspense>
    </ErrorBoundary>
  )
}
