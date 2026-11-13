import { leadLabel, useShift } from './ShiftContext.ts'

// Reads the shift itself: no props
export function ShiftBanner() {
  const { lead } = useShift()
  return <p role="status">{leadLabel(lead)}</p>
}
