// Task 2: works with a mouse. Make it work with a keyboard and a screen reader too (npm run lint helps).
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
      <img src={item.icon} width={24} height={24} /> {item.name}{' '}
      <span onClick={() => onRemove(item.id)}>Remove</span>
    </p>
  )
}
