import { useState } from 'react'
import type { SiteSummary } from './types.ts'

interface SiteChooserProps {
  sites: SiteSummary[]
}

// Task 2 (Lessons 3.2 to 3.4): props in, one piece of state, an event, and a derived list
export function SiteChooser({ sites }: SiteChooserProps) {
  const [stepFreeOnly, setStepFreeOnly] = useState(false)
  // Derived on every render (Lesson 3.4): never a second piece of state
  const shown = stepFreeOnly ? sites.filter((site) => site.accessible) : sites

  return (
    <section aria-labelledby="site-chooser">
      <h2 id="site-chooser">Beach sites</h2>
      <label>
        <input
          type="checkbox"
          checked={stepFreeOnly}
          onChange={(event) => setStepFreeOnly(event.target.checked)}
        />
        Step-free access only
      </label>
      <p role="status">
        Showing {shown.length} of {sites.length} sites.
      </p>
      <ul>
        {shown.map((site) => (
          <li key={site.id}>
            {site.name}, {site.town}
          </li>
        ))}
      </ul>
    </section>
  )
}
