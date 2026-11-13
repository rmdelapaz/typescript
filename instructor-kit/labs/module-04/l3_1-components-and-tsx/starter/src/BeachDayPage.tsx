// Task 3: the page, composed from components. npm run typecheck names both problems.
import PageHeader from './PageHeader.tsx'
import { CrewNumbers } from './CrewNumbers.tsx'
import { TideRules } from './TideRules.tsx'

function pageFooter() {
  return (
    <footer className="page-footer">
      <p>Shoreline Crew · Many hands, cleaner sands.</p>
    </footer>
  )
}

export function BeachDayPage() {
  return (
    <>
      <PageHeader />
      <main>
        <TideRules />
        <CrewNumbers />
      </main>
      <pageFooter />
    </>
  )
}
