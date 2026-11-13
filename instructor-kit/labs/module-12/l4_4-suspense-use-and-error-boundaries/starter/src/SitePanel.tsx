import { forgetSite, sitePromise } from './sitePromises.ts'

// Task 2: SiteFacts reads the site with use(sitePromise(siteId)) and shows only the happy path: an h2 with the
// name, "Town: …" and "Parking: …". SitePanel wraps it: an ErrorBoundary (fallback SiteProblem, onRetry forgets the
// site's promise) around a Suspense whose fallback is <p role="status">Loading the site…</p>.
// SiteProblem: a 404 (ApiError status 404) gets an h2 "Site not found"; anything else a role="alert" paragraph
// "Could not load the site." and a Try again button that calls retry.
export function SitePanel({ siteId }: { siteId: string }) {
  return <p>TODO 2: the panel for {siteId} ({[sitePromise.name, forgetSite.name].join(', ')})</p>
}
