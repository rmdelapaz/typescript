import type { ReactNode } from 'react'
import { useUiStore } from '../state/uiStore.ts'
import styles from './DataList.module.css'

interface DataListProps<T> {
  items: T[]
  /** A key for each item: unique in the list and the same on every render */
  getKey: (item: T) => string
  /** What one item looks like: a render prop, called once per item */
  renderItem: (item: T) => ReactNode
  /** Shown instead of an empty list */
  emptyMessage: string
  /** 'grid': cards side by side (the default); 'plain': a simple bulleted list */
  layout?: 'grid' | 'plain'
}

// Any list: DataList owns the list, its layout and its empty state; the caller owns each item
export function DataList<T>({
  items,
  getKey,
  renderItem,
  emptyMessage,
  layout = 'grid',
}: DataListProps<T>) {
  const density = useUiStore((state) => state.density)

  if (items.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>
  }

  return (
    <ul className={styles[layout]} data-density={density}>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
