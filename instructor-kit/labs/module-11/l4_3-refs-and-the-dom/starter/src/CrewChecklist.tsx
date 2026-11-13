import { useRef } from 'react'

const crew = ['Maya', 'Luis', 'Hannah', 'Theo']

// Task 3: a checkbox per crew member, and a button that jumps to the first one not yet checked.
// The ref line below is copied from an older tutorial: npm run typecheck rejects it. TODO 3: keep each checkbox in
// a Map by name, with a callback ref that adds it and a React 19 cleanup that deletes it, then write jump().
export function CrewChecklist() {
  const boxes = useRef<(HTMLInputElement | null)[]>([])

  function jump() {
    throw new Error(`TODO 3: focus the first unchecked of ${boxes.current.length}`)
  }

  return (
    <fieldset>
      <legend>Who is here?</legend>
      {crew.map((name, i) => (
        <label key={name}>
          <input type="checkbox" ref={(el) => (boxes.current[i] = el)} /> {name}
        </label>
      ))}
      <button type="button" onClick={jump}>
        Jump to the first unchecked
      </button>
    </fieldset>
  )
}
