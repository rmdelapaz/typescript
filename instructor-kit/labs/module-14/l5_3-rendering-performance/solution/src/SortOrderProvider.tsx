import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { SortOrderContext, type SortOrder } from './sortOrderContext.ts'

// Shares the log's sort order with every reader below it
export function SortOrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<SortOrder>('newest')

  const toggleOrder = useCallback(() => {
    setOrder((current) => (current === 'newest' ? 'oldest' : 'newest'))
  }, [])

  // A new object only when order changes, so readers skip renders that change nothing
  const value = useMemo(() => ({ order, toggleOrder }), [order, toggleOrder])

  return <SortOrderContext value={value}>{children}</SortOrderContext>
}
