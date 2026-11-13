import { Link } from 'react-router'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

// The router's last route, path '*': any address the app does not know ends up here
export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <>
      <h1>Page not found</h1>
      <p className={styles.lead}>There is no page at this address.</p>
      <p>
        Check the address for a typo, or go to the <Link to="/">home page</Link>.
      </p>
    </>
  )
}
