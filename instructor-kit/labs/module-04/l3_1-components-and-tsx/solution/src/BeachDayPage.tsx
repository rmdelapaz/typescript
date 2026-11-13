// Task 3 (reference solution): named imports, one component per file, capitalized names
import { CrewNumbers } from './CrewNumbers.tsx'
import { PageFooter } from './PageFooter.tsx'
import { PageHeader } from './PageHeader.tsx'
import { TideRules } from './TideRules.tsx'

export function BeachDayPage() {
  return (
    <>
      <PageHeader />
      <main>
        <TideRules />
        <CrewNumbers />
      </main>
      <PageFooter />
    </>
  )
}
