// Tests (do not edit): npm test runs them; npm run typecheck checks them together with your code.
import { render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { sites } from './data/sites.ts'
import { Panel } from './Panel.tsx'
import { SiteTile } from './SiteTile.tsx'
import { Tag } from './Tag.tsx'

test('Task 1: a tag shows its label in the default tone', () => {
  render(<Tag label="Step-free route" />)
  expect(screen.getByText('Step-free route')).toHaveClass('tag', 'tag-info')
})

test('Task 1: a tag can be a warning', () => {
  render(<Tag label="High tide at 11:40" tone="warning" />)
  expect(screen.getByText('High tide at 11:40')).toHaveClass('tag', 'tag-warning')
})

test('Task 2: a panel draws its title and whatever is inside it', () => {
  render(
    <Panel title="Before you come">
      <p>Bring water and a hat.</p>
      <Tag label="Gloves provided" />
    </Panel>,
  )
  expect(screen.getByRole('heading', { level: 2, name: 'Before you come' })).toBeInTheDocument()
  expect(screen.getByText('Bring water and a hat.')).toBeInTheDocument()
  expect(screen.getByText('Gloves provided')).toBeInTheDocument()
})

test('Task 3: one tile per site, each with its picture, its town and a step-free tag', () => {
  render(
    <>
      {sites.map((site) => (
        <SiteTile key={site.id} site={site} />
      ))}
    </>,
  )
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(6)
  const cove = screen.getByRole('heading', { name: 'Driftwood Cove' }).closest('section')
  expect(cove).not.toBeNull()
  const tile = within(cove!)
  expect(tile.getByRole('img')).toHaveAttribute('alt', 'A small curved cove with pale sand, gray driftwood logs along the tide line and dark rocks at each end.')
  expect(tile.getByText('Port Marisol')).toHaveClass('tag-info')
  expect(tile.getByText('No step-free route')).toHaveClass('tag-warning')
  expect(screen.getAllByText('Step-free route')).toHaveLength(3)
})

// Task 1 is done when npm run typecheck accepts these lines: a tag has exactly two tones, and needs a label.
// @ts-expect-error: 'danger' is not one of the two tones
void (<Tag label="Closed" tone="danger" />)
// @ts-expect-error: a tag without a label
void (<Tag tone="warning" />)
