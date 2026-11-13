import type { Role } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import styles from './UserMenu.module.css'

const roleLabels: Record<Role, string> = {
  organizer: 'Organizer',
  volunteer: 'Volunteer',
}

// The header's corner: who is signed in, or a way to sign in
export function UserMenu() {
  const { session, signOut } = useAuth()

  if (session === null) {
    return (
      <a className={styles.link} href="/sign-in">
        Sign in
      </a>
    )
  }
  return (
    <div className={styles.menu}>
      <span>
        {session.user.name} ({roleLabels[session.user.role]})
      </span>
      <button type="button" className={styles.signOut} onClick={signOut}>
        Sign out
      </button>
    </div>
  )
}
