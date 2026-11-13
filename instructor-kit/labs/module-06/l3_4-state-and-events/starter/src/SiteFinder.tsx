import type { Site } from './api/types.ts'
import { TerrainFilter } from './TerrainFilter.tsx'

// Task 2: the menu and the list are siblings. TODO 2: give their closest common parent (this component) the
// state, pass it down, and work out the visible sites from it on every render.
export function SiteFinder({ sites }: { sites: Site[] }) {
  return (
    <>
      <TerrainFilter />
      <p role="status">
        Showing {sites.length} of {sites.length} sites.
      </p>
      <ul>
        {sites.map((site) => (
          <li key={site.id}>{site.name}</li>
        ))}
      </ul>
    </>
  )
}
