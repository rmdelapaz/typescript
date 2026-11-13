import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { organizer, volunteer } from './test/factories.ts'
import { renderApp } from './test/render.tsx'
import { API_URL, recordRequests, server } from './test/server.ts'

describe('organizers-only pages', () => {
  it('send guests to sign in first, without asking the API for anything', async () => {
    const requests = recordRequests()
    const { router } = renderApp('/events/e08/edit')

    expect(await screen.findByRole('heading', { level: 1, name: 'Sign in' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/sign-in')
    expect(router.state.location.search).toBe('?next=%2Fevents%2Fe08%2Fedit')
    // The guard ran first: no cleanup, no sites, nothing a guest may not see
    expect(requests).toEqual([])
  })

  it('turn volunteers away with a 403 page', async () => {
    renderApp('/volunteers', volunteer)

    expect(await screen.findByRole('heading', { level: 1, name: 'Organizers only' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Volunteers' })).not.toBeInTheDocument()
  })

  it('open for organizers', async () => {
    renderApp('/volunteers', organizer)

    expect(await screen.findByRole('heading', { level: 1, name: 'Volunteers' })).toBeInTheDocument()
    expect(await screen.findByText('Found 24 people.')).toBeInTheDocument()
  })

  it('come back after signing in', async () => {
    const { user, router } = renderApp('/events/new')

    await user.type(await screen.findByLabelText('Email'), 'maya.okafor@example.com')
    await user.type(screen.getByLabelText('Password'), 'shoreline-demo')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Plan a cleanup' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/events/new')
  })
})

describe('a page whose data does not load', () => {
  it('says what went wrong and offers to try again', async () => {
    server.use(
      http.get(`${API_URL}/api/events`, () =>
        HttpResponse.json({ error: 'server_error', message: 'Down for repairs.' }, { status: 500 }),
      ),
    )
    const { user } = renderApp('/events')

    expect(await screen.findByRole('alert')).toHaveTextContent('The server had a problem (500).')
    // The API is back: Try again asks once more
    server.resetHandlers()
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByText('Weekend Cove Cleanup')).toBeInTheDocument()
  })
})
