// What a screen that loads data can be doing (the LoadState of Lesson 2.2, for any kind of data)
export type LoadState<T> =
  | { kind: 'loading' }
  | { kind: 'failed'; message: string }
  | { kind: 'ready'; data: T }
