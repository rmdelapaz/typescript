import { useState, type ReactNode } from 'react'
import { SortOrderContext, type SortOrder } from './sortOrderContext.ts'

// Shares the log's sort order with every reader below it
export function SortOrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<SortOrder>('newest')

  function toggleOrder() {
    setOrder((current) => (current === 'newest' ? 'oldest' : 'newest'))
  }

  // TODO 2: this value is a new object on every render, so every reader renders whenever the provider does.
  // Keep it the same object until order changes (and toggleOrder the same function).
  return <SortOrderContext value={{ order, toggleOrder }}>{children}</SortOrderContext>
}
