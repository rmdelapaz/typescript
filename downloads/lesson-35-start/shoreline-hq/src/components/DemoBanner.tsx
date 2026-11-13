import styles from './DemoBanner.module.css'

// Only in the demo build (Lesson 10.2): say what this version is, and how to try the organizer pages
export function DemoBanner() {
  return (
    <aside aria-label="Demo version" className={styles.banner}>
      <p>
        <strong>Demo version.</strong> The sample data lives in this browser tab: your changes are gone when you
        reload. Sign in as maya.okafor@example.com (organizer) or theo.nakamura@example.com (volunteer) with
        the password shoreline-demo.
      </p>
    </aside>
  )
}
