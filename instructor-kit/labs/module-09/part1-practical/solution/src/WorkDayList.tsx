import { useState } from 'react'
import type { WorkDay } from './types.ts'
import { spotsText } from './workDays.ts'

interface WorkDayListProps {
  days: WorkDay[]
}

export function WorkDayList({ days }: WorkDayListProps) {
  const [openOnly, setOpenOnly] = useState(false)
  // Derived from the one piece of state: never stored
  const visible = openOnly ? days.filter((day) => day.status === 'open') : days

  return (
    <>
      <p>
        <input
          id="open-only"
          type="checkbox"
          checked={openOnly}
          onChange={(event) => setOpenOnly(event.target.checked)}
        />
        <label htmlFor="open-only">Hide full and cancelled days</label>
      </p>
      <p role="status">
        Showing {visible.length} of {days.length} work days
      </p>
      <ul>
        {visible.map((day) => (
          <li key={day.id}>
            {day.title}, {day.day}: {spotsText(day)}
          </li>
        ))}
      </ul>
    </>
  )
}
