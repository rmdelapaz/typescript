import { NewEventForm } from '../components/NewEventForm.tsx'
import styles from './Page.module.css'

export function NewEventPage() {
  return (
    <>
      <h1>Plan a cleanup</h1>
      <p className={styles.lead}>
        Fill in the basics. Save it as a draft to finish later, or publish it so volunteers can
        sign up.
      </p>
      <NewEventForm />
    </>
  )
}
