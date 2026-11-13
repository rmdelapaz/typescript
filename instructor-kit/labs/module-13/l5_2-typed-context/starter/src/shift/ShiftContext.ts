import { createContext, useContext } from 'react'

/** What every component can ask about today's shift at the supply shed */
export interface ShiftValue {
  /** null while nobody leads the shift */
  lead: string | null
  startShift: (name: string) => void
  endShift: () => void
}

// Task 2: this "harmless" default hides a missing provider: startShift does nothing and nobody notices.
// Make the type tell the truth (ShiftValue | undefined, with undefined as the default) ...
export const ShiftContext = createContext<ShiftValue>({
  lead: null,
  startShift: () => {},
  endShift: () => {},
})

// ... and make this Hook the only way in: outside a provider it throws
// new Error('useShift() must be used inside <ShiftProvider>'), inside one it returns a ShiftValue.
export function useShift(): ShiftValue {
  return useContext(ShiftContext)
}
