import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { organizer } from '../test/factories.ts'
import { renderApp } from '../test/render.tsx'
import { api, recordRequests } from '../test/server.ts'

describe('EditEventPage', () => {
  it('saves new details and shows the cleanup', async () => {
    const { user, router } = renderApp('/events/e08/edit', organizer)

    // The loader fetches the cleanup first: wait for the form
    const title = await screen.findByLabelText('Title (5 to 80 characters)')
    expect(title).toHaveValue('Weekend Cove Cleanup')

    await user.clear(title)
    await user.type(title, 'Weekend Cove Big Sweep')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    // After saving, the app goes to the cleanup's page, which shows the new title
    expect(await screen.findByRole('heading', { level: 1, name: 'Weekend Cove Big Sweep' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/events/e08')
    // And the API has it: the same code the real server runs
    expect(api.data.events.find((event) => event.id === 'e08')?.title).toBe('Weekend Cove Big Sweep')
  })

  it("shows the form's own message and sends nothing", async () => {
    const { user } = renderApp('/events/e08/edit', organizer)
    const title = await screen.findByLabelText('Title (5 to 80 characters)')
    const requests = recordRequests()

    await user.clear(title)
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(await screen.findByText('Add a title.')).toBeInTheDocument()
    expect(title).toHaveAttribute('aria-invalid', 'true')
    expect(requests).toEqual([])
  })

  it("puts the API's message under the field when its rules say no", async () => {
    const { user } = renderApp('/events/e08/edit', organizer)
    const capacity = await screen.findByLabelText('Volunteers needed (1 to 200)')

    // Weekend Cove Cleanup is full: 18 people hold a spot. Only the API knows that.
    await user.clear(capacity)
    await user.type(capacity, '10')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(
      await screen.findByText('18 volunteers already hold a spot: capacity cannot be lower.'),
    ).toBeInTheDocument()
    expect(capacity).toHaveFocus()
    expect(screen.getByText('Some fields need attention.')).toBeInTheDocument()
  })
})
