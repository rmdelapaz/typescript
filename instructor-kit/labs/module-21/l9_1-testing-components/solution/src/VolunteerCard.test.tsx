import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { makeShift } from './test/factories.ts'
import { renderWithCrew } from './test/render.tsx'
import { VolunteerCard } from './VolunteerCard.tsx'

const theo = { volunteerId: 'v04', name: 'Theo Nakamura' }

describe('VolunteerCard', () => {
  it('is an article named after the volunteer', () => {
    renderWithCrew(<VolunteerCard {...theo} shifts={[]} />)
    expect(screen.getByRole('article', { name: 'Theo Nakamura' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Theo Nakamura' })).toBeInTheDocument()
  })

  it('thanks the volunteer for the hours worked, in the crew name', () => {
    renderWithCrew(<VolunteerCard {...theo} shifts={[makeShift({ hours: 12 })]} />, {
      crewName: 'Pelican Point Friends',
    })
    expect(screen.getByText('12 hours worked with Pelican Point Friends')).toBeInTheDocument()
    expect(screen.getByText('Bronze helper')).toBeInTheDocument()
  })

  it('shows no badge and no missed shifts for a new volunteer', () => {
    renderWithCrew(<VolunteerCard {...theo} shifts={[makeShift({ status: 'planned' })]} />)
    expect(screen.getByText('0 hours worked with Shoreline Crew')).toBeInTheDocument()
    expect(screen.queryByText(/helper$/)).not.toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Missed shifts' })).not.toBeInTheDocument()
  })

  it('lists each missed shift with its date and beach', () => {
    const shifts = [makeShift(), makeShift({ id: 'sh2', status: 'missed', date: '2026-07-11', site: 'Driftwood Cove' })]
    renderWithCrew(<VolunteerCard {...theo} shifts={shifts} />)
    const missed = screen.getByRole('list', { name: 'Missed shifts' })
    expect(missed).toHaveTextContent('2026-07-11 at Driftwood Cove')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  it('links to the profile with a name a screen reader can read', () => {
    renderWithCrew(<VolunteerCard {...theo} shifts={[]} />)
    expect(screen.getByRole('link', { name: 'Profile of Theo Nakamura' })).toHaveAttribute('href', '/volunteers/v04')
  })

  it('says so when it is rendered without its provider', () => {
    expect(() => render(<VolunteerCard {...theo} shifts={[]} />)).toThrow('useCrewName must be used inside <CrewProvider>')
  })
})
