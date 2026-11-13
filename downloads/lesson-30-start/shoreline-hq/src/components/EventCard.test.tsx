import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useUiStore } from '../state/uiStore.ts'
import { makeEvent, makeSite } from '../test/factories.ts'
import { renderWithProviders } from '../test/render.tsx'
import { EventCard } from './EventCard.tsx'

describe('EventCard', () => {
  it('links the title to the cleanup page', () => {
    renderWithProviders(<EventCard event={makeEvent()} site={makeSite()} />)

    const link = screen.getByRole('link', { name: 'Tide Pool Morning Cleanup' })
    expect(link).toHaveAttribute('href', '/events/e17')
    expect(screen.getByRole('heading', { level: 3 })).toContainElement(link)
  })

  it('shows the date, the status, the meeting point and the spots left', () => {
    renderWithProviders(<EventCard event={makeEvent()} site={makeSite()} />)

    expect(screen.getByText('Sat, Jul 4, 2026')).toBeInTheDocument()
    expect(screen.getByText('Scheduled')).toBeInTheDocument()
    expect(screen.getByText('Otter Creek Mouth: Gravel pull-out on Highway 1')).toBeInTheDocument()
    expect(screen.getByText('7 of 12 spots left')).toBeInTheDocument()
  })

  it('says when the site is not known yet', () => {
    renderWithProviders(<EventCard event={makeEvent()} site={undefined} />)

    expect(screen.getByText(/^Site to be confirmed/)).toBeInTheDocument()
  })

  it('has a details button named after the cleanup, closed at first', () => {
    renderWithProviders(<EventCard event={makeEvent()} site={makeSite()} />)

    const button = screen.getByRole('button', { name: 'Show details for Tide Pool Morning Cleanup' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/Expect mud/)).not.toBeInTheDocument()
  })

  it('leaves out the meeting point and supplies in compact lists', () => {
    useUiStore.getState().setDensity('compact')
    renderWithProviders(<EventCard event={makeEvent()} site={makeSite()} />)

    expect(screen.queryByText(/Gravel pull-out/)).not.toBeInTheDocument()
    expect(screen.queryByText(/We bring/)).not.toBeInTheDocument()
  })

  it('shows supplies in roomy lists (the store was reset after the last test)', () => {
    renderWithProviders(<EventCard event={makeEvent()} site={makeSite()} />)

    expect(screen.getByText('We bring: gloves, bags')).toBeInTheDocument()
  })
})
