// Tests (do not edit): npm test runs them; npm run typecheck checks them together with your code.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { readSignup, validateSignup, type SignupValues } from './signup.ts'
import { SignupForm } from './SignupForm.tsx'

function sheet(entries: Record<string, string>): FormData {
  const formData = new FormData()
  for (const [name, value] of Object.entries(entries)) formData.append(name, value)
  return formData
}

test('Task 1: every field is read as trimmed text', () => {
  const values = readSignup(sheet({ name: '  Amara Diallo ', email: 'amara@example.com', shirt: 'M', note: ' Bringing gloves ' }))
  expect(values).toEqual({ name: 'Amara Diallo', email: 'amara@example.com', shirt: 'M', note: 'Bringing gloves' })
})

test('Task 1: a missing field reads as empty text instead of crashing', () => {
  expect(readSignup(sheet({ name: 'Theo Nakamura' }))).toEqual({ name: 'Theo Nakamura', email: '', shirt: '', note: '' })
})

const good: SignupValues = { name: 'Amara Diallo', email: 'amara@example.com', shirt: 'M', note: '' }

test('Task 2: a good sheet has nothing to fix', () => {
  expect(validateSignup(good)).toEqual({})
})

test('Task 2: one message per problem, under the right field', () => {
  expect(validateSignup({ name: '', email: 'amara', shirt: 'XXL', note: 'x'.repeat(201) })).toEqual({
    name: ['Add your name.'],
    email: ['Enter an email address, such as you@example.com.'],
    shirt: ['Choose a shirt size.'],
    note: ['Keep the note to 200 characters or fewer.'],
  })
})

test('Task 3: a submit with mistakes keeps what was typed and points each field at its message', async () => {
  const user = userEvent.setup()
  render(<SignupForm />)
  await user.type(screen.getByLabelText('Your name'), 'Amara Diallo')
  await user.type(screen.getByLabelText('Email'), 'amara')
  await user.selectOptions(screen.getByLabelText('Shirt size'), 'M')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))

  const email = screen.getByLabelText('Email')
  expect(await screen.findByText('Enter an email address, such as you@example.com.')).toHaveAttribute('id', 'email-error')
  expect(email).toHaveAttribute('aria-invalid', 'true')
  expect(email).toHaveAccessibleDescription('Enter an email address, such as you@example.com.')
  expect(email).toHaveValue('amara')
  expect(screen.getByLabelText('Your name')).toHaveValue('Amara Diallo')
  expect(screen.getByLabelText('Your name')).toHaveAttribute('aria-invalid', 'false')
  expect(screen.getByLabelText('Shirt size')).toHaveValue('M')
})

test('Task 3: a good sheet says thank you and empties the form', async () => {
  const user = userEvent.setup()
  render(<SignupForm />)
  await user.type(screen.getByLabelText('Your name'), 'Amara Diallo')
  await user.type(screen.getByLabelText('Email'), 'amara@example.com')
  await user.selectOptions(screen.getByLabelText('Shirt size'), 'M')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))

  expect(await screen.findByText('Thanks, Amara Diallo! See you at the cleanup.')).toBeInTheDocument()
  expect(screen.getByLabelText('Your name')).toHaveValue('')
})
