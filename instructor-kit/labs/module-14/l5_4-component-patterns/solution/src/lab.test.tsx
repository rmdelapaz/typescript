// Tests (do not edit): npm test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { Chip } from './Chip.tsx'
import { Choice, ChoiceGroup } from './ChoiceGroup.tsx'
import { DataTable } from './DataTable.tsx'
import { impactReports } from './impactReports.ts'

describe('Task 1: a compound ChoiceGroup', () => {
  function UnitPicker() {
    return (
      <ChoiceGroup label="Weight unit" defaultValue="kg">
        <Choice value="kg">Kilograms</Choice>
        <Choice value="lb">Pounds</Choice>
      </ChoiceGroup>
    )
  }

  test('the default choice is pressed', () => {
    render(<UnitPicker />)
    expect(screen.getByRole('group', { name: 'Weight unit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Kilograms' }), 'TODO 1: the default choice').toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Pounds' })).toHaveAttribute('aria-pressed', 'false')
  })

  test('clicking a choice presses it and releases the other', async () => {
    const user = userEvent.setup()
    render(<UnitPicker />)
    await user.click(screen.getByRole('button', { name: 'Pounds' }))
    expect(screen.getByRole('button', { name: 'Pounds' }), 'TODO 1: the clicked choice').toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Kilograms' })).toHaveAttribute('aria-pressed', 'false')
  })

  test('a Choice outside its group says what to fix', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})   // React also logs the error: keep the output short
    expect(() => render(<Choice value="kg">Kilograms</Choice>), 'TODO 1: the error message').toThrow(
      '<Choice> must be used inside <ChoiceGroup>',
    )
    vi.restoreAllMocks()
  })
})

describe('Task 2: a generic DataTable', () => {
  const [storm] = impactReports

  test('one row per item, one cell per column (real debris counts)', () => {
    render(
      <DataTable
        caption="Pieces counted"
        rows={storm?.items ?? []}
        getKey={(item) => item.category}
        emptyMessage="Nothing was counted."
        columns={[
          { header: 'Category', cell: (item) => item.category },
          { header: 'Count', cell: (item) => item.count },
        ]}
      />,
    )
    const rows = screen.getAllByRole('row')
    expect(rows, 'TODO 2: a header row and one row per item').toHaveLength(11)
    expect(rows[5]).toHaveTextContent('cigarette-butts241')
  })

  test('the same table infers another row type', () => {
    render(
      <DataTable
        caption="Reports"
        rows={impactReports}
        getKey={(report) => report.eventId}
        emptyMessage="No reports yet."
        columns={[
          { header: 'Cleanup', cell: (report) => report.eventId },
          { header: 'Weight', cell: (report) => `${report.weightKg} kg` },
        ]}
      />,
    )
    expect(screen.getByRole('table', { name: 'Reports' })).toBeInTheDocument()
    expect(screen.getAllByRole('cell').map((cell) => cell.textContent), 'TODO 2: the cells').toEqual([
      'e01', '18.5 kg', 'e02', '24.2 kg',
    ])
  })

  test('no rows: the empty message instead of a table', () => {
    render(
      <DataTable
        caption="Reports"
        rows={[]}
        getKey={() => 'none'}
        emptyMessage="No reports yet."
        columns={[{ header: 'Cleanup', cell: () => '' }]}
      />,
    )
    expect(screen.queryByRole('table'), 'TODO 2: no table when there are no rows').not.toBeInTheDocument()
    expect(screen.getByText('No reports yet.')).toBeInTheDocument()
  })
})

describe('Task 3: a polymorphic Chip', () => {
  test('a span by default, with its tone', () => {
    render(<Chip tone="alert">Full</Chip>)
    expect(screen.getByText('Full').tagName).toBe('SPAN')
    expect(screen.getByText('Full')).toHaveClass('alert', { exact: true })
  })

  test('as="a" renders a real link', () => {
    render(
      <Chip as="a" href="/sites">
        Beach sites
      </Chip>,
    )
    expect(screen.getByRole('link', { name: 'Beach sites' }), 'TODO 3: a link').toHaveAttribute('href', '/sites')
  })

  test('as="button" is a button that does not submit forms', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Chip as="button" onClick={onClick}>
        Filter
      </Chip>,
    )
    const button = screen.getByRole('button', { name: 'Filter' })
    expect(button, 'TODO 3: type="button"').toHaveAttribute('type', 'button')
    await user.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
