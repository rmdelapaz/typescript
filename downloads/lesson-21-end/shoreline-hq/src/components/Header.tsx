import { Link, NavLink } from 'react-router'
import logoUrl from '../assets/logo.svg'
import styles from './Header.module.css'
import { UserMenu } from './UserMenu.tsx'

export function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} to="/">
        <img src={logoUrl} alt="" width={40} height={40} />
        <span>Shoreline Crew HQ</span>
      </Link>
      <nav className={styles.nav} aria-label="Main">
        <ul>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/sites">Sites</NavLink></li>
        </ul>
      </nav>
      <UserMenu />
    </header>
  )
}
