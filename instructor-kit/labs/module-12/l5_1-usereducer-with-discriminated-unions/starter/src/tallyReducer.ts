// The debris tally of one cleanup: how many items of each kind, and the order they were counted in (for undo).
export type Debris = 'plastic' | 'glass' | 'metal' | 'fishing line'

export interface Tally {
  counts: ReadonlyMap<Debris, number>
  log: readonly { kind: Debris; count: number }[]
}

export type TallyAction =
  | { type: 'counted'; kind: Debris; count: number }
  | { type: 'undoLast' }
  | { type: 'reset' }

export const emptyTally: Tally = { counts: new Map(), log: [] }

// Task 1: counted adds `count` items of `kind` (a count of 0 or less changes nothing: return the SAME state),
// reset starts again. Never change the state you were given: copy, then change the copy.
// Task 2: undoLast removes the newest log entry and its items (nothing to undo: the same state).
export function tallyReducer(tally: Tally, action: TallyAction): Tally {
  switch (action.type) {
    case 'counted':
      throw new Error(`TODO 1: count ${action.count} × ${action.kind}`)
    case 'reset':
      throw new Error('TODO 1: start again')
    default:
      return tally
  }
}
