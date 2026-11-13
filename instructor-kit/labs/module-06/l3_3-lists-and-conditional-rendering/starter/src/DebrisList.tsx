import type { DebrisCount } from './api/types.ts'
import { debrisLabels } from './labels.ts'

interface DebrisListProps {
  items: DebrisCount[]
}

// Task 1: the counts as a list, biggest first, each with its label (Task 2's table).
// TODO 1: sort WITHOUT changing the array you were given, show debrisLabels[...] instead of the id,
// and when there is nothing to show, draw <p className="empty-state">Nothing counted yet.</p> instead.
export function DebrisList({ items }: DebrisListProps) {
  const sorted = items.sort((a, b) => b.count - a.count)
  void debrisLabels
  return (
    <ol className="debris-list">
      {sorted.map((item) => (
        <li key={item.category}>
          {item.category}: {item.count}
        </li>
      ))}
    </ol>
  )
}
