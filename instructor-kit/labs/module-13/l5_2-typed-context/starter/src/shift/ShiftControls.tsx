import { useState, type FormEvent } from 'react'
import { useShift } from './ShiftContext.ts'

// Start or end the shift. Sits in another branch of the tree than the banner.
export function ShiftControls() {
  const { lead, startShift, endShift } = useShift()
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim() !== '') {
      startShift(name.trim())
    }
  }

  if (lead !== null) {
    return (
      <button type="button" onClick={endShift}>
        End shift
      </button>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="lead-name">Shift lead</label>
      <input id="lead-name" value={name} onChange={(event) => setName(event.target.value)} />
      <button type="submit">Start shift</button>
    </form>
  )
}
