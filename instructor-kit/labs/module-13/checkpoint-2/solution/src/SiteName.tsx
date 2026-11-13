import { useSite } from './useSite.ts'

interface SiteNameProps {
  apiUrl: string
  siteId: string
}

// Uses the Hook of Task 1 (do not edit)
export function SiteName({ apiUrl, siteId }: SiteNameProps) {
  const site = useSite(apiUrl, siteId)
  switch (site.kind) {
    case 'loading':
      return <p role="status">Loading the site…</p>
    case 'failed':
      return <p role="alert">{site.message}</p>
    case 'ready':
      return <h2>{site.data.name}</h2>
  }
}
