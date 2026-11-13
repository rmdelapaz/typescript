import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext.ts'

interface AuthProviderProps {
  children: ReactNode
}

// Hands the session to every component, and re-renders them after every sign-in and sign-out
export function AuthProvider({ children }: AuthProviderProps) {
  // TODO R4: the session from src/auth/session.ts with useSyncExternalStore(onSessionChange, readSession),
  // isSetter from its role, and signOut = saveSession(null). For now: nobody is ever signed in.
  return <AuthContext value={{ session: null, isSetter: false, signOut: () => {} }}>{children}</AuthContext>
}
