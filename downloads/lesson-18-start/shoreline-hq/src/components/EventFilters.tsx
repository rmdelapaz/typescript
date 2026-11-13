import type { ChangeEvent, Ref } from 'react'
import { isEventStatus } from '../api/client.ts'
import type { EventStatus } from '../api/types.ts'
import buttonStyles from './Button.module.css'
import styles from './EventFilters.module.css'
import formStyles from './Form.module.css'

export type StatusFilter = EventStatus | 'all'

interface EventFiltersProps {
  query: string
  status: StatusFilter
  onQueryChange: (query: string) => void
  onStatusChange: (status: StatusFilter) => void
  onClear: () => void
  /** Points at the search box, so the page can move the focus there */
  ref?: Ref<HTMLInputElement>
}

export function EventFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onClear,
  ref,
}: EventFiltersProps) {
  const filtering = query !== '' || status !== 'all'

  // A <select> hands over a string: check it is one of ours before passing it up
  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    onStatusChange(isEventStatus(value) ? value : 'all')
  }

  return (
    <search className={styles.filters}>
      <div className={formStyles.field}>
        <label htmlFor="event-search">Search cleanups</label>
        <input
          ref={ref}
          id="event-search"
          type="search"
          aria-keyshortcuts="/"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div className={formStyles.field}>
        <label htmlFor="event-status">Status</label>
        <select id="event-status" value={status} onChange={handleStatusChange}>
          <option value="all">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="draft">Draft</option>
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
