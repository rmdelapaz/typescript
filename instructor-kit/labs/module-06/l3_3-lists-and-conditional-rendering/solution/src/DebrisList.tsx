import type { DebrisCount } from './api/types.ts'
import { debrisLabels } from './labels.ts'

interface DebrisListProps {
  items: DebrisCount[]
}

// Task 1: the counts as a list, biggest first, each with its label (Task 2's table).
export function DebrisList({ items }: DebrisListProps) {
  if (items.length === 0) {
    return <p className="empty-state">Nothing counted yet.</p>
  }

  const sorted = items.toSorted((a, b) => b.count - a.count)
  return (
    <ol className="debris-list">
      {sorted.map((item) => (
        <li key={item.category}>
          {debrisLabels[item.category]}: {item.count}
        </li>
      ))}
    </ol>
  )
}
