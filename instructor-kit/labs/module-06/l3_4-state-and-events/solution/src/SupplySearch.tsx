import { useState } from 'react'

const supplies = ['Gloves', 'Trash bags', 'Recycling bags', 'Grabbers', 'Buckets', 'Sunscreen', 'Water jugs', 'First-aid kit']

// Task 3: one piece of state (what was typed); the matches are worked out on every render
export function SupplySearch() {
  const [query, setQuery] = useState('')
  const matches = supplies.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <>
      <label htmlFor="supply-search">Find a supply</label>
      <input id="supply-search" value={query} onChange={(event) => setQuery(event.target.value)} />
      <p role="status">Matches: {matches.length}</p>
      <ul aria-label="Supplies">
        {matches.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
}
