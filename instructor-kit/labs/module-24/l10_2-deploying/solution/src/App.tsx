import { useEffect, useState } from 'react'
import { getGear } from './api.ts'
import type { GearItem } from './types.ts'

/** The crew's gear library: what can be borrowed for the next cleanup */
export function App() {
  const [gear, setGear] = useState<GearItem[] | null>(null)
  const [problem, setProblem] = useState<string | null>(null)

  useEffect(() => {
    getGear().then(setGear, (error: unknown) => setProblem(error instanceof Error ? error.message : String(error)))
  }, [])

  return (
    <main>
      <h1>Gear Library</h1>
      {import.meta.env.MODE === 'demo' && <p>Demo version: sample gear that resets when you reload.</p>}
      {problem && <p role="alert">Could not load the gear: {problem}</p>}
      {gear === null && !problem && <p role="status">Loading the gear…</p>}
      {gear && (
        <ul>
          {gear.map((item) => (
            <li key={item.id}>
              {item.name}: {item.available} to borrow
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
