import { memo, useState } from 'react'
import { OrderLabel } from './OrderLabel.tsx'
import { SortOrderProvider } from './SortOrderProvider.tsx'
import { useSortOrder } from './sortOrderContext.ts'

// memo, and no props at all: it should only render when the sort order changes
const SortToggle = memo(function SortToggle() {
  const { order, toggleOrder } = useSortOrder()
  return (
    <button type="button" onClick={toggleOrder}>
      <OrderLabel order={order} />
    </button>
  )
})

// The haul log board: a note box above the sort button
export function LogBoard() {
  const [note, setNote] = useState('')
  return (
    <SortOrderProvider>
      <label htmlFor="board-note">Note for the board</label>
      <input id="board-note" value={note} onChange={(event) => setNote(event.target.value)} />
      <SortToggle />
    </SortOrderProvider>
  )
}
