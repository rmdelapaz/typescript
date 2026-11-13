import type { ChangeEvent } from 'react'
import {
  bedKinds,
  bedLabels,
  isBedKind,
  isPlotStatus,
  plotStatuses,
  statusLabels,
  type BedFilter,
  type StatusFilter,
} from '../utils/labels.ts'
import buttonStyles from './Button.module.css'
import formStyles from './Form.module.css'
import styles from './PlotFilters.module.css'

interface PlotFiltersProps {
  status: StatusFilter
  bed: BedFilter
  onStatusChange: (status: StatusFilter) => void
  onBedChange: (bed: BedFilter) => void
  onClear: () => void
}

export function PlotFilters({ status, bed, onStatusChange, onBedChange, onClear }: PlotFiltersProps) {
  const filtering = status !== 'all' || bed !== 'all'

  // A <select> hands over a string: check it is one of ours before passing it up
  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    onStatusChange(isPlotStatus(value) ? value : 'all')
  }

  function handleBedChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    onBedChange(isBedKind(value) ? value : 'all')
  }

  return (
    <search className={styles.filters}>
      <div className={formStyles.field}>
        <label htmlFor="plot-status">Status</label>
        <select id="plot-status" value={status} onChange={handleStatusChange}>
          <option value="all">All statuses</option>
          {plotStatuses.map((value) => (
            <option key={value} value={value}>
              {statusLabels[value]}
            </option>
          ))}
        </select>
      </div>
      <div className={formStyles.field}>
        <label htmlFor="plot-bed">Bed</label>
        <select id="plot-bed" value={bed} onChange={handleBedChange}>
          <option value="all">All beds</option>
          {bedKinds.map((value) => (
            <option key={value} value={value}>
              {bedLabels[value]}
            </option>
          ))}
        </select>
      </div>
      {filtering && (
        <button type="button" className={buttonStyles.secondary} onClick={onClear}>
          Clear filters
        </button>
      )}
    </search>
  )
}
