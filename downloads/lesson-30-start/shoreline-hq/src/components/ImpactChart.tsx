import type { ImpactTotals } from '../api/types.ts'
import styles from './ImpactChart.module.css'

/** One bar: an item of ImpactTotals' byMonth list */
type MonthTotal = ImpactTotals['byMonth'][number]

interface ImpactChartProps {
  months: MonthTotal[]
}

const monthNames = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
// The drawing is 360 units wide and scales with its card (on a phone too)
const rowHeight = 36
const barStart = 92 // room for the month names on the left
const barSpace = 198 // the longest bar; the rest is room for its label

// "2026-06" → "Jun 2026" (the 1st of the month at local midnight, so it never slips back a day)
function monthLabel(month: string): string {
  return monthNames.format(new Date(`${month}-01T00:00`))
}

// Kilograms collected per month, as horizontal bars. Screen readers get the same numbers as text.
export function ImpactChart({ months }: ImpactChartProps) {
  const heaviest = Math.max(1, ...months.map((month) => month.weightKg))
  const summary = months.map((month) => `${monthLabel(month.month)}: ${month.weightKg} kg`)

  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 360 ${months.length * rowHeight}`}
      role="img"
      aria-label={`Weight collected by month. ${summary.join(', ')}.`}
    >
      {months.map((month, index) => {
        const top = index * rowHeight
        const width = (month.weightKg / heaviest) * barSpace
        return (
          <g key={month.month}>
            <text className={styles.label} x={0} y={top + 23}>
              {monthLabel(month.month)}
            </text>
            <rect className={styles.bar} x={barStart} y={top + 6} width={width} height={24} rx={4} />
            <text className={styles.label} x={barStart + width + 6} y={top + 23}>
              {month.weightKg} kg
            </text>
          </g>
        )
      })}
    </svg>
  )
}
