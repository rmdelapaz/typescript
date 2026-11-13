// Task 2: show one tip at a time, the next one every `intervalMs` milliseconds, starting again after the last.
// TODO 2: a generic Hook: whatever kind of list goes in, an item of that kind comes out (or undefined for an
// empty list). The timer is outside React: start it in an effect, stop it in the cleanup.
export function useRotatingTip(items: readonly unknown[], intervalMs: number): unknown {
  throw new Error(`TODO 2: rotate ${items.length} tips every ${intervalMs} ms`)
}
