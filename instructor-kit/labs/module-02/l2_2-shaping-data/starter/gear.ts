// Lab 2.2: the supply shed's gear. Tasks 1 to 3 are in TASKS.md.

// TODO 1: a kind of gear is exactly one of four words: gloves, grabber, bucket, vest
export type GearKind = string

// TODO 1: describe a piece of gear (look at the list below: which properties are always there,
// which one is sometimes missing, which one may be null?)
export interface GearItem {}

export const gear: GearItem[] = [
  { id: 'g01', name: 'Work gloves', kind: 'gloves', size: 'M', checkedOutTo: 'Maya Okafor' },
  { id: 'g02', name: 'Litter grabber', kind: 'grabber', checkedOutTo: null },
  { id: 'g03', name: 'Sorting bucket', kind: 'bucket', checkedOutTo: null },
  { id: 'g04', name: 'Safety vest', kind: 'vest', size: 'L', checkedOutTo: 'Theo Nakamura' },
]

// Task 2: who has it ("on the shelf" when nobody does)
export function holder(item: GearItem): string {
  throw new Error(`TODO 2: who holds ${JSON.stringify(item)}`)
}

// Task 2: the size, or "one size" when the item has none
export function sizeLabel(item: GearItem): string {
  throw new Error(`TODO 2: the size of ${JSON.stringify(item)}`)
}

// Task 2: how many are left on the shelf (0 is a real number)
export function stockLine(name: string, left: number | null): string {
  return `${name}: ${left || 'not counted yet'} left`
}

// Task 3: what happened to a checked-out item
export type Checkout =
  | { kind: 'out'; who: string; since: string }
  | { kind: 'returned'; condition: 'good' | 'damaged' }
  | { kind: 'lost' }

export function checkoutLine(checkout: Checkout): string {
  return `Out with ${checkout.who} since ${checkout.since}`
}
