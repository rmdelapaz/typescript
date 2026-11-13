import { useReducer } from 'react'
import { emptyTally, tallyReducer, type Debris, type TallyAction } from './tallyReducer.ts'

const kinds: Debris[] = ['plastic', 'glass', 'metal', 'fishing line']

// Task 3: the buttons only report what happened; the reducer decides how the tally changes
function KindButtons({ dispatch }: { dispatch: (action: TallyAction) => void }) {
  return (
    <p>
      {kinds.map((kind) => (
        <button key={kind} type="button" onClick={() => dispatch({ type: 'counted', kind, count: 1 })}>
          + {kind}
        </button>
      ))}
    </p>
  )
}

export function TallyPanel() {
  // No type arguments: the reducer's annotations are enough
  const [tally, dispatch] = useReducer(tallyReducer, emptyTally)
  // Derived on every render, never stored
  const items = [...tally.counts.values()].reduce((sum, n) => sum + n, 0)
  const canUndo = tally.log.length > 0

  return (
    <section aria-labelledby="tally">
      <h2 id="tally">Debris tally</h2>
      <p role="status">Items so far: {items}.</p>
      <KindButtons dispatch={dispatch} />
      <button type="button" aria-disabled={!canUndo} onClick={() => dispatch({ type: 'undoLast' })}>
        Undo last count
      </button>
    </section>
  )
}
