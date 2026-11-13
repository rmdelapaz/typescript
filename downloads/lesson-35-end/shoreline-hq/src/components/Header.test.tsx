import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { organizer, volunteer } from '../test/factories.ts'
import { renderWithProviders } from '../test/render.tsx'
import { Header } from './Header.tsx'

// The names of the links in the main navigation, in order
function navLinks(): string[] {
  const nav = screen.getByRole('navigation', { name: 'Main' })
  return within(nav)
    .getAllByRole('link')
    .map((link) => link.textContent)
}

describe('Header', () => {
  it('shows guests three pages and a way to sign in', () => {
    renderWithProviders(<Header />)

    expect(navLinks()).toEqual(['Events', 'Sites', 'Impact'])
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/sign-in')
  })

  it('adds the crew list for organizers and says who is signed in', () => {
    renderWithProviders(<Header />, { session: organizer })

    expect(navLinks()).toEqual(['Events', 'Sites', 'Impact', 'Volunteers'])
    expect(screen.getByText('Maya Okafor (Organizer)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument()
  })

  it('keeps the crew list from volunteers', () => {
    renderWithProviders(<Header />, { session: volunteer })

    expect(navLinks()).not.toContain('Volunteers')
    expect(screen.getByText('Theo Nakamura (Volunteer)')).toBeInTheDocument()
  })

  it('marks the page you are on', () => {
    renderWithProviders(<Header />, { route: '/impact' })

    expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute('aria-current', 'page')
  })
})
