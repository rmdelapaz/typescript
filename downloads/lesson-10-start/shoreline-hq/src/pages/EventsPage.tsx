import { EventList } from '../components/EventList.tsx'
import { events } from '../data/events.ts'

export function EventsPage() {
  const upcoming = events.filter((event) => event.status === 'scheduled')
  const drafts = events.filter((event) => event.status === 'draft')
  const past = events
    .filter((event) => event.status === 'completed' || event.status === 'cancelled')
    .toReversed()

  return (
    <>
      <h1>Cleanup events</h1>
      <p className="lead">
        {upcoming.length} coming up, {past.length} in the log.
      </p>
      <h2>Coming up</h2>
      <EventList events={upcoming} emptyMessage="Nothing scheduled yet." />
      <h2>Drafts</h2>
      <EventList events={drafts} emptyMessage="No drafts waiting to be published." />
      <h2>Past cleanups</h2>
      <EventList events={past} emptyMessage="No cleanups in the log yet." />
    </>
  )
}
