import styles from './TideBadge.module.css'

// One word per class in TideBadge.module.css
export type TideLevel = 'low' | 'rising' | 'high'

interface TideBadgeProps {
  level: TideLevel
  label: string
}

export function TideBadge({ level, label }: TideBadgeProps) {
  return <span className={`${styles.badge} ${styles[level]}`}>{label}</span>
}
