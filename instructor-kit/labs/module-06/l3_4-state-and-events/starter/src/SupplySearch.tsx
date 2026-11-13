import { useState } from 'react'

const supplies = ['Gloves', 'Trash bags', 'Recycling bags', 'Grabbers', 'Buckets', 'Sunscreen', 'Water jugs', 'First-aid kit']

// Task 3: search the supply shed. TODO 3: the count is always one keystroke behind. Store less.
export function SupplySearch() {
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState(supplies)

  function handleChange(value: string) {
    setQuery(value)
    setMatches(supplies.filter((item) => item.toLowerCase().includes(query.toLowerCase())))
  }

  return (
    <>
      <label htmlFor="supply-search">Find a supply</label>
      <input id="supply-search" value={query} onChange={(event) => handleChange(event.target.value)} />
      <p role="status">Matches: {matches.length}</p>
      <ul aria-label="Supplies">
        {matches.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
}
