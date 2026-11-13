import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { SignUpForm } from './SignUpForm.tsx'
import { api, API_URL, recordRequests, server, type ApiErrorBody } from './test/server.ts'

// Given (do not change): the mock API starts once, is fresh for every test, and fails on unanswered requests
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
beforeEach(() => api.reset())
afterEach(() => {
  server.resetHandlers()
  server.events.removeAllListeners()
})
afterAll(() => server.close())

/** The form for Weekend Cove Cleanup, and a user who types and clicks like a person */
function renderForm() {
  const user = userEvent.setup()
  render(<SignUpForm apiUrl={API_URL} eventId="e08" />)
  return { user }
}

describe('SignUpForm', () => {
  it('shows the spots left once the API answers', async () => {
    renderForm()
    expect(screen.getByText('Checking the spots…')).toBeInTheDocument()
    expect(await screen.findByText('6 spots left')).toBeInTheDocument()
  })

  it('signs a volunteer up and counts the spot', async () => {
    const { user } = renderForm()
    await user.type(screen.getByLabelText('Your name'), 'Diego Herrera')
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(await screen.findByText('You are on the list, Diego Herrera.')).toBeInTheDocument()
    expect(screen.getByText('5 spots left')).toBeInTheDocument()
    expect(api.signups).toEqual(['Diego Herrera'])
  })

  it('works with the keyboard alone', async () => {
    const { user } = renderForm()
    await user.tab()
    expect(screen.getByLabelText('Your name')).toHaveFocus()
    await user.keyboard('Ana Lima{Enter}')
    expect(await screen.findByText('You are on the list, Ana Lima.')).toBeInTheDocument()
  })
})

describe('SignUpForm when something is wrong', () => {
  it('asks for a name and sends nothing', async () => {
    const { user } = renderForm()
    await screen.findByText('6 spots left')
    const requests = recordRequests()

    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(screen.getByText('Add your name.')).toBeInTheDocument()
    expect(screen.getByLabelText('Your name')).toHaveAttribute('aria-invalid', 'true')
    expect(requests).toEqual([])
  })

  it('shows the API message when the cleanup is full', async () => {
    api.fill()
    const { user } = renderForm()
    await user.type(screen.getByLabelText('Your name'), 'Diego Herrera')
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('This cleanup is full.')
    expect(api.signups).toEqual([])
  })

  it('says what went wrong when the server fails', async () => {
    server.use(
      http.post(`${API_URL}/api/events/:eventId/signups`, () =>
        HttpResponse.json({ error: 'server_error', message: 'The crew database is asleep.' } satisfies ApiErrorBody, {
          status: 500,
        }),
      ),
    )
    const { user } = renderForm()
    await user.type(screen.getByLabelText('Your name'), 'Diego Herrera')
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('The crew database is asleep.')
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeEnabled()
  })
})
