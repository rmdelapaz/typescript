interface BadgeProps {
  label: string
  tone?: 'info' | 'success'
}

export function Badge({ label, tone = 'info' }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{label}</span>
}
