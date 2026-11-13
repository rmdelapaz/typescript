// Task 1: a small rounded label with a tone. Two tones only: 'info' (the default) and 'warning'.
interface TagProps {
  label: string
  tone?: 'info' | 'warning'
}

export function Tag({ label, tone = 'info' }: TagProps) {
  return <span className={`tag tag-${tone}`}>{label}</span>
}
