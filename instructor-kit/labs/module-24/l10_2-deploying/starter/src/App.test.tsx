// Tests (given): the app against MSW in Node, with the same sample gear as the demo
import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { apiBaseUrl } from './api.ts'
import { App } from './App.tsx'
import { SAMPLE_GEAR } from './demo/sampleGear.ts'

const server = setupServer(http.get('http://localhost:4000/api/gear', () => HttpResponse.json(SAMPLE_GEAR)))
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Gear Library', () => {
  it('asks the API at VITE_API_URL, or localhost:4000 without one', () => {
    expect(apiBaseUrl()).toBe('http://localhost:4000')
  })

  it('lists the gear the API sends', async () => {
    render(<App />)
    expect(await screen.findByText('Litter grabber: 24 to borrow')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.queryByText(/^Demo version/)).not.toBeInTheDocument()
  })
})
