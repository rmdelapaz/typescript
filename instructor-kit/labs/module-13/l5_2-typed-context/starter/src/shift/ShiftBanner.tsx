import { useShift } from './ShiftContext.ts'
import { leadLabel } from './ShiftProvider.tsx'

// Reads the shift itself: no props
export function ShiftBanner() {
  const { lead } = useShift()
  return <p role="status">{leadLabel(lead)}</p>
}
