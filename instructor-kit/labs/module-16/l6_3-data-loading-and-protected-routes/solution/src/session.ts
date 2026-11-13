import type { Session } from './types.ts'

// The session store (like the HQ's in Lesson 6.3, without sessionStorage): loaders, actions and components all read
// it, and anyone can ask to be told when it changes. Do not edit.
let current: Session | null = null
const listeners = new Set<() => void>()

/** The current session, or null when nobody is signed in (the same object until it changes) */
export function readSession(): Session | null {
  return current
}

/** Save (or with null, forget) the session, and tell everyone who listens */
export function saveSession(session: Session | null): void {
  current = session
  for (const listener of listeners) {
    listener()
  }
}

/** Call listener after every sign-in and sign-out. Returns a function that stops listening. */
export function onSessionChange(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
