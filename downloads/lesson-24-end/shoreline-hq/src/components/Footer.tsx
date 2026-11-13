import styles from './Footer.module.css'

// Read once, when the app loads: rendering itself stays pure
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Shoreline Crew HQ: the organizers' side of the crew</p>
      <p>&copy; {year} Shoreline Crew · Port Marisol, Calder Bay and Seal Rock</p>
    </footer>
  )
}
