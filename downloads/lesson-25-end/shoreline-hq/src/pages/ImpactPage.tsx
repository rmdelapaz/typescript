import { useSuspenseQuery } from '@tanstack/react-query'
import { impactTotalsQuery } from '../api/queries.ts'
import { Card } from '../components/Card.tsx'
import { ImpactChart } from '../components/ImpactChart.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './ImpactPage.module.css'
import pageStyles from './Page.module.css'

// The crew's dashboard: what every completed cleanup adds up to (impactLoader filled the cache)
export function ImpactPage() {
  useDocumentTitle('Our impact')
  const { data: impact } = useSuspenseQuery(impactTotalsQuery())

  return (
    <>
      <h1>Our impact</h1>
      <p className={pageStyles.lead}>Everything the crew has taken off the beaches so far.</p>
      <dl className={styles.totals}>
        <div>
          <dt>Cleanups</dt>
          <dd>{impact.events}</dd>
        </div>
        <div>
          <dt>Volunteers</dt>
          <dd>{impact.volunteersAttended}</dd>
        </div>
        <div>
          <dt>Volunteer hours</dt>
          <dd>{impact.volunteerHours}</dd>
        </div>
        <div>
          <dt>Bags</dt>
          <dd>{impact.bags}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>{impact.weightKg} kg</dd>
        </div>
      </dl>
      <Card title="Weight collected by month">
        <ImpactChart months={impact.byMonth} />
      </Card>
    </>
  )
}
