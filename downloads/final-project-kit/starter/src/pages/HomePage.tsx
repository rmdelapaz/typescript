import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { itemsQuery } from '../api/queries.ts'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { appName } from '../config.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { itemStatusLabels } from '../utils/labels.ts'
import styles from './Page.module.css'

// The list page: loading, error, empty and ready, each with words people understand (Lesson 4.1)
export function HomePage() {
  useDocumentTitle('Items')
  const items = useQuery(itemsQuery())

  return (
    <>
      <h1>{appName}</h1>
      <p className={styles.lead}>Every item, newest last.</p>
      {items.isSuccess ? (
        items.data.length === 0 ? (
          <p>No items yet. <Link to="/items/new">Add the first one</Link>.</p>
        ) : (
          <ul className={styles.list}>
            {items.data.map((item) => (
              <li key={item.id} className={styles.card}>
                <h2>
                  <Link to={`/items/${item.id}`}>{item.name}</Link>
                </h2>
                <p className={styles.muted}>{itemStatusLabels[item.status]}</p>
              </li>
            ))}
          </ul>
        )
      ) : (
        <LoadStatus query={items} what="the items" />
      )}
    </>
  )
}
