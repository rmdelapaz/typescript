import logoUrl from '../assets/logo.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/">
        <img src={logoUrl} alt="" width={40} height={40} />
        <span>Shoreline Crew HQ</span>
      </a>
      <nav className={styles.nav} aria-label="Main">
        <ul>
          <li><a href="/events">Events</a></li>
          <li><a href="/sites">Sites</a></li>
          <li><a href="/volunteers">Volunteers</a></li>
          <li><a href="/impact">Impact</a></li>
        </ul>
      </nav>
    </header>
  )
}
