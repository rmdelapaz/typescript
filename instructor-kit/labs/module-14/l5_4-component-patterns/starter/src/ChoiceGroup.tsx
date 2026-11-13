import { createContext, useContext, useState, type ReactNode } from 'react'

// What every Choice in one group shares
interface ChoiceValue {
  selected: string
  choose: (value: string) => void
}

// Not exported: only the parts below can read it
const ChoiceContext = createContext<ChoiceValue | undefined>(undefined)

// TODO 1: read ChoiceContext; when it is undefined, throw new Error(`<${part}> must be used inside <ChoiceGroup>`)
function useChoice(part: string): ChoiceValue {
  return { selected: '', choose: () => console.log(part) }
}

interface ChoiceGroupProps {
  /** What the choices are about, for screen readers: "Weight unit" */
  label: string
  /** The value chosen at first */
  defaultValue: string
  children: ReactNode
}

// The parent: owns the chosen value and shares it with the Choice parts inside
export function ChoiceGroup({ label, defaultValue, children }: ChoiceGroupProps) {
  const [selected, setSelected] = useState(defaultValue)
  // TODO 1: share { selected, choose: setSelected } with the parts through ChoiceContext
  console.log(selected, setSelected)
  return (
    <div role="group" aria-label={label}>
      {children}
    </div>
  )
}

interface ChoiceProps {
  value: string
  children: ReactNode
}

// One choice: a toggle button that is pressed when it is the chosen one
export function Choice({ value, children }: ChoiceProps) {
  const { selected, choose } = useChoice('Choice')
  // TODO 1: aria-pressed when value is the selected one, and choose(value) on click
  console.log(value, selected, choose)
  return (
    <button type="button" aria-pressed={false}>
      {children}
    </button>
  )
}
