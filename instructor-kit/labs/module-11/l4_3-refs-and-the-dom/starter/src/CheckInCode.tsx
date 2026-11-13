// Task 1: show a cleanup's check-in code in a read-only field, and a button that puts the focus in the field with
// the whole code selected, ready to copy. TODO 1: a ref to the input element (typed for an input), and a click
// handler that focuses and selects it.
export function CheckInCode({ code }: { code: string }) {
  return (
    <p>
      <label htmlFor="check-in-code">Check-in code</label>{' '}
      <input id="check-in-code" readOnly value={code} />{' '}
      <button type="button">Select the code</button>
    </p>
  )
}
