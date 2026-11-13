import { Link, useSearchParams } from 'react-router'
import type { PageInfo } from '../api/types.ts'
import { withParam } from '../utils/searchParams.ts'
import styles from './Pagination.module.css'

interface PaginationProps {
  page: PageInfo
  /** Names the navigation landmark: "Pages of volunteers" */
  label: string
}

// Previous and Next are links to the same address with another ?page=, so each page can be shared
export function Pagination({ page, label }: PaginationProps) {
  const [searchParams] = useSearchParams()

  if (page.totalPages <= 1) return null

  // Page 1 is the default: it needs no ?page= at all
  function linkTo(pageNumber: number) {
    const value = pageNumber === 1 ? '' : String(pageNumber)
    return { search: withParam(searchParams, 'page', value).toString() }
  }

  return (
    <nav className={styles.pagination} aria-label={label}>
      {page.page > 1 && <Link to={linkTo(page.page - 1)}>← Previous page</Link>}
      <span>
        Page {page.page} of {page.totalPages}
      </span>
      {page.page < page.totalPages && <Link to={linkTo(page.page + 1)}>Next page →</Link>}
    </nav>
  )
}
