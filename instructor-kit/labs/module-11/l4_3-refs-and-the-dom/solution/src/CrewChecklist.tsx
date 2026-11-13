import { useRef } from 'react'

const crew = ['Maya', 'Luis', 'Hannah', 'Theo']

// Task 3: callback refs keep one element per name; React 19 calls the cleanup when the element leaves
export function CrewChecklist() {
  const boxes = useRef(new Map<string, HTMLInputElement>())

  function jump() {
    const first = crew.map((name) => boxes.current.get(name)).find((box) => box !== undefined && !box.checked)
    first?.focus()
  }

  return (
    <fieldset>
      <legend>Who is here?</legend>
      {crew.map((name) => (
        <label key={name}>
          <input
            type="checkbox"
            ref={(el) => {
              if (el) boxes.current.set(name, el)
              return () => {
                boxes.current.delete(name)
              }
            }}
          />{' '}
          {name}
        </label>
      ))}
      <button type="button" onClick={jump}>
        Jump to the first unchecked
      </button>
    </fieldset>
  )
}
