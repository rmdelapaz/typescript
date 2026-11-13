import type { ChangeEvent } from 'react'
import type { Terrain } from './api/types.ts'

export type TerrainChoice = Terrain | 'all'

export function isTerrain(value: string): value is Terrain {
  return value === 'sand' || value === 'rocky' || value === 'marsh' || value === 'mixed'
}

interface TerrainFilterProps {
  value: TerrainChoice
  onChange: (choice: TerrainChoice) => void
}

// Task 2: a controlled terrain menu: it shows the value it is given and reports changes
export function TerrainFilter({ value, onChange }: TerrainFilterProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const choice = event.target.value
    onChange(isTerrain(choice) ? choice : 'all')
  }

  return (
    <div className="field">
      <label htmlFor="terrain">Terrain</label>
      <select id="terrain" value={value} onChange={handleChange}>
        <option value="all">All terrains</option>
        <option value="sand">Sandy beach</option>
        <option value="rocky">Rocky shore</option>
        <option value="marsh">Tidal marsh</option>
        <option value="mixed">Sand and rocks</option>
      </select>
    </div>
  )
}
