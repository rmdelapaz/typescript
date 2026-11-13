import { useState } from 'react'
import type { Plot } from '../types.ts'
import { bedLabels, statusLabels, statusTones } from '../utils/labels.ts'
import { Badge } from './Badge.tsx'
import styles from './PlotCard.module.css'
import { VisuallyHidden } from './VisuallyHidden.tsx'

interface PlotCardProps {
  plot: Plot
}

export function PlotCard({ plot }: PlotCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const name = `Plot ${plot.number}`

  return (
    <article className={styles.card}>
      <h3>{name}</h3>
      <p className={styles.badges}>
        <Badge label={bedLabels[plot.bed]} tone="neutral" />
        <Badge label={statusLabels[plot.status]} tone={statusTones[plot.status]} />
      </p>
      <p>
        {plot.sizeSqFt} sq ft · {plot.sunHours} hours of sun
      </p>
      {plot.gardener !== undefined && <p className={styles.muted}>Gardener: {plot.gardener}</p>}
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={showDetails}
        onClick={() => setShowDetails((shown) => !shown)}
      >
        {showDetails ? 'Hide details' : 'Show details'}{' '}
        <VisuallyHidden>for {name}</VisuallyHidden>
      </button>
      {showDetails && <p>{plot.notes}</p>}
    </article>
  )
}
