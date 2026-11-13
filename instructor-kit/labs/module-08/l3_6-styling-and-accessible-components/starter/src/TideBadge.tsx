// Task 1: the class names below are left over from the global stylesheet. Use TideBadge.module.css
// instead, and let TypeScript hold the level to the three words the module has a class for.
interface TideBadgeProps {
  level: string
  label: string
}

export function TideBadge({ level, label }: TideBadgeProps) {
  return <span className={'badge badge-' + level}>{label}</span>
}
