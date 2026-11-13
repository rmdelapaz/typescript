// Tests (do not edit): npm test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test, vi } from 'vitest'
import { z } from 'zod'
import { ApiError } from './api.ts'
import { JoinForm } from './JoinForm.tsx'
import { joinSchema, type JoinData, type JoinFormValues } from './schemas.ts'

// shoreline-api's real 400 answer (fixtures/validation.json): the test plays a join endpoint with its shape
const validation: { message: string } = JSON.parse(readFileSync(resolve(process.cwd(), '..', 'fixtures', 'validation.json'), 'utf8'))

const ana = { name: '  Ana Reyes ', email: 'ana.reyes@example.com', shirtSize: 'M', hoursPerMonth: '8' }

test('Task 1: valid answers come back checked: trimmed text, hours as a number', () => {
  const result = joinSchema.safeParse(ana)
  expect(result.success).toBe(true)
  expect(result.data).toEqual({ name: 'Ana Reyes', email: 'ana.reyes@example.com', shirtSize: 'M', hoursPerMonth: 8 })
})

test('Task 1: one message per field, in the form\'s words', () => {
  const result = joinSchema.safeParse({ name: 'A', email: 'ana', shirtSize: '', hoursPerMonth: '2.5' })
  expect(result.success).toBe(false)
  expect(result.error && z.flattenError(result.error).fieldErrors).toEqual({
    name: ['Use at least 2 characters for your name.'],
    email: ['Enter an email address like name@example.com.'],
    shirtSize: ['Choose a shirt size.'],
    hoursPerMonth: ['Hours must be a whole number from 1 to 40.'],
  })
  expect(joinSchema.safeParse({ ...ana, name: '   ' }).error?.issues[0]?.message).toBe('Add your name.')
})

test('Task 1: the box holds text, the checked data a number (npm run typecheck)', () => {
  // @ts-expect-error: the hours box holds text (the schema's input type)
  const typed: JoinFormValues['hoursPerMonth'] = 8
  const checked: JoinData['hoursPerMonth'] = 8
  expect([typed, checked]).toEqual([8, 8])
})

async function fillIn(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Your name'), 'Ana Reyes')
  await user.type(screen.getByLabelText('Email'), 'ana.reyes@example.com')
  await user.selectOptions(screen.getByLabelText('Shirt size'), 'M')
  await user.type(screen.getByLabelText('Hours a month'), '8')
}

test('Task 2: an empty Join shows every message, focuses the name, sends nothing', async () => {
  const user = userEvent.setup()
  const onJoin = vi.fn(async (_data: JoinData) => {})
  render(<JoinForm onJoin={onJoin} />)
  await user.click(screen.getByRole('button', { name: 'Join the crew' }))
  expect(await screen.findByText('Add your name.')).toBeInTheDocument()
  expect(screen.getByText('Enter an email address like name@example.com.')).toBeInTheDocument()
  expect(screen.getByText('Choose a shirt size.')).toBeInTheDocument()
  expect(screen.getByText('Hours must be a whole number from 1 to 40.')).toBeInTheDocument()
  expect(screen.getByLabelText('Your name')).toHaveFocus()
  expect(screen.getByLabelText('Your name')).toHaveAttribute('aria-describedby', 'name-error')
  expect(onJoin).not.toHaveBeenCalled()
})

test('Task 2: a fixed field loses its message as you type', async () => {
  const user = userEvent.setup()
  render(<JoinForm onJoin={async () => {}} />)
  await user.click(screen.getByRole('button', { name: 'Join the crew' }))
  await screen.findByText('Add your name.')
  await user.type(screen.getByLabelText('Your name'), 'Ana')
  expect(screen.queryByText('Add your name.')).toBeNull()
  expect(screen.getByLabelText('Your name')).not.toHaveAttribute('aria-invalid')
})

test('Task 2: Join sends the checked data', async () => {
  const user = userEvent.setup()
  const onJoin = vi.fn(async (_data: JoinData) => {})
  render(<JoinForm onJoin={onJoin} />)
  await fillIn(user)
  await user.click(screen.getByRole('button', { name: 'Join the crew' }))
  expect(onJoin).toHaveBeenCalledWith({ name: 'Ana Reyes', email: 'ana.reyes@example.com', shirtSize: 'M', hoursPerMonth: 8 })
})

test("Task 3: the API's field messages land under their fields", async () => {
  const user = userEvent.setup()
  const onJoin = vi.fn(async (_data: JoinData) => {
    throw new ApiError(400, validation.message, {
      email: ['Someone on the crew already uses this email.'],
      volunteerId: ['Not a field of this form.'],
    })
  })
  render(<JoinForm onJoin={onJoin} />)
  await fillIn(user)
  await user.click(screen.getByRole('button', { name: 'Join the crew' }))
  expect(await screen.findByText('Someone on the crew already uses this email.')).toBeInTheDocument()
  expect(screen.getByLabelText('Email')).toHaveFocus()
  expect(screen.getByRole('status')).toHaveTextContent(validation.message)
  expect(screen.queryByText('Not a field of this form.')).toBeNull()
})

test('Task 3: any other failure is one sentence', async () => {
  const user = userEvent.setup()
  render(<JoinForm onJoin={async () => { throw new TypeError('Failed to fetch') }} />)
  await fillIn(user)
  await user.click(screen.getByRole('button', { name: 'Join the crew' }))
  expect(await screen.findByText('Not sent. Try again in a moment.')).toBeInTheDocument()
  expect(screen.getByLabelText('Your name')).toHaveValue('Ana Reyes')
})
