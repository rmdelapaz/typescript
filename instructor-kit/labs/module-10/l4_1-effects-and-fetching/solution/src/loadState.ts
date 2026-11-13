// Task 3: what a part of the screen that loads data can be doing (Lesson 4.1's LoadState<T>)
export type LoadState<T> =
  | { kind: 'loading' }
  | { kind: 'failed'; message: string }
  | { kind: 'ready'; data: T }

// Task 3: the words for a state; a ready state shows its data instead
export function statusText(state: LoadState<unknown>, what: string): string {
  if (state.kind === 'loading') return `Loading ${what}…`
  if (state.kind === 'failed') return `Could not load ${what}. ${state.message}`
  return ''
}
