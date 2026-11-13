// Lab 2.2 (reference solution)

export type GearKind = 'gloves' | 'grabber' | 'bucket' | 'vest'

export interface GearItem {
  id: string
  name: string
  kind: GearKind
  size?: 'S' | 'M' | 'L'
  checkedOutTo: string | null
}

export const gear: GearItem[] = [
  { id: 'g01', name: 'Work gloves', kind: 'gloves', size: 'M', checkedOutTo: 'Maya Okafor' },
  { id: 'g02', name: 'Litter grabber', kind: 'grabber', checkedOutTo: null },
  { id: 'g03', name: 'Sorting bucket', kind: 'bucket', checkedOutTo: null },
  { id: 'g04', name: 'Safety vest', kind: 'vest', size: 'L', checkedOutTo: 'Theo Nakamura' },
]

export function holder(item: GearItem): string {
  return item.checkedOutTo ?? 'on the shelf'
}

export function sizeLabel(item: GearItem): string {
  return item.size ?? 'one size'
}

export function stockLine(name: string, left: number | null): string {
  return `${name}: ${left ?? 'not counted yet'} left`
}

export type Checkout =
  | { kind: 'out'; who: string; since: string }
  | { kind: 'returned'; condition: 'good' | 'damaged' }
  | { kind: 'lost' }

export function checkoutLine(checkout: Checkout): string {
  if (checkout.kind === 'out') {
    return `Out with ${checkout.who} since ${checkout.since}`
  }
  if (checkout.kind === 'returned') {
    return checkout.condition === 'good' ? 'Returned: back on the shelf' : 'Returned damaged: to the repair box'
  }
  return 'Lost: write it in the logbook'
}
