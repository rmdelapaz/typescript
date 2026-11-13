import { useState } from 'react'
import { TideTables } from './TideTables.tsx'

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
      {showTables && <TideTables />}
    </main>
  )
}
