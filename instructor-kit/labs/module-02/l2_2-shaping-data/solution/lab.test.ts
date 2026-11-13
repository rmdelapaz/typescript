// Tests (do not edit): npm test runs them, npm run check type-checks them with your code.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { checkoutLine, gear, holder, sizeLabel, stockLine, type GearItem, type GearKind } from './gear.ts'

const gloves = gear.find((item) => item.id === 'g01')
const grabber = gear.find((item) => item.id === 'g02')

test('Task 1: four items in the shed', () => {
  assert.equal(gear.length, 4)
})

test('Task 2: who holds it', () => {
  assert.equal(holder(gloves!), 'Maya Okafor')
  assert.equal(holder(grabber!), 'on the shelf')
})

test('Task 2: the size, or one size', () => {
  assert.equal(sizeLabel(gloves!), 'M')
  assert.equal(sizeLabel(grabber!), 'one size')
})

test('Task 2: zero is a real count', () => {
  assert.equal(stockLine('Litter grabber', 3), 'Litter grabber: 3 left')
  assert.equal(stockLine('Litter grabber', 0), 'Litter grabber: 0 left')
  assert.equal(stockLine('Litter grabber', null), 'Litter grabber: not counted yet left')
})

test('Task 3: every kind of checkout', () => {
  assert.equal(checkoutLine({ kind: 'out', who: 'Maya Okafor', since: '08:30' }), 'Out with Maya Okafor since 08:30')
  assert.equal(checkoutLine({ kind: 'returned', condition: 'good' }), 'Returned: back on the shelf')
  assert.equal(checkoutLine({ kind: 'returned', condition: 'damaged' }), 'Returned damaged: to the repair box')
  assert.equal(checkoutLine({ kind: 'lost' }), 'Lost: write it in the logbook')
})

// Task 1 is done when npm run check accepts every line below. Each @ts-expect-error EXPECTS an error:
// @ts-expect-error: a shovel is not one of the four kinds
const shovel: GearKind = 'shovel'
// @ts-expect-error: a size is S, M or L
const huge: GearItem = { id: 'g05', name: 'Rain jacket', kind: 'vest', size: 'XL', checkedOutTo: null }
// @ts-expect-error: the size may be missing, so it is not always a string
const size: string = gear[0]!.size
const ok: GearItem = { id: 'g06', name: 'Spare grabber', kind: 'grabber', checkedOutTo: null }
void [shovel, huge, size, ok]
