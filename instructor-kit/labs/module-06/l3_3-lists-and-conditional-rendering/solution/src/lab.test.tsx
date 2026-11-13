// Tests (do not edit): npm test runs them; npm run typecheck checks them together with your code.
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import type { DebrisCategory } from './api/types.ts'
import { report } from './data/report.ts'
import { DebrisList } from './DebrisList.tsx'
import { debrisLabels } from './labels.ts'
import { TideBanner } from './TideBanner.tsx'

const firstOrder = report.items.map((item) => item.category)

test('Task 1: biggest count first, with labels, and the report itself unchanged', () => {
  render(<DebrisList items={report.items} />)
  const lines = screen.getAllByRole('listitem').map((li) => li.textContent)
  expect(lines).toEqual([
    'Cigarette butts: 241',
    'Metal and cans: 79',
    'Glass: 76',
    'Foam pieces: 76',
    'Plastic bottles: 66',
    'Other: 63',
    'Plastic bags: 61',
    'Food wrappers: 59',
    'Bottle caps: 52',
    'Fishing line and nets: 50',
  ])
  expect(report.items.map((item) => item.category)).toEqual(firstOrder)
})

test('Task 1: an empty list says so instead of drawing nothing', () => {
  render(<DebrisList items={[]} />)
  expect(screen.getByText('Nothing counted yet.')).toBeInTheDocument()
  expect(screen.queryByRole('list')).toBeNull()
})

// GET /api/meta's own labels
const apiLabels: [DebrisCategory, string][] = [
  ['plastic-bottles', 'Plastic bottles'],
  ['plastic-bags', 'Plastic bags'],
  ['food-wrappers', 'Food wrappers'],
  ['bottle-caps', 'Bottle caps'],
  ['cigarette-butts', 'Cigarette butts'],
  ['fishing-gear', 'Fishing line and nets'],
  ['glass', 'Glass'],
  ['metal', 'Metal and cans'],
  ['foam', 'Foam pieces'],
  ['other', 'Other'],
]

test('Task 2: every category has the API\'s label', () => {
  for (const [category, label] of apiLabels) {
    expect(debrisLabels[category]).toBe(label)
  }
})

test('Task 3: a go call with nobody waiting draws one sentence and no stray 0', () => {
  render(<TideBanner call={{ kind: 'go' }} waiting={[]} />)
  expect(screen.getByRole('region', { name: 'Tide call' })).toHaveTextContent(/^On as planned\.$/)
})

test('Task 3: a delay, and two people waiting', () => {
  render(<TideBanner call={{ kind: 'delayed', minutes: 40 }} waiting={['Theo Nakamura', 'Amara Diallo']} />)
  expect(screen.getByText('Starts 40 minutes late: the tide is still high.')).toBeInTheDocument()
  expect(screen.getByText('2 people are waiting for a spot.')).toBeInTheDocument()
})

test('Task 3: a cancelled call is an alert with its reason', () => {
  render(<TideBanner call={{ kind: 'cancelled', reason: 'Storm warning for the coast.' }} waiting={[]} />)
  expect(screen.getByRole('alert')).toHaveTextContent('Cancelled: Storm warning for the coast.')
})

// Task 2 is done when npm run typecheck accepts these lines: the table knows its ten categories.
// @ts-expect-error: 'straws' is not a debris category
void debrisLabels.straws
