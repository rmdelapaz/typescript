import { useState } from 'react'
import type { HeightUnit } from './heightUnit.ts'
import { TideRow } from './TideRow.tsx'

// Task 1: provide `unit` to everything inside the section (React 19: <HeightUnitContext value={unit}>),
// so that both rows follow the button.
export function TideBoard() {
  const [unit, setUnit] = useState<HeightUnit>('m')
  return (
    <section aria-label="Tide board">
      <button type="button" onClick={() => setUnit(unit === 'm' ? 'ft' : 'm')}>
        Show {unit === 'm' ? 'feet' : 'meters'}
      </button>
      <TideRow label="High tide" meters={1.5} />
      <TideRow label="Low tide" meters={0.3} />
    </section>
  )
}
