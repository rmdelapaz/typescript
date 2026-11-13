import { createContext, useContext } from 'react'
import type { Session } from '../api/client.ts'

/** What every component can ask about sign-in, wherever it sits in the tree */
export interface AuthValue {
  /** null while nobody is signed in */
  session: Session | null
  /** true when an organizer is signed in */
  isOrganizer: boolean
  signOut: () => void
}

// undefined is the value outside an AuthProvider: a mistake that useAuth() reports at once
export const AuthContext = createContext<AuthValue | undefined>(undefined)

/** The sign-in state. Only works inside <AuthProvider>. */
export function useAuth(): AuthValue {
  const auth = useContext(AuthContext)
  if (auth === undefined) {
    throw new Error('useAuth() must be used inside <AuthProvider>')
  }
  return auth
}
