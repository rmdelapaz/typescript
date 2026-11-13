import { useMemo, useState } from 'react'
import { totalsByBeach } from './stats.ts'
import type { HaulLog } from './types.ts'

// The season's weight per beach, with a note box for the report
export function WeightReport({ logs }: { logs: HaulLog[] }) {
  const [note, setNote] = useState('')
  // Total the logs again only when logs is a different array, not on every key press in the note
  const totals = useMemo(() => totalsByBeach(logs), [logs])

  return (
    <>
      <label htmlFor="report-note">Note for the report</label>
      <input id="report-note" value={note} onChange={(event) => setNote(event.target.value)} />
      <ol>
        {totals.map((total) => (
          <li key={total.beach}>
            {total.beach}: {total.kg} kg
          </li>
        ))}
      </ol>
    </>
  )
}
