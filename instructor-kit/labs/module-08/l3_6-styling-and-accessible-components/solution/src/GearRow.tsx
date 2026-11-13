import { VisuallyHidden } from './VisuallyHidden.tsx'

export interface GearItem {
  id: string
  name: string
  icon: string
}

interface GearRowProps {
  item: GearItem
  onRemove: (id: string) => void
}

export function GearRow({ item, onRemove }: GearRowProps) {
  return (
    <p>
      {/* The word next to it says the same: decorative */}
      <img src={item.icon} alt="" width={24} height={24} /> {item.name}{' '}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove{' '}
        <VisuallyHidden>{item.name}</VisuallyHidden>
      </button>
    </p>
  )
}
