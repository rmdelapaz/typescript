import { createContext, useContext } from 'react'

export type SortOrder = 'newest' | 'oldest'

export interface SortOrderValue {
  order: SortOrder
  toggleOrder: () => void
}

// T | undefined and a throwing Hook, as in Lesson 5.2
export const SortOrderContext = createContext<SortOrderValue | undefined>(undefined)

export function useSortOrder(): SortOrderValue {
  const value = useContext(SortOrderContext)
  if (value === undefined) {
    throw new Error('useSortOrder must be used inside <SortOrderProvider>')
  }
  return value
}
