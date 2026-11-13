export type BagKind = 'trash' | 'recycling'

/** The bag tally of one cleanup */
export interface TallyState {
  trash: number
  recycling: number
  /** the kinds in the order they were added, for undo */
  history: readonly BagKind[]
}

export const initialTally: TallyState = { trash: 0, recycling: 0, history: [] }

// Task 2: describe the three actions as a discriminated union on `type`:
//   add (with the kind of bag), undo (takes back the last bag added), reset (starts over)
export type TallyAction = { type: string; kind?: BagKind }

// Task 2: one case per action; undo with nothing to undo returns the SAME state; assertNever(action) (./assertNever.ts)
// in the default case
export function tallyReducer(state: TallyState, action: TallyAction): TallyState {
  throw new Error(`TODO 2: handle ${action.type} (the tally has ${state.history.length} bags)`)
}
