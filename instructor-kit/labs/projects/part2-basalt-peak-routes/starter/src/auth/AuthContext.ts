import { createContext, useContext } from 'react'
import type { Session } from '../api/types.ts'

/** What every component can ask about sign-in, wherever it sits in the tree */
export interface AuthValue {
  /** null while nobody is signed in */
  session: Session | null
  /** true when a setter is signed in: only setters log routes */
  isSetter: boolean
  signOut: () => void
}

// undefined is the value outside an AuthProvider: a mistake that useAuth() reports at once
export const AuthContext = createContext<AuthValue | undefined>(undefined)

/** Until AuthProvider is written: nobody is signed in */
const notWrittenYet: AuthValue = { session: null, isSetter: false, signOut: () => {} }

/** The sign-in state. Only works inside <AuthProvider>. */
export function useAuth(): AuthValue {
  const auth = useContext(AuthContext)
  // TODO R4: outside <AuthProvider>, auth is undefined: throw an Error that says so
  // ('useAuth() must be used inside <AuthProvider>') instead of pretending nobody is signed in
  return auth ?? notWrittenYet
}
