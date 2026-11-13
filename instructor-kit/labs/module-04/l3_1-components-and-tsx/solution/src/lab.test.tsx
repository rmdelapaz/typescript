// Tests (do not edit): npm test renders each component the way a user would meet it.
import { render, screen } from '@testing-library/react'
import { format } from 'node:util'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { BeachDayPage } from './BeachDayPage.tsx'
import { CrewNumbers } from './CrewNumbers.tsx'
import { TideRules } from './TideRules.tsx'

// React prints a warning with console.error for HTML habits such as class or for: the tests count them
let warnings: string[] = []
beforeEach(() => {
  warnings = []
  vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => { warnings.push(format(...args)) })
})
afterEach(() => vi.restoreAllMocks())

test('Task 1: the tide-pool rules, as TSX, without a React warning', () => {
  const { container } = render(<TideRules />)
  expect(screen.getByRole('heading', { name: 'Tide-pool rules' })).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  expect(screen.getByLabelText('I read the rules')).toHaveAttribute('type', 'checkbox')
  expect(container.querySelector('section.rules-card')).not.toBeNull()
  expect(container.querySelector('img[alt=""]')).toHaveAttribute('width', '32')
  expect(warnings).toEqual([])
})

test('Task 2: the crew in numbers, every value through braces', () => {
  render(<CrewNumbers />)
  expect(screen.getByRole('heading', { name: 'Shoreline Crew in numbers' })).toBeInTheDocument()
  expect(screen.getByText('Based at Driftwood Cove, Port Marisol')).toBeInTheDocument()
  expect(screen.getByText('25 volunteers, 45 bags')).toBeInTheDocument()
  expect(screen.getByText('Next cleanup: full')).toBeInTheDocument()
})

test('Task 3: the page has a header, a main area and a footer', () => {
  render(<BeachDayPage />)
  expect(screen.getByRole('banner')).toHaveTextContent('Beach Day at Driftwood Cove')
  expect(screen.getByRole('main')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toHaveTextContent('Many hands, cleaner sands.')
  expect(warnings).toEqual([])
})
