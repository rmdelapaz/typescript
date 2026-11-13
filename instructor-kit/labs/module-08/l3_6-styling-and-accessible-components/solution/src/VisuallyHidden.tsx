import type { ReactNode } from 'react'
import styles from './VisuallyHidden.module.css'

interface VisuallyHiddenProps {
  children: ReactNode
}

// Given (Lesson 3.6): text that screen readers read out, but that takes no room on screen
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className={styles.hidden}>{children}</span>
}
