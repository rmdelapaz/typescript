// Render a component inside the providers the app puts around it (here: the crew's name)
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'

// TODO 2: an interface RenderOptions with an optional crewName (default 'Shoreline Crew'), and a
// renderWithCrew(ui, options) that renders ui inside <CrewProvider crewName={...}> (import it from ../CrewContext.tsx)
export function renderWithCrew(ui: ReactElement) {
  return render(ui)
}
