import { lazy, Suspense, useState } from 'react'

// The tables' code (and their data) arrive in a file of their own, the first time someone opens them.
// React.lazy wants a module with a default export, so name the one TideTables.tsx exports.
const TideTables = lazy(async () => {
  const { TideTables } = await import('./TideTables.tsx')
  return { default: TideTables }
})

/** Tide Watch: most visitors only read the next cleanup's tide; few open the full tables */
export function App() {
  const [showTables, setShowTables] = useState(false)
  return (
    <main>
      <h1>Tide Watch</h1>
      <p>Next cleanup: Saturday at Driftwood Cove. Low tide at 09:40, the best time to reach the rocks.</p>
      <button type="button" aria-expanded={showTables} onClick={() => setShowTables((shown) => !shown)}>
        {showTables ? 'Hide the tide tables' : 'Show the tide tables'}
      </button>
      {showTables && (
        <Suspense fallback={<p role="status">Loading the tide tables…</p>}>
          <TideTables />
        </Suspense>
      )}
    </main>
  )
}
