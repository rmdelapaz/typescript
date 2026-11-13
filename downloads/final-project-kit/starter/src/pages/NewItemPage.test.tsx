import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/render.tsx'

describe('the New item form', () => {
  it('explains what is missing and sends nothing', async () => {
    const { user } = renderApp('/items/new')
    await user.click(await screen.findByRole('button', { name: 'Save item' }))
    expect(await screen.findByText('Give it a name of at least 3 characters.')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows the server rule under the field when the name is taken', async () => {
    const { user } = renderApp('/items/new')
    await user.type(await screen.findByLabelText('Name'), 'First example item')
    await user.click(screen.getByRole('button', { name: 'Save item' }))
    expect(await screen.findByText('An item with this name already exists.')).toBeInTheDocument()
  })

  it('saves the item and opens its page', async () => {
    const { user, router } = renderApp('/items/new')
    await user.type(await screen.findByLabelText('Name'), 'Sunday market stall')
    await user.type(screen.getByLabelText('Notes (optional)'), 'Bring the folding table.')
    await user.click(screen.getByRole('button', { name: 'Save item' }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Sunday market stall' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/items/i4')
  })
})
