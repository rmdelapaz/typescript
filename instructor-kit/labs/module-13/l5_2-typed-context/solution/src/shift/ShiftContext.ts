import { createContext, useContext } from 'react'

/** What every component can ask about today's shift at the supply shed */
export interface ShiftValue {
  /** null while nobody leads the shift */
  lead: string | null
  startShift: (name: string) => void
  endShift: () => void
}

// undefined is the value outside a ShiftProvider: a mistake that useShift() reports at once
export const ShiftContext = createContext<ShiftValue | undefined>(undefined)

/** Today's shift. Only works inside <ShiftProvider>. */
export function useShift(): ShiftValue {
  const shift = useContext(ShiftContext)
  if (shift === undefined) {
    throw new Error('useShift() must be used inside <ShiftProvider>')
  }
  return shift
}

/** "Lead: NAME" or "No lead yet" (moved here from ShiftProvider.tsx: a .tsx file exports components only) */
export function leadLabel(lead: string | null): string {
  return lead === null ? 'No lead yet' : `Lead: ${lead}`
}
