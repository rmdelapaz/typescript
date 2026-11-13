import { useState, type ReactNode } from 'react'
import { postSignIn, postSignOut, readSession, saveSession, type Session } from '../api/client.ts'
import type { SignInRequest } from '../api/types.ts'
import { AuthContext } from './AuthContext.ts'

interface AuthProviderProps {
  children: ReactNode
}

// Owns the session: the only place that changes it, for React and for the saved copy
export function AuthProvider({ children }: AuthProviderProps) {
  // Start from the saved session, so a page reload keeps you signed in
  const [session, setSession] = useState<Session | null>(readSession)
  const isOrganizer = session?.user.role === 'organizer'

  async function signIn(credentials: SignInRequest) {
    const next = await postSignIn(credentials)
    saveSession(next)
    setSession(next)
  }

  function signOut() {
    // The request takes the token with it as it starts; then this tab forgets the session
    postSignOut().catch((error: unknown) => console.error(error))
    saveSession(null)
    setSession(null)
  }

  return <AuthContext value={{ session, isOrganizer, signIn, signOut }}>{children}</AuthContext>
}
