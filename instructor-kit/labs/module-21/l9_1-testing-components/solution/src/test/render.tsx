// Render a component inside the providers the app puts around it (here: the crew's name)
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { CrewProvider } from '../CrewContext.tsx'

export interface RenderOptions {
  /** The crew whose name the card thanks you in (default: Shoreline Crew) */
  crewName?: string
}

export function renderWithCrew(ui: ReactElement, { crewName = 'Shoreline Crew' }: RenderOptions = {}) {
  return render(<CrewProvider crewName={crewName}>{ui}</CrewProvider>)
}
