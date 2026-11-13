import { useReducer } from 'react'
import { emptyTally, tallyReducer, type Debris, type Tally, type TallyAction } from './tallyReducer.ts'

const kinds: Debris[] = ['plastic', 'glass', 'metal', 'fishing line']

// Task 3: the buttons only REPORT what happened; they never decide how the tally changes.
// TODO 3: dispatch { type: 'counted', kind, count: 1 } when a button is pressed.
function KindButtons({ dispatch }: { dispatch: (action: TallyAction) => void }) {
  return (
    <p>
      {kinds.map((kind) => (
        <button key={kind} type="button" onClick={() => console.log('TODO 3', kind, typeof dispatch)}>
          + {kind}
        </button>
      ))}
    </p>
  )
}

// Task 3: "Items so far: N." in a role="status" line (worked out from the counts, never stored), the buttons,
// and "Undo last count" (aria-disabled while there is nothing to undo).
// The useReducer line below is copied from an older article: npm run typecheck rejects it. TODO 3: fix it.
export function TallyPanel() {
  const [tally, dispatch] = useReducer<Tally, TallyAction>(tallyReducer, emptyTally)
  return (
    <section aria-labelledby="tally">
      <h2 id="tally">Debris tally</h2>
      <p role="status">TODO 3: {tally.log.length} counts</p>
      <KindButtons dispatch={dispatch} />
    </section>
  )
}
