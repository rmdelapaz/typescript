// Task 3: what a part of the screen that loads data can be doing.
// TODO 3: this type allows nonsense (a ready state without data, data while loading). Make it a discriminated union
// on kind, like Lesson 4.1's LoadState<T>: loading (nothing else), failed (a message), ready (the data).
export type LoadState<T> = {
  kind: 'loading' | 'failed' | 'ready'
  data?: T
  message?: string
}

// Task 3: the words for a state: "Loading the cleanups…", "Could not load the cleanups. <message>", or "" when ready
export function statusText(state: LoadState<unknown>, what: string): string {
  throw new Error(`TODO 3: the words for ${state.kind} (${what})`)
}
