import { assertNever } from './assertNever.ts'

export type BagKind = 'trash' | 'recycling'

/** The bag tally of one cleanup */
export interface TallyState {
  trash: number
  recycling: number
  /** the kinds in the order they were added, for undo */
  history: readonly BagKind[]
}

export const initialTally: TallyState = { trash: 0, recycling: 0, history: [] }

export type TallyAction = { type: 'add'; kind: BagKind } | { type: 'undo' } | { type: 'reset' }

// One more (or one fewer) bag of a kind
function counted(state: TallyState, kind: BagKind, change: 1 | -1): TallyState {
  return kind === 'trash'
    ? { ...state, trash: state.trash + change }
    : { ...state, recycling: state.recycling + change }
}

export function tallyReducer(state: TallyState, action: TallyAction): TallyState {
  switch (action.type) {
    case 'add':
      return { ...counted(state, action.kind, 1), history: [...state.history, action.kind] }
    case 'undo': {
      const last = state.history.at(-1)
      if (last === undefined) return state       // nothing to undo: the same state, so nothing renders
      return { ...counted(state, last, -1), history: state.history.slice(0, -1) }
    }
    case 'reset':
      return initialTally
    default:
      return assertNever(action)
  }
}
