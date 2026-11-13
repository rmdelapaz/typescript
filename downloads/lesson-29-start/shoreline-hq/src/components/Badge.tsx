import styles from './Badge.module.css'

export type BadgeTone = 'info' | 'success' | 'neutral' | 'danger'

interface BadgeProps {
  label: string
  tone?: BadgeTone
}

export function Badge({ label, tone = 'info' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>
}
