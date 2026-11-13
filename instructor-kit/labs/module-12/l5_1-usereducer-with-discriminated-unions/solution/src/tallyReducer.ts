import { assertNever } from './assertNever.ts'

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

// A copy of the counts with `change` added to one kind (a kind back at 0 leaves the map)
function withCount(counts: ReadonlyMap<Debris, number>, kind: Debris, change: number): ReadonlyMap<Debris, number> {
  const next = new Map(counts)
  const total = (next.get(kind) ?? 0) + change
  if (total > 0) next.set(kind, total)
  else next.delete(kind)
  return next
}

export function tallyReducer(tally: Tally, action: TallyAction): Tally {
  switch (action.type) {
    case 'counted':
      if (action.count <= 0) return tally
      return {
        counts: withCount(tally.counts, action.kind, action.count),
        log: [...tally.log, { kind: action.kind, count: action.count }],
      }
    case 'undoLast': {
      const last = tally.log.at(-1)
      if (last === undefined) return tally
      return { counts: withCount(tally.counts, last.kind, -last.count), log: tally.log.slice(0, -1) }
    }
    case 'reset':
      return emptyTally
    default:
      return assertNever(action)
  }
}
