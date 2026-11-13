import { useId } from 'react'
import { densities, themes, useUiStore, type Density, type Theme } from '../state/uiStore.ts'
import styles from './DisplaySettings.module.css'

const themeLabels: Record<Theme, string> = {
  system: 'Match my device',
  light: 'Light',
  dark: 'Dark',
}

const densityLabels: Record<Density, string> = {
  roomy: 'Roomy',
  compact: 'Compact',
}

interface ChoicesProps<T extends string> {
  legend: string
  options: readonly T[]
  labels: Record<T, string>
  value: T
  onChange: (value: T) => void
}

// One group of radio buttons: a fieldset names the group, each label names one choice
function Choices<T extends string>({ legend, options, labels, value, onChange }: ChoicesProps<T>) {
  const name = useId()
  return (
    <fieldset className={styles.choices}>
      <legend>{legend}</legend>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={option === value}
            onChange={() => onChange(option)}
          />
          {labels[option]}
        </label>
      ))}
    </fieldset>
  )
}

// The person's display choices, saved in this browser
export function DisplaySettings() {
  const theme = useUiStore((state) => state.theme)
  const density = useUiStore((state) => state.density)
  const setTheme = useUiStore((state) => state.setTheme)
  const setDensity = useUiStore((state) => state.setDensity)

  return (
    <section className={styles.settings} aria-label="Display">
      <Choices legend="Theme" options={themes} labels={themeLabels} value={theme} onChange={setTheme} />
      <Choices
        legend="Lists"
        options={densities}
        labels={densityLabels}
        value={density}
        onChange={setDensity}
      />
    </section>
  )
}
