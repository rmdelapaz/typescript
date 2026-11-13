import { useTally } from './TallyContext.ts'

// Two components that never receive the tally as a prop (do not edit)
export function BagButtons() {
  const { dispatch } = useTally()
  return (
    <p>
      <button type="button" onClick={() => dispatch({ type: 'add', kind: 'trash' })}>
        Add trash
      </button>{' '}
      <button type="button" onClick={() => dispatch({ type: 'add', kind: 'recycling' })}>
        Add recycling
      </button>{' '}
      <button type="button" onClick={() => dispatch({ type: 'undo' })}>
        Undo
      </button>
    </p>
  )
}

export function TallyLine() {
  const { state } = useTally()
  return (
    <p role="status">
      Trash: {state.trash} · Recycling: {state.recycling}
    </p>
  )
}
