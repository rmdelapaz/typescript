import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { itemQuery } from '../api/queries.ts'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { itemStatusLabels } from '../utils/labels.ts'
import styles from './Page.module.css'

// One item at /items/:itemId (Lesson 6.2: typed params)
export function ItemPage() {
  const { itemId } = useParams<'itemId'>()
  if (itemId === undefined) {
    throw new Error('ItemPage needs an :itemId in its route')
  }
  const item = useQuery(itemQuery(itemId))
  useDocumentTitle(item.data?.name ?? 'Item')

  return (
    <>
      <p>
        <Link to="/">← All items</Link>
      </p>
      {item.isSuccess ? (
        <article>
          <h1>{item.data.name}</h1>
          <p className={styles.lead}>{itemStatusLabels[item.data.status]}</p>
          <p>{item.data.notes ?? 'No notes yet.'}</p>
        </article>
      ) : (
        <LoadStatus query={item} what="this item" />
      )}
    </>
  )
}
