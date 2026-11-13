import { useRef, useState, type Ref } from 'react'

interface SearchFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  /** React 19: ref is an ordinary prop; this component gives it to the input */
  ref?: Ref<HTMLInputElement>
}

export function SearchField({ label, value, onChange, ref }: SearchFieldProps) {
  return (
    <label>
      {label} <input ref={ref} type="search" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

// Task 2b: the Clear button is about to disappear: move the focus to the search box first
export function FilterBar() {
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  function clear() {
    setQuery('')
    searchRef.current?.focus()
  }

  return (
    <search>
      <SearchField ref={searchRef} label="Search the sites" value={query} onChange={setQuery} />
      {query !== '' && (
        <button type="button" onClick={clear}>
          Clear
        </button>
      )}
    </search>
  )
}
