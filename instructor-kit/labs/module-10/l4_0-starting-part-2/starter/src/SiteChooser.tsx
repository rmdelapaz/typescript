import type { SiteSummary } from './types.ts'

interface SiteChooserProps {
  sites: SiteSummary[]
}

// Task 2 (Lessons 3.2 to 3.4): a list of the sites' names, a checkbox "Step-free access only" that hides the
// sites without step-free access, and a status line "Showing N of M sites." (worked out, never stored).
export function SiteChooser({ sites }: SiteChooserProps) {
  return <p>TODO 2: {sites.length} sites</p>
}
