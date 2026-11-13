interface SiteCleanupsProps {
  apiUrl: string
  siteId: string
}

// Task 2b: load the cleanups of `siteId` (fetchSiteEvents from ./api.ts) when this appears AND whenever siteId
// changes, and cancel the old request when it changes. Keep a LoadState<EventSummary[]> (./loadState.ts). Show
// statusText(state, 'the cleanups') while loading (role="status") or failed (role="alert", with the message
// "The server had a problem (500)."), the titles in a list when ready, or "No cleanups at this site yet."
export function SiteCleanups({ apiUrl, siteId }: SiteCleanupsProps) {
  return <p>TODO 2b: the cleanups at {siteId}, from {apiUrl}</p>
}
