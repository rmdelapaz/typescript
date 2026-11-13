// Tests (do not edit): npm test. Then npm run typecheck (tsc) and npm run lint (oxlint with jsx-a11y).
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { FillBar } from './FillBar.tsx'
import { GearRow } from './GearRow.tsx'
import { TideBadge } from './TideBadge.tsx'

test('Task 1: the badge takes its two classes from TideBadge.module.css', () => {
  render(<TideBadge level="high" label="High tide at 11:40" />)
  const badge = screen.getByText('High tide at 11:40')
  // In tests, Vitest names a module's classes _<name>_<code>: the badge class, then the level's class
  expect(badge.className.split(' ')).toEqual([expect.stringMatching(/^_badge_/), expect.stringMatching(/^_high_/)])
  // @ts-expect-error A tide level is one of three words: 'stormy' must be a type error
  render(<TideBadge level="stormy" label="Storm warning" />)
})

test('Task 2: Remove is a real button whose name says what it removes', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()
  render(<GearRow item={{ id: 'gloves', name: 'gloves', icon: '/icons/gloves.svg' }} onRemove={onRemove} />)
  await user.click(screen.getByRole('button', { name: 'Remove gloves' }))
  expect(onRemove).toHaveBeenCalledWith('gloves')
  // The icon repeats the word next to it: decorative, so screen readers skip it (alt="")
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
})

test('Task 3: the bar is as wide as the share of spots taken', () => {
  render(<FillBar taken={15} capacity={20} />)
  expect(screen.getByText('15 of 20 spots taken')).toBeInTheDocument()
  expect(screen.getByTestId('fill')).toHaveStyle({ width: '75%', height: '8px' })
})
