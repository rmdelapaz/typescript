import { useSuspenseQuery } from '@tanstack/react-query'
import { impactTotalsQuery } from '../api/queries.ts'
import type { ImpactTotals } from '../api/types.ts'
import { Button } from '../components/Button.tsx'
import { Card } from '../components/Card.tsx'
import { ImpactChart } from '../components/ImpactChart.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { downloadCsv, toCsv, type CsvColumn } from '../utils/csv.ts'
import styles from './ImpactPage.module.css'
import pageStyles from './Page.module.css'

// The columns of the monthly export: the row type comes from the API's ImpactTotals
const monthColumns: CsvColumn<ImpactTotals['byMonth'][number]>[] = [
  { heading: 'Month', value: (month) => month.month },
  { heading: 'Cleanups', value: (month) => month.events },
  { heading: 'Weight (kg)', value: (month) => month.weightKg },
]

// The crew's dashboard: what every completed cleanup adds up to (impactLoader filled the cache)
export function ImpactPage() {
  useDocumentTitle('Our impact')
  const { data: impact } = useSuspenseQuery(impactTotalsQuery())

  function downloadMonths() {
    downloadCsv('shoreline-impact-by-month.csv', toCsv(impact.byMonth, monthColumns))
  }

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
        <Button onClick={downloadMonths}>Download as CSV</Button>
      </Card>
    </>
  )
}
