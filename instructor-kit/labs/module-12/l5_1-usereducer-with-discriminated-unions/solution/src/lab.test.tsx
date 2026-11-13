// Tests (do not edit): npm test runs them, npm run typecheck type-checks them with your code.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { TallyPanel } from './TallyPanel.tsx'
import { emptyTally, tallyReducer, type Tally } from './tallyReducer.ts'

test('Task 1: counted adds to its kind, and the old state is untouched', () => {
  const one = tallyReducer(emptyTally, { type: 'counted', kind: 'glass', count: 3 })
  const two = tallyReducer(one, { type: 'counted', kind: 'glass', count: 2 })
  expect(two.counts.get('glass')).toBe(5)
  expect(one.counts.get('glass')).toBe(3)
  expect(emptyTally.counts.size).toBe(0)
  expect(two.log).toHaveLength(2)
})

test('Task 1: nothing to count gives back the SAME state; reset starts again', () => {
  const one = tallyReducer(emptyTally, { type: 'counted', kind: 'plastic', count: 4 })
  expect(tallyReducer(one, { type: 'counted', kind: 'metal', count: 0 })).toBe(one)
  expect(tallyReducer(one, { type: 'reset' }).counts.size).toBe(0)
})

test('Task 2: undoLast removes the newest count; with nothing to undo, the same state', () => {
  let tally: Tally = emptyTally
  tally = tallyReducer(tally, { type: 'counted', kind: 'plastic', count: 4 })
  tally = tallyReducer(tally, { type: 'counted', kind: 'fishing line', count: 2 })
  tally = tallyReducer(tally, { type: 'undoLast' })
  expect([...tally.counts]).toEqual([['plastic', 4]])
  tally = tallyReducer(tally, { type: 'undoLast' })
  expect(tally.counts.size, 'TODO 2: undoLast').toBe(0)
  expect(tallyReducer(tally, { type: 'undoLast' })).toBe(tally)
})

test('Task 3: the buttons count, the status line adds up, undo takes one back', async () => {
  const user = userEvent.setup()
  render(<TallyPanel />)
  const undo = screen.getByRole('button', { name: 'Undo last count' })
  expect(undo).toHaveAttribute('aria-disabled', 'true')
  await user.click(screen.getByRole('button', { name: '+ glass' }))
  await user.click(screen.getByRole('button', { name: '+ glass' }))
  await user.click(screen.getByRole('button', { name: '+ fishing line' }))
  expect(screen.getByRole('status')).toHaveTextContent('Items so far: 3.')
  expect(undo).toHaveAttribute('aria-disabled', 'false')
  await user.click(undo)
  expect(screen.getByRole('status')).toHaveTextContent('Items so far: 2.')
})

// npm run typecheck checks this function (nothing calls it): an action that misses its data is a type error
export function typeChecks() {
  // @ts-expect-error: a counted action needs its count
  return tallyReducer(emptyTally, { type: 'counted', kind: 'glass' })
}
