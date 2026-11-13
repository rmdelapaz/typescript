import styles from './Badge.module.css'

// Given: a small label in one of three tones (the Shoreline Crew HQ pattern, Lesson 3.6)
export type BadgeTone = 'success' | 'info' | 'neutral'

interface BadgeProps {
  label: string
  tone?: BadgeTone
}

export function Badge({ label, tone = 'info' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>
}
