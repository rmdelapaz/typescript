// Tests (do not edit): npm test runs them; npm run typecheck checks them together with your code.
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { sites } from './data/sites.ts'
import { ShiftPicker } from './ShiftPicker.tsx'
import { SiteFinder } from './SiteFinder.tsx'
import { SupplySearch } from './SupplySearch.tsx'

test('Task 1: Join adds a shift and Leave takes it away again', async () => {
  const user = userEvent.setup()
  render(<ShiftPicker />)
  const [early, main] = screen.getAllByRole('button', { name: 'Join' })
  await user.click(early!)
  await user.click(main!)
  expect(screen.getByRole('status')).toHaveTextContent('2 shifts joined')
  expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(2)
  await user.click(screen.getAllByRole('button', { name: 'Leave' })[0]!)
  expect(screen.getByRole('status')).toHaveTextContent('1 shift joined')
})

test('Task 1: the pressed state is announced', async () => {
  const user = userEvent.setup()
  render(<ShiftPicker />)
  const sorting = screen.getAllByRole('listitem')[2]!
  await user.click(within(sorting).getByRole('button'))
  expect(within(sorting).getByRole('button', { name: 'Leave' })).toHaveAttribute('aria-pressed', 'true')
})

test('Task 2: all six sites at first', () => {
  render(<SiteFinder sites={sites} />)
  expect(screen.getByRole('status')).toHaveTextContent('Showing 6 of 6 sites.')
})

test('Task 2: the menu filters the list beside it', async () => {
  const user = userEvent.setup()
  render(<SiteFinder sites={sites} />)
  await user.selectOptions(screen.getByLabelText('Terrain'), 'mixed')
  expect(screen.getByRole('status')).toHaveTextContent('Showing 2 of 6 sites.')
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Driftwood Cove', 'Otter Creek Mouth'])
})

test('Task 3: the count matches what was typed, at every keystroke', async () => {
  const user = userEvent.setup()
  render(<SupplySearch />)
  await user.type(screen.getByLabelText('Find a supply'), 'gl')
  expect(screen.getByRole('status')).toHaveTextContent('Matches: 1')
  expect(within(screen.getByRole('list', { name: 'Supplies' })).getByRole('listitem')).toHaveTextContent('Gloves')
  await user.clear(screen.getByLabelText('Find a supply'))
  expect(screen.getByRole('status')).toHaveTextContent('Matches: 8')
})
