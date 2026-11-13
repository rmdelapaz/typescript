import type { WorkDay } from './types.ts'

interface WorkDayListProps {
  days: WorkDay[]
}

// Task 2: a checkbox "Hide full and cancelled days", a count line "Showing 6 of 6 work days" (role="status"),
// and one list item per day: "Compost turning, Saturday: 4 spots left"
export function WorkDayList({ days }: WorkDayListProps) {
  return <p>TODO 2: {days.length} work days</p>
}
