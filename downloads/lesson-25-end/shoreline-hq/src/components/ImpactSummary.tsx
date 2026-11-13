import { useSuspenseQuery } from '@tanstack/react-query'
import { eventImpactQuery } from '../api/queries.ts'
import type { DebrisCategory } from '../api/types.ts'
import { DataList } from './DataList.tsx'

// The API's labels for its debris categories (GET /api/meta lists the same ones)
const debrisLabels: Record<DebrisCategory, string> = {
  'plastic-bottles': 'Plastic bottles',
  'plastic-bags': 'Plastic bags',
  'food-wrappers': 'Food wrappers',
  'bottle-caps': 'Bottle caps',
  'cigarette-butts': 'Cigarette butts',
  'fishing-gear': 'Fishing line and nets',
  glass: 'Glass',
  metal: 'Metal and cans',
  foam: 'Foam pieces',
  other: 'Other',
}

interface ImpactSummaryProps {
  eventId: string
}

// What a completed cleanup took off the beach. Suspends until the report is in the cache.
export function ImpactSummary({ eventId }: ImpactSummaryProps) {
  const { data: report } = useSuspenseQuery(eventImpactQuery(eventId))
  const mostFirst = report.items.toSorted((a, b) => b.count - a.count)

  return (
    <>
      <h2>What the crew collected</h2>
      <p>
        Volunteers: {report.volunteersAttended}. Bags: {report.bags}. Weight: {report.weightKg} kg.
      </p>
      {report.notes !== '' && <p>{report.notes}</p>}
      <h3>Pieces counted</h3>
      <DataList
        items={mostFirst}
        getKey={(item) => item.category}
        layout="plain"
        emptyMessage="Nothing was counted at this cleanup."
        renderItem={(item) => `${debrisLabels[item.category]}: ${item.count}`}
      />
    </>
  )
}
