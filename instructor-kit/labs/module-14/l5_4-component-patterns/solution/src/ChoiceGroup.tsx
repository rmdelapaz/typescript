import { createContext, useContext, useState, type ReactNode } from 'react'

// What every Choice in one group shares
interface ChoiceValue {
  selected: string
  choose: (value: string) => void
}

// Not exported: only the parts below can read it
const ChoiceContext = createContext<ChoiceValue | undefined>(undefined)

function useChoice(part: string): ChoiceValue {
  const value = useContext(ChoiceContext)
  if (value === undefined) {
    throw new Error(`<${part}> must be used inside <ChoiceGroup>`)
  }
  return value
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
  return (
    <div role="group" aria-label={label}>
      <ChoiceContext value={{ selected, choose: setSelected }}>{children}</ChoiceContext>
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
  return (
    <button type="button" aria-pressed={value === selected} onClick={() => choose(value)}>
      {children}
    </button>
  )
}
