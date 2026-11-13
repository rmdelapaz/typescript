// The signed-in session lives here, outside React, so the router's loaders and actions can read and change it
// too (Lesson 6.3). AuthProvider hands it to the components and re-renders them when it changes.
import type { Session } from '../api/types.ts'

// sessionStorage: kept when the page reloads, gone when the tab closes, never shared with other tabs
const sessionKey = 'basalt-peak-session'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// What sessionStorage holds, checked: anyone can edit it in the browser's tools, so it is unknown until then
function loadSession(): Session | null {
  const saved = sessionStorage.getItem(sessionKey)
  if (saved === null) return null
  try {
    const value: unknown = JSON.parse(saved)
    if (
      isRecord(value) &&
      typeof value.token === 'string' &&
      isRecord(value.user) &&
      typeof value.user.id === 'string' &&
      typeof value.user.name === 'string' &&
      (value.user.role === 'setter' || value.user.role === 'staff')
    ) {
      return { token: value.token, user: { id: value.user.id, name: value.user.name, role: value.user.role } }
    }
    return null
  } catch {
    return null
  }
}

let current = loadSession()
const listeners = new Set<() => void>()

/** The current session, or null when nobody is signed in */
export function readSession(): Session | null {
  return current
}

/** Save (or with null, forget) the session, and tell everyone who listens */
export function saveSession(session: Session | null): void {
  if (session === null) {
    sessionStorage.removeItem(sessionKey)
  } else {
    sessionStorage.setItem(sessionKey, JSON.stringify(session))
  }
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
