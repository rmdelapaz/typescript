// Tests (do not edit): npm test
// They COUNT work: vi.mock wraps a component or function from another file and adds 1 to a counter each time
// React calls it. Typing in a note box should not make React draw rows, labels or totals that did not change.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { CrewRoster } from './CrewRoster.tsx'
import { LogBoard } from './LogBoard.tsx'
import type { HaulLog } from './types.ts'
import { WeightReport } from './WeightReport.tsx'

const counts = vi.hoisted(() => ({ rows: 0, labels: 0, totals: 0 }))

vi.mock('./RosterRow.tsx', async (importOriginal) => {
  const real = await importOriginal<typeof import('./RosterRow.tsx')>()
  return {
    RosterRow(props: Parameters<typeof real.RosterRow>[0]) {
      counts.rows += 1
      return real.RosterRow(props)
    },
  }
})
vi.mock('./OrderLabel.tsx', async (importOriginal) => {
  const real = await importOriginal<typeof import('./OrderLabel.tsx')>()
  return {
    OrderLabel(props: Parameters<typeof real.OrderLabel>[0]) {
      counts.labels += 1
      return real.OrderLabel(props)
    },
  }
})
vi.mock('./stats.ts', async (importOriginal) => {
  const real = await importOriginal<typeof import('./stats.ts')>()
  return {
    totalsByBeach(logs: HaulLog[]) {
      counts.totals += 1
      return real.totalsByBeach(logs)
    },
  }
})

beforeEach(() => {
  counts.rows = 0
  counts.labels = 0
  counts.totals = 0
})

describe('Task 1: the shift roster', () => {
  test('marking two volunteers in a row keeps both marks', async () => {
    const user = userEvent.setup()
    render(<CrewRoster />)
    await user.click(screen.getByRole('button', { name: 'Mark Ana Lima present' }))
    await user.click(screen.getByRole('button', { name: 'Mark Chloe Tran present' }))
    expect(screen.getByText('Present: 2 of 3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mark Ana Lima present' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('typing a note draws no row again', async () => {
    const user = userEvent.setup()
    render(<CrewRoster />)
    counts.rows = 0
    await user.type(screen.getByLabelText('Note for the shift'), 'tide')
    expect(counts.rows, 'TODO 1: rows drawn while typing the note').toBe(0)
  })
})

describe('Task 2: the sort order context', () => {
  test('the button still switches the order', async () => {
    const user = userEvent.setup()
    render(<LogBoard />)
    await user.click(screen.getByRole('button', { name: 'Newest first' }))
    expect(screen.getByRole('button', { name: 'Oldest first' })).toBeInTheDocument()
  })

  test('typing a note draws no label again', async () => {
    const user = userEvent.setup()
    render(<LogBoard />)
    counts.labels = 0
    await user.type(screen.getByLabelText('Note for the board'), 'calm')
    expect(counts.labels, 'TODO 2: labels drawn while typing the note').toBe(0)
  })
})

describe('Task 3: the weight report', () => {
  const logs: HaulLog[] = [
    { beach: 'Driftwood Cove', kg: 4.5 },
    { beach: 'North Jetty', kg: 7.25 },
    { beach: 'Driftwood Cove', kg: 6 },
    { beach: 'Pelican Point Beach', kg: 2.5 },
  ]

  test('totals per beach, heaviest first', () => {
    render(<WeightReport logs={logs} />)
    const items = screen.getAllByRole('listitem').map((item) => item.textContent)
    expect(items).toEqual(['Driftwood Cove: 10.5 kg', 'North Jetty: 7.3 kg', 'Pelican Point Beach: 2.5 kg'])
  })

  test('typing a note adds nothing up again', async () => {
    const user = userEvent.setup()
    render(<WeightReport logs={logs} />)
    counts.totals = 0
    await user.type(screen.getByLabelText('Note for the report'), 'windy')
    expect(counts.totals, 'TODO 3: totals added up while typing the note').toBe(0)
  })

  test('new logs are added up again', () => {
    const { rerender } = render(<WeightReport logs={logs} />)
    rerender(<WeightReport logs={[...logs, { beach: 'Pelican Point Beach', kg: 9 }]} />)
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Pelican Point Beach: 11.5 kg')
  })
})
