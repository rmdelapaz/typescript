import { getImpact } from '../api/client.ts'
import type { DebrisCategory } from '../api/types.ts'
import { useApi } from '../hooks/useApi.ts'
import { DataList } from './DataList.tsx'
import { LoadStatus } from './LoadStatus.tsx'

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

// What a completed cleanup took off the beach, from its impact report
export function ImpactSummary({ eventId }: ImpactSummaryProps) {
  const impact = useApi(`/events/${eventId}/impact`, (signal) => getImpact(eventId, signal))

  if (impact.state.kind !== 'ready') {
    return <LoadStatus state={impact.state} what="the impact report" onRetry={impact.reload} />
  }
  const report = impact.state.data
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
