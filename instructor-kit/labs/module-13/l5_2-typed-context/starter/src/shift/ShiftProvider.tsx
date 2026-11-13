import type { ReactNode } from 'react'

interface ShiftProviderProps {
  children: ReactNode
}

// Task 3: own the shift in state (nobody leads at first) and provide { lead, startShift, endShift } to the
// children with <ShiftContext value={...}>. startShift(name) sets the lead; endShift() clears it.
export function ShiftProvider({ children }: ShiftProviderProps) {
  return <>{children}</>
}

// Task 3: oxlint warns about this export (a .tsx file should export components only): move it to ShiftContext.ts
export function leadLabel(lead: string | null): string {
  return lead === null ? 'No lead yet' : `Lead: ${lead}`
}
