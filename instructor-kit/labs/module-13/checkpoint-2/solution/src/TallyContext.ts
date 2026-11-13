import { createContext, useContext } from 'react'
import type { TallyAction, TallyState } from './tally.ts'

/** What the tally's components share */
export interface TallyValue {
  state: TallyState
  dispatch: (action: TallyAction) => void
}

// No provider above = no tally: the type says so
export const TallyContext = createContext<TallyValue | undefined>(undefined)

/** The tally. Only works inside <TallyProvider>. */
export function useTally(): TallyValue {
  const tally = useContext(TallyContext)
  if (tally === undefined) {
    throw new Error('useTally() must be used inside <TallyProvider>')
  }
  return tally
}
