import { useState } from 'react'
import type { Terrain } from './api/types.ts'

export type TerrainChoice = Terrain | 'all'

// Task 2: a terrain menu. TODO 2: make it CONTROLLED: no state of its own, a value and an onChange prop
// (typed with TerrainChoice), and a select's string checked with isTerrain before it goes up.
export function isTerrain(value: string): value is Terrain {
  return value === 'sand' || value === 'rocky' || value === 'marsh' || value === 'mixed'
}

export function TerrainFilter() {
  const [value, setValue] = useState('all')

  return (
    <div className="field">
      <label htmlFor="terrain">Terrain</label>
      <select id="terrain" value={value} onChange={(event) => setValue(event.target.value)}>
        <option value="all">All terrains</option>
        <option value="sand">Sandy beach</option>
        <option value="rocky">Rocky shore</option>
        <option value="marsh">Tidal marsh</option>
        <option value="mixed">Sand and rocks</option>
      </select>
    </div>
  )
}
