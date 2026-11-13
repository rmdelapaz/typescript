import { useState } from 'react'
import { plots } from '../data/plots.ts'
import { countLine, filterPlots, type BedFilter, type StatusFilter } from '../utils/labels.ts'
import styles from './PlotBoard.module.css'
import { PlotCard } from './PlotCard.tsx'
import { PlotFilters } from './PlotFilters.tsx'

export function PlotBoard() {
  const [status, setStatus] = useState<StatusFilter>('all')
  const [bed, setBed] = useState<BedFilter>('all')

  // Derived on every render, never stored: the list and its count always agree with the filters
  const visible = filterPlots(plots, status, bed)

  function clearFilters() {
    setStatus('all')
    setBed('all')
  }

  return (
    <>
      <PlotFilters
        status={status}
        bed={bed}
        onStatusChange={setStatus}
        onBedChange={setBed}
        onClear={clearFilters}
      />
      <p className={styles.count} role="status">
        {countLine(visible.length, plots.length)}
      </p>
      {visible.length === 0 ? (
        <p className={styles.empty}>No plots match these filters.</p>
      ) : (
        <ul className={styles.list}>
          {visible.map((plot) => (
            <li key={plot.id}>
              <PlotCard plot={plot} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
