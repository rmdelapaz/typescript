// Tests (do not edit): npm test, then npm run typecheck.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { workDays } from './data.ts'
import { SignUpForm } from './SignUpForm.tsx'
import type { WorkDay } from './types.ts'
import { WorkDayList } from './WorkDayList.tsx'
import { spotsText } from './workDays.ts'

const compost: WorkDay = { id: 'w1', title: 'Compost turning', day: 'Saturday', spotsLeft: 4, status: 'open' }

test('Task 1: the spots line for every status', () => {
  expect(spotsText(compost)).toBe('4 spots left')
  expect(spotsText({ ...compost, spotsLeft: 1 })).toBe('1 spot left')
  expect(spotsText({ ...compost, spotsLeft: 0, status: 'full' })).toBe('Full')
  expect(spotsText({ ...compost, status: 'cancelled' })).toBe('Cancelled')
})

test('Task 2: every work day, and the count', () => {
  render(<WorkDayList days={workDays} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(6)
  expect(screen.getByText('Compost turning, Saturday: 4 spots left')).toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('Showing 6 of 6 work days')
})

test('Task 2: hiding the days nobody can join', async () => {
  const user = userEvent.setup()
  render(<WorkDayList days={workDays} />)
  await user.click(screen.getByLabelText('Hide full and cancelled days'))
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
    'Compost turning, Saturday: 4 spots left',
    'Seed library sorting, Tuesday evening: 1 spot left',
    'Harvest swap setup, Friday: 7 spots left',
  ])
  expect(screen.getByRole('status')).toHaveTextContent('Showing 3 of 6 work days')
})

test('Task 3: an empty name is explained under the field', async () => {
  const user = userEvent.setup()
  render(<SignUpForm day={compost} />)
  await user.click(screen.getByRole('button', { name: 'Sign up' }))
  const name = screen.getByLabelText('Your name')
  expect(name).toHaveAttribute('aria-invalid', 'true')
  expect(name).toHaveAccessibleDescription('Enter your name.')
})

test('Task 3: a sign-up is confirmed', async () => {
  const user = userEvent.setup()
  render(<SignUpForm day={compost} />)
  await user.type(screen.getByLabelText('Your name'), 'Ana')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))
  expect(await screen.findByRole('status')).toHaveTextContent('Thanks, Ana: you are signed up for Compost turning.')
})
