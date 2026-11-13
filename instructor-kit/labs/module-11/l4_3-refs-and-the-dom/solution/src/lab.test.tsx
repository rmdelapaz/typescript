// Tests (do not edit): npm test runs them, npm run typecheck type-checks them with your components.
import { createRef, useRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { CheckInCode } from './CheckInCode.tsx'
import { CrewChecklist } from './CrewChecklist.tsx'
import { FilterBar, SearchField } from './SearchField.tsx'

test('Task 1: the button puts the focus in the field with the whole code selected', async () => {
  const user = userEvent.setup()
  render(<CheckInCode code="TIDE-4821" />)
  await user.click(screen.getByRole('button', { name: 'Select the code' }))
  const field = screen.getByLabelText<HTMLInputElement>('Check-in code')
  expect(field).toHaveFocus()
  expect([field.selectionStart, field.selectionEnd]).toEqual([0, 'TIDE-4821'.length])
})

test('Task 2a: a ref passed to SearchField reaches the input', () => {
  const inputRef = createRef<HTMLInputElement>()
  render(<SearchField ref={inputRef} label="Search the sites" value="" onChange={() => {}} />)
  expect(inputRef.current).toBe(screen.getByRole('searchbox', { name: 'Search the sites' }))
})

test('Task 2b: after Clear, the search is empty, the button is gone and the focus is in the search box', async () => {
  const user = userEvent.setup()
  render(<FilterBar />)
  const search = screen.getByRole('searchbox', { name: 'Search the sites' })
  await user.type(search, 'pelican')
  await user.click(screen.getByRole('button', { name: 'Clear' }))
  expect(search).toHaveValue('')
  expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
  expect(search).toHaveFocus()
})

test('Task 3: the button jumps to the first crew member not checked yet', async () => {
  const user = userEvent.setup()
  render(<CrewChecklist />)
  await user.click(screen.getByRole('checkbox', { name: 'Maya' }))
  await user.click(screen.getByRole('checkbox', { name: 'Luis' }))
  await user.click(screen.getByRole('button', { name: 'Jump to the first unchecked' }))
  expect(screen.getByRole('checkbox', { name: 'Hannah' })).toHaveFocus()
  await user.click(screen.getByRole('checkbox', { name: 'Hannah' }))
  await user.click(screen.getByRole('button', { name: 'Jump to the first unchecked' }))
  expect(screen.getByRole('checkbox', { name: 'Theo' })).toHaveFocus()
})

// Task 2a is done when npm run typecheck accepts these lines: a ref for an input fits, a ref for a div does not
export function RefTypes() {
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={boxRef}>
      <SearchField ref={inputRef} label="Fits" value="" onChange={() => {}} />
      {/* @ts-expect-error: a div's ref cannot point at the input */}
      <SearchField ref={boxRef} label="Does not fit" value="" onChange={() => {}} />
    </div>
  )
}
