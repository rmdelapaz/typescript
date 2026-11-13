import { useReducer, type ReactNode } from 'react'
import { initialTally, tallyReducer } from './tally.ts'
import { TallyContext } from './TallyContext.ts'

interface TallyProviderProps {
  children: ReactNode
}

// Owns the tally; every component below reads it through useTally()
export function TallyProvider({ children }: TallyProviderProps) {
  const [state, dispatch] = useReducer(tallyReducer, initialTally)
  return <TallyContext value={{ state, dispatch }}>{children}</TallyContext>
}
