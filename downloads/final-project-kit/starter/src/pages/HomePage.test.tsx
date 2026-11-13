import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/render.tsx'
import { API_URL, server } from '../test/server.ts'

describe('the home page', () => {
  it('lists the items, each linking to its page', async () => {
    renderApp('/')
    const link = await screen.findByRole('link', { name: 'First example item' })
    expect(link).toHaveAttribute('href', '/items/i1')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('says so when there are no items yet', async () => {
    server.use(http.get(`${API_URL}/api/items`, () => HttpResponse.json([])))
    renderApp('/')
    expect(await screen.findByText(/No items yet/)).toBeInTheDocument()
  })

  it('explains a server problem and offers to try again', async () => {
    server.use(http.get(`${API_URL}/api/items`, () => new HttpResponse(null, { status: 500 })))
    renderApp('/')
    expect(await screen.findByRole('alert')).toHaveTextContent('The server had a problem (500)')
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
