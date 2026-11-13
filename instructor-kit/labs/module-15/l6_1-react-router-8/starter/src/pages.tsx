import { Link } from 'react-router'

// Pages this lab gives you (do not edit): home, not found, a page with a bug, and the error page

export function HomePage() {
  return (
    <>
      <h1>Site guide</h1>
      <p>Six stretches of coast that Shoreline Crew looks after.</p>
    </>
  )
}

// For the catch-all route: nothing crashed, the address is simply unknown
export function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        There is no page at this address. Go to the <Link to="/">home page</Link>.
      </p>
    </>
  )
}

// The reports this page should list: nobody has written them yet
function loadReports(): string[] | null {
  return null
}

// A page with a bug: it crashes while rendering, like the lesson's test crash on the sites page
export function ReportsPage() {
  const reports = loadReports()
  if (reports === null) {
    throw new Error('Test crash: the reports page broke while rendering')
  }
  return (
    <ul>
      {reports.map((report) => (
        <li key={report}>{report}</li>
      ))}
    </ul>
  )
}

// For an errorElement: shown INSTEAD of a page that crashed while rendering
export function PageProblem() {
  return (
    <div role="alert">
      <h1>Something went wrong on this page</h1>
      <p>
        Try another page, or go to the <Link to="/">home page</Link>.
      </p>
    </div>
  )
}
