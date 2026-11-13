import { useRef } from 'react'

// Task 1: a DOM ref, because focus() and select() are things you DO to an element, not things you draw
export function CheckInCode({ code }: { code: string }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function selectCode() {
    inputRef.current?.focus()
    inputRef.current?.select()
  }

  return (
    <p>
      <label htmlFor="check-in-code">Check-in code</label>{' '}
      <input id="check-in-code" ref={inputRef} readOnly value={code} />{' '}
      <button type="button" onClick={selectCode}>
        Select the code
      </button>
    </p>
  )
}
