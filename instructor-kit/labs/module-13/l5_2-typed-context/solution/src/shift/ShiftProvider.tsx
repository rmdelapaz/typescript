import { useState, type ReactNode } from 'react'
import { ShiftContext } from './ShiftContext.ts'

interface ShiftProviderProps {
  children: ReactNode
}

// Owns the shift: the only place that changes it
export function ShiftProvider({ children }: ShiftProviderProps) {
  const [lead, setLead] = useState<string | null>(null)

  function startShift(name: string) {
    setLead(name)
  }

  function endShift() {
    setLead(null)
  }

  return <ShiftContext value={{ lead, startShift, endShift }}>{children}</ShiftContext>
}
