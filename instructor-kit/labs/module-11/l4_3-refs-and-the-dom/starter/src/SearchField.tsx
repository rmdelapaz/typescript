import { useState } from 'react'

interface SearchFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  // TODO 2a: React 19: the parent may pass a ref, and it should reach the INPUT
}

export function SearchField({ label, value, onChange }: SearchFieldProps) {
  return (
    <label>
      {label} <input type="search" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

// Task 2b: Clear empties the search and disappears. TODO 2b: keep the focus useful: put it in the search box.
export function FilterBar() {
  const [query, setQuery] = useState('')
  return (
    <search>
      <SearchField label="Search the sites" value={query} onChange={setQuery} />
      {query !== '' && (
        <button type="button" onClick={() => setQuery('')}>
          Clear
        </button>
      )}
    </search>
  )
}
