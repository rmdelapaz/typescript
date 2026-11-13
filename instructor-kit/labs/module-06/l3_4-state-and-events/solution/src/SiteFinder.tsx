import { useState } from 'react'
import type { Site } from './api/types.ts'
import { TerrainFilter, type TerrainChoice } from './TerrainFilter.tsx'

// Task 2: the state lives in the closest common parent; the visible list is derived, never stored
export function SiteFinder({ sites }: { sites: Site[] }) {
  const [terrain, setTerrain] = useState<TerrainChoice>('all')
  const visible = sites.filter((site) => terrain === 'all' || site.terrain === terrain)

  return (
    <>
      <TerrainFilter value={terrain} onChange={setTerrain} />
      <p role="status">
        Showing {visible.length} of {sites.length} sites.
      </p>
      <ul>
        {visible.map((site) => (
          <li key={site.id}>{site.name}</li>
        ))}
      </ul>
    </>
  )
}
