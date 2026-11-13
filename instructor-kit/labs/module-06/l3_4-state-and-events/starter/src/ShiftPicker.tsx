import { useState } from 'react'

const shifts = [
  { id: 'early', label: 'Early crew, 07:30 to 09:30' },
  { id: 'main', label: 'Main crew, 09:00 to 12:00' },
  { id: 'sorting', label: 'Sorting table, 11:30 to 13:00' },
]

// Task 1: Join adds a shift, Leave takes it away again, and the status line counts them.
// TODO 1: two bugs. The click changes the array React already holds (so nothing redraws), and tsc has
// something to say about the initial value. Fix both; the new value depends on the old one.
export function ShiftPicker() {
  const [joined, setJoined] = useState([])

  function toggle(id: string) {
    joined.push(id)
    setJoined(joined)
  }

  return (
    <section aria-label="Shifts">
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.label}{' '}
            <button type="button" aria-pressed={joined.includes(shift.id)} onClick={() => toggle(shift.id)}>
              {joined.includes(shift.id) ? 'Leave' : 'Join'}
            </button>
          </li>
        ))}
      </ul>
      <p role="status">
        {joined.length} {joined.length === 1 ? 'shift' : 'shifts'} joined
      </p>
    </section>
  )
}
