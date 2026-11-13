import { appName } from '../config.ts'
import styles from './DemoBanner.module.css'

// Only in the demo (Lesson 10.2): say what this version is. Add sample accounts here if your app has sign-in.
export function DemoBanner() {
  return (
    <aside aria-label="Demo version" className={styles.banner}>
      <p>
        <strong>Demo version of {appName}.</strong> The sample data lives in this browser tab: your changes are
        gone when you reload.
      </p>
    </aside>
  )
}
