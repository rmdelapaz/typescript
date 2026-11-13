import type { SortOrder } from './sortOrderContext.ts'

// The words on the sort button (the tests count how often this draws)
export function OrderLabel({ order }: { order: SortOrder }) {
  return <>{order === 'newest' ? 'Newest first' : 'Oldest first'}</>
}
