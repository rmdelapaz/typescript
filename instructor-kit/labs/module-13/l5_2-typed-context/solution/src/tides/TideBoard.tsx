import { useState } from 'react'
import { HeightUnitContext, type HeightUnit } from './heightUnit.ts'
import { TideRow } from './TideRow.tsx'

// The board owns the unit; every TideHeight inside the provider hears it, whatever sits in between
export function TideBoard() {
  const [unit, setUnit] = useState<HeightUnit>('m')
  return (
    <section aria-label="Tide board">
      <HeightUnitContext value={unit}>
        <button type="button" onClick={() => setUnit(unit === 'm' ? 'ft' : 'm')}>
          Show {unit === 'm' ? 'feet' : 'meters'}
        </button>
        <TideRow label="High tide" meters={1.5} />
        <TideRow label="Low tide" meters={0.3} />
      </HeightUnitContext>
    </section>
  )
}
