import { createContext } from 'react'
import type { TallyAction, TallyState } from './tally.ts'

/** What the tally's components share */
export interface TallyValue {
  state: TallyState
  dispatch: (action: TallyAction) => void
}

// No provider above = no tally: the type says so
export const TallyContext = createContext<TallyValue | undefined>(undefined)

// Task 3: return the nearest provider's value; outside a <TallyProvider>, throw
// new Error('useTally() must be used inside <TallyProvider>')
export function useTally(): TallyValue {
  throw new Error('TODO 3: useTally()')
}
