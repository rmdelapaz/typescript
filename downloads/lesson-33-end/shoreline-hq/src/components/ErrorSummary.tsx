import { useEffect, useId, useRef } from 'react'
import type { ErrorItem } from '../utils/formErrors.ts'
import styles from './ErrorSummary.module.css'

interface ErrorSummaryProps {
  errors: ErrorItem[]
}

// Every problem in one list at the top of a form, each one a link to its field.
// It takes the focus when it appears: give it a new key on every submit to show it again.
export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLElement>(null)
  const headingId = useId()

  useEffect(() => {
    summaryRef.current?.focus()
  }, [])

  if (errors.length === 0) {
    return null
  }
  const count = errors.length === 1 ? 'this' : `these ${errors.length}`
  return (
    <section ref={summaryRef} tabIndex={-1} aria-labelledby={headingId} className={styles.summary}>
      <h2 id={headingId}>Fix {count} before saving</h2>
      <ul>
        {errors.map((error) => (
          <li key={error.id}>
            <a
              href={`#${error.id}`}
              onClick={(event) => {
                // Focus the field without adding #id to the address (and to the history)
                event.preventDefault()
                document.getElementById(error.id)?.focus()
              }}
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
