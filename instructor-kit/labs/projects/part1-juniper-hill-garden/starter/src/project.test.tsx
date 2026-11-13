// Tests (do not edit): npm test. Each test name starts with the TODO it checks (TASKS.md).
// Vitest RUNS the code without checking types: npm run typecheck is the other half of "done".
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { PlotBoard } from './components/PlotBoard.tsx'
import { PlotCard } from './components/PlotCard.tsx'
import { RequestForm } from './components/RequestForm.tsx'
import { plots } from './data/plots.ts'
import type { Plot, PlotStatus } from './types.ts'
import { bedLabels, countLine, filterPlots, isBedKind, statusLabels, statusTones } from './utils/labels.ts'
import { emptyValues, validateRequest } from './utils/requestForm.ts'

function plot(id: string): Plot {
  const found = plots.find((p) => p.id === id)
  if (found === undefined) throw new Error(`no plot ${id} in src/data/plots.ts`)
  return found
}

function numbers(list: Plot[]): number[] {
  return list.map((p) => p.number)
}

test('TODO A: the data is described exactly (npm run typecheck checks the types)', () => {
  // @ts-expect-error A status is one of exactly three words: 'closed' must be a type error
  const notAStatus: PlotStatus = 'closed'
  expect(notAStatus).toBe('closed')
  expect(plots).toHaveLength(12)
})

test('TODO B: every bed and status has a label, and every status a tone', () => {
  expect(bedLabels).toEqual({ raised: 'Raised bed', ground: 'Ground plot', greenhouse: 'Greenhouse bench' })
  expect(statusLabels).toEqual({ open: 'Open', assigned: 'Assigned', resting: 'Resting' })
  expect(statusTones).toEqual({ open: 'success', assigned: 'info', resting: 'neutral' })
  expect(isBedKind('greenhouse')).toBe(true)
  expect(isBedKind('patio')).toBe(false)
})

test('TODO B: filterPlots keeps the plots that match, countLine says how many', () => {
  expect(numbers(filterPlots(plots, 'open', 'all'))).toEqual([2, 3, 6, 8, 11])
  expect(numbers(filterPlots(plots, 'all', 'greenhouse'))).toEqual([8, 9, 10])
  expect(filterPlots(plots, 'resting', 'raised')).toEqual([])
  expect(filterPlots(plots, 'all', 'all')).toHaveLength(12)
  expect(countLine(5, 12)).toBe('Showing 5 of 12 plots')
})

test('TODO C: a plot card shows the plot, its bed, its status and its size', () => {
  render(<PlotCard plot={plot('p03')} />)
  expect(screen.getByRole('heading', { level: 3, name: 'Plot 3' })).toBeInTheDocument()
  expect(screen.getByText('Raised bed')).toBeInTheDocument()
  expect(screen.getByText('Open')).toBeInTheDocument()
  expect(screen.getByText('32 sq ft · 6 hours of sun')).toBeInTheDocument()
  expect(screen.queryByText(/Gardener/)).not.toBeInTheDocument()
})

test('TODO C: an assigned plot names its gardener', () => {
  render(<PlotCard plot={plot('p04')} />)
  expect(screen.getByText('Assigned')).toBeInTheDocument()
  expect(screen.getByText('Gardener: Sam Okafor')).toBeInTheDocument()
})

test('TODO C: the details button has a name that makes sense out of context', async () => {
  const user = userEvent.setup()
  render(<PlotCard plot={plot('p03')} />)
  const show = screen.getByRole('button', { name: 'Show details for Plot 3' })
  expect(show).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByText('Raised to waist height: no bending needed.')).not.toBeInTheDocument()
  await user.click(show)
  expect(screen.getByRole('button', { name: 'Hide details for Plot 3' })).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Raised to waist height: no bending needed.')).toBeInTheDocument()
})

test('TODO D: the board lists every plot and says how many it shows', () => {
  render(<PlotBoard />)
  expect(screen.getAllByRole('article')).toHaveLength(12)
  expect(screen.getByRole('status')).toHaveTextContent('Showing 12 of 12 plots')
})

test('TODO D: the two filters narrow the list together', async () => {
  const user = userEvent.setup()
  render(<PlotBoard />)
  await user.selectOptions(screen.getByLabelText('Status'), 'open')
  expect(screen.getAllByRole('article')).toHaveLength(5)
  expect(screen.getByRole('status')).toHaveTextContent('Showing 5 of 12 plots')
  await user.selectOptions(screen.getByLabelText('Bed'), 'greenhouse')
  expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['Plot 8'])
})

test('TODO D: no matches says so, and Clear filters brings every plot back', async () => {
  const user = userEvent.setup()
  render(<PlotBoard />)
  await user.selectOptions(screen.getByLabelText('Status'), 'resting')
  await user.selectOptions(screen.getByLabelText('Bed'), 'raised')
  expect(screen.queryAllByRole('article')).toHaveLength(0)
  expect(screen.getByText('No plots match these filters.')).toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('Showing 0 of 12 plots')
  await user.click(screen.getByRole('button', { name: 'Clear filters' }))
  expect(screen.getAllByRole('article')).toHaveLength(12)
})

test('TODO E: validateRequest explains every problem in words people can act on', () => {
  expect(validateRequest(emptyValues)).toEqual({
    name: 'Enter your name.',
    email: 'Enter your email address.',
    bed: 'Choose a kind of plot.',
    householdSize: 'Household size must be a whole number from 1 to 8.',
    rules: 'Agree to the garden rules to send a request.',
  })
  expect(validateRequest({ name: 'A', email: 'ana.example.org', bed: 'patio', householdSize: '2.5', rules: 'yes' })).toEqual({
    name: 'Use at least 2 characters for your name.',
    email: 'Enter an email address like name@example.org.',
    bed: 'Choose a kind of plot.',
    householdSize: 'Household size must be a whole number from 1 to 8.',
  })
  expect(validateRequest({ name: 'Ana', email: 'ana@example.org', bed: 'raised', householdSize: '3', rules: 'yes' })).toEqual({})
})

test('TODO E: the form shows each message under its field', async () => {
  const user = userEvent.setup()
  render(<RequestForm />)
  await user.click(screen.getByRole('button', { name: 'Send request' }))
  const name = screen.getByLabelText('Your name')
  expect(name).toHaveAttribute('aria-invalid', 'true')
  expect(name).toHaveAccessibleDescription('Enter your name.')
  expect(screen.getByLabelText('I have read the garden rules')).toHaveAccessibleDescription(
    'Agree to the garden rules to send a request.',
  )
})

test('TODO E: a valid request is confirmed in the status line', async () => {
  const user = userEvent.setup()
  render(<RequestForm />)
  await user.type(screen.getByLabelText('Your name'), 'Rosa')
  await user.type(screen.getByLabelText('Email'), 'rosa@example.org')
  await user.selectOptions(screen.getByLabelText('Kind of plot'), 'greenhouse')
  await user.type(screen.getByLabelText('People in your household'), '2')
  await user.click(screen.getByLabelText('I have read the garden rules'))
  await user.click(screen.getByRole('button', { name: 'Send request' }))
  expect(await screen.findByText(/Thank you, Rosa\./)).toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent(
    'Thank you, Rosa. We will email rosa@example.org when a greenhouse bench opens up.',
  )
  expect(screen.getByLabelText('Your name')).not.toHaveAttribute('aria-invalid', 'true')
})
