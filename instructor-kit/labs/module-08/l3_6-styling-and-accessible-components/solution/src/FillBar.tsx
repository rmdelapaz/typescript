import type { CSSProperties } from 'react'

interface FillBarProps {
  taken: number
  capacity: number
}

// The width comes from data, so it belongs in a style object; everything else could be a class
export function FillBar({ taken, capacity }: FillBarProps) {
  const fill: CSSProperties = {
    backgroundColor: 'var(--kelp)',
    width: `${Math.round((taken / capacity) * 100)}%`,
    height: 8,
  }
  return (
    <div>
      <div data-testid="fill" style={fill} />
      <p>
        {taken} of {capacity} spots taken
      </p>
    </div>
  )
}
