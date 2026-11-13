import type { ReactNode } from 'react'

interface TallyProviderProps {
  children: ReactNode
}

// Task 3: keep the tally in useReducer(tallyReducer, initialTally) and provide { state, dispatch }
// to the children with <TallyContext value={...}>
export function TallyProvider({ children }: TallyProviderProps) {
  return <>{children}</>
}
