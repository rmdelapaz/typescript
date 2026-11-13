import type { CSSProperties } from 'react'

interface FillBarProps {
  taken: number
  capacity: number
}

// Task 3: the bar's width comes from data, so it belongs in a style object. Fix the object and the width.
export function FillBar({ taken, capacity }: FillBarProps) {
  const fill: CSSProperties = {
    'background-color': 'var(--kelp)',
    width: '0%',
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
