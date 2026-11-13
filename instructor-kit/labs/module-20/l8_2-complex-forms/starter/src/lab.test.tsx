// Tests (do not edit): npm test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { CheckoutForm } from './CheckoutForm.tsx'
import { checkSheet } from './checkSheet.ts'
import { checkoutSchema, type CheckoutData, type CheckoutValues } from './schemas.ts'

// Every problem as 'path → message', the way the resolver hands them to the form
function problems(values: CheckoutValues): string[] {
  const result = checkoutSchema.safeParse(values)
  return result.success ? [] : result.error.issues.map((issue) => `${issue.path.join('.')} → ${issue.message}`)
}

test('Task 1: an empty count is a message, not 0', () => {
  expect(problems({ rows: [{ item: 'gloves', count: '' }] })).toEqual(['rows.0.count → Count must be a whole number from 1 to 200.'])
  expect(problems({ rows: [{ item: 'gloves', count: '2.5' }] })).toHaveLength(1)
})

test('Task 1: counts come back as numbers', () => {
  expect(checkoutSchema.parse({ rows: [{ item: 'bags', count: ' 12 ' }] })).toEqual({ rows: [{ item: 'bags', count: 12 }] })
})

test('Task 1: each item once, the message on the repeated row', () => {
  expect(problems({ rows: [
    { item: 'gloves', count: '12' }, { item: 'bags', count: '5' }, { item: 'gloves', count: '3' },
  ] })).toEqual(['rows.2.item → Gloves is already in the list: add to its count.'])
})

test('Task 1: the list rule runs while a count is still wrong', () => {
  expect(problems({ rows: [{ item: 'gloves', count: '' }, { item: 'gloves', count: '3' }] })).toEqual([
    'rows.0.count → Count must be a whole number from 1 to 200.',
    'rows.1.item → Gloves is already in the list: add to its count.',
  ])
})

test('Task 1: the box holds text, the checked data a number (npm run typecheck)', () => {
  // @ts-expect-error: a count box holds text (the schema's input type)
  const typed: CheckoutValues['rows'][number]['count'] = 12
  const checked: CheckoutData['rows'][number]['count'] = 12
  expect([typed, checked]).toEqual([12, 12])
})

test('Task 2: Add a row: the next item, the cursor in its count', async () => {
  const user = userEvent.setup()
  render(<CheckoutForm onSave={() => {}} />)
  await user.click(screen.getByRole('button', { name: 'Add a row' }))
  expect(screen.getByLabelText('Item, row 2')).toHaveValue('bags')
  expect(screen.getByLabelText('How many, row 2')).toHaveFocus()
})

test('Task 2: Remove: the row goes, the focus lands on Add a row', async () => {
  const user = userEvent.setup()
  render(<CheckoutForm onSave={() => {}} />)
  await user.click(screen.getByRole('button', { name: 'Add a row' }))
  await user.type(screen.getByLabelText('How many, row 2'), '30')
  await user.click(screen.getByRole('button', { name: 'Remove row 1' }))
  expect(screen.queryByLabelText('Item, row 2')).toBeNull()
  expect(screen.getByLabelText('Item, row 1')).toHaveValue('bags')
  expect(screen.getByLabelText('How many, row 1')).toHaveValue('30')
  expect(screen.getByRole('button', { name: 'Add a row' })).toHaveFocus()
})

test('Task 2: a duplicate is refused on its row; a good list is saved as numbers', async () => {
  const user = userEvent.setup()
  const onSave = vi.fn((_data: CheckoutData) => {})
  render(<CheckoutForm onSave={onSave} />)
  await user.type(screen.getByLabelText('How many, row 1'), '12')
  await user.click(screen.getByRole('button', { name: 'Add a row' }))
  await user.type(screen.getByLabelText('How many, row 2'), '3')
  await user.selectOptions(screen.getByLabelText('Item, row 2'), 'gloves')
  await user.click(screen.getByRole('button', { name: 'Save the checkout' }))
  expect(await screen.findByText('Gloves is already in the list: add to its count.')).toBeInTheDocument()
  expect(onSave).not.toHaveBeenCalled()
  await user.selectOptions(screen.getByLabelText('Item, row 2'), 'buckets')
  await user.click(screen.getByRole('button', { name: 'Save the checkout' }))
  expect(onSave.mock.calls[0]?.[0]).toEqual({ rows: [{ item: 'gloves', count: 12 }, { item: 'buckets', count: 3 }] })
})

test('Task 3: JPEG, PNG and PDF up to 2 MB pass', () => {
  expect(checkSheet(new File(['x'], 'sheet.jpg', { type: 'image/jpeg' }))).toBeNull()
  expect(checkSheet(new File(['x'], 'sheet.pdf', { type: 'application/pdf' }))).toBeNull()
})

test('Task 3: other types, and files over 2 MB, get a message', () => {
  expect(checkSheet(new File(['x'], 'sheet.gif', { type: 'image/gif' }))).toBe('sheet.gif is not a JPEG, PNG or PDF file.')
  const big = new File([new Uint8Array(2.5 * 1024 * 1024)], 'scan.pdf', { type: 'application/pdf' })
  expect(checkSheet(big)).toBe('scan.pdf is 2.5 MB. Sheets must be 2 MB or smaller.')
})
