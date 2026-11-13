// Tests (do not edit): npm test runs them, npm run typecheck checks them with your code
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'
import { expect, test, vi } from 'vitest'
import { ShiftBanner } from './shift/ShiftBanner.tsx'
import { ShiftContext } from './shift/ShiftContext.ts'
import { ShiftControls } from './shift/ShiftControls.tsx'
import { ShiftProvider } from './shift/ShiftProvider.tsx'
import { TideBoard } from './tides/TideBoard.tsx'
import { TideHeight } from './tides/TideHeight.tsx'

test('Task 1: with no provider above it, a height uses the default unit', () => {
  render(<TideHeight meters={1.5} />)
  expect(screen.getByText('1.5 m')).toBeInTheDocument()
})

test('Task 1: one click on the board switches every row to feet', async () => {
  const user = userEvent.setup()
  render(<TideBoard />)
  await user.click(screen.getByRole('button', { name: 'Show feet' }))
  expect(screen.getByText('4.9 ft').closest('p')).toHaveTextContent('High tide: 4.9 ft')
  expect(screen.getByText('1.0 ft').closest('p')).toHaveTextContent('Low tide: 1.0 ft')
  expect(screen.getByRole('button', { name: 'Show meters' })).toBeInTheDocument()
})

test('Task 2: outside a provider, useShift() fails loudly and says what to fix', () => {
  const quiet = vi.spyOn(console, 'error').mockImplementation(() => {})   // React reports the error too
  expect(() => render(<ShiftBanner />)).toThrow('useShift() must be used inside <ShiftProvider>')
  quiet.mockRestore()
})

// Task 2 is checked by the TYPE as well (npm run typecheck): reading the context directly must not compile
export function ReadsTheContextDirectly() {
  // @ts-expect-error outside a provider the value is undefined, and undefined has no lead (TS2339)
  const { lead } = useContext(ShiftContext)
  return <p>{lead}</p>
}

function SupplyShed() {
  return (
    <ShiftProvider>
      <header>
        <ShiftBanner />
      </header>
      <main>
        <ShiftControls />
      </main>
    </ShiftProvider>
  )
}

test('Task 3: starting a shift reaches the banner in another branch of the tree', async () => {
  const user = userEvent.setup()
  render(<SupplyShed />)
  expect(screen.getByRole('status')).toHaveTextContent('No lead yet')
  await user.type(screen.getByLabelText('Shift lead'), 'Ana Ruiz')
  await user.click(screen.getByRole('button', { name: 'Start shift' }))
  expect(screen.getByRole('status')).toHaveTextContent('Lead: Ana Ruiz')
})

test('Task 3: ending the shift clears it everywhere', async () => {
  const user = userEvent.setup()
  render(<SupplyShed />)
  await user.type(screen.getByLabelText('Shift lead'), 'Ana Ruiz')
  await user.click(screen.getByRole('button', { name: 'Start shift' }))
  await user.click(screen.getByRole('button', { name: 'End shift' }))
  expect(screen.getByRole('status')).toHaveTextContent('No lead yet')
  expect(screen.getByLabelText('Shift lead')).toBeInTheDocument()
})
