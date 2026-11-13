import { useSyncExternalStore, type ReactNode } from 'react'
import { onSessionChange, postSignOut, readSession, saveSession } from '../api/client.ts'
import { AuthContext } from './AuthContext.ts'

interface AuthProviderProps {
  children: ReactNode
}

// Hands the session to every component. The session itself lives in client.ts, where the
// router's loaders and actions can reach it; React re-renders whenever it changes.
export function AuthProvider({ children }: AuthProviderProps) {
  const session = useSyncExternalStore(onSessionChange, readSession)
  const isOrganizer = session?.user.role === 'organizer'

  function signOut() {
    // The request takes the token with it as it starts; then this tab forgets the session
    postSignOut().catch((error: unknown) => console.error(error))
    saveSession(null)
  }

  return <AuthContext value={{ session, isOrganizer, signOut }}>{children}</AuthContext>
}
