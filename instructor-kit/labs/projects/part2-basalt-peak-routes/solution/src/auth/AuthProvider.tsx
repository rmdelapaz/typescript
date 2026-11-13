import { useSyncExternalStore, type ReactNode } from 'react'
import { AuthContext } from './AuthContext.ts'
import { onSessionChange, readSession, saveSession } from './session.ts'

interface AuthProviderProps {
  children: ReactNode
}

// Hands the session to every component, and re-renders them after every sign-in and sign-out
export function AuthProvider({ children }: AuthProviderProps) {
  const session = useSyncExternalStore(onSessionChange, readSession)
  const isSetter = session?.user.role === 'setter'

  function signOut() {
    saveSession(null)
  }

  return <AuthContext value={{ session, isSetter, signOut }}>{children}</AuthContext>
}
