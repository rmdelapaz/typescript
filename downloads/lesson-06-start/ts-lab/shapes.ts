// Shoreline Crew data shapes (Lesson 2.2): a first draft of the API's types

// Unions of literal types: exactly one of these words
type Terrain = 'sand' | 'rocky' | 'marsh' | 'mixed'
type EventStatus = 'draft' | 'scheduled' | 'completed' | 'cancelled'

interface Site {
  id: string
  name: string
  town: string
  terrain: Terrain
  accessible: boolean
  image: { url: string; alt: string; width: number; height: number }
}

interface CleanupEvent {
  id: string
  title: string
  siteId: string
  status: EventStatus
  startTime: string
  capacity: number
  spotsTaken: number
}

// An event with its site, as the API sends one event; organizers also get the check-in code
interface CleanupEventDetail extends CleanupEvent {
  site: Site
  checkInCode?: string
}

interface Volunteer {
  id: string
  name: string
  phone: string | null
}

// What a screen can be doing: each member has its own "kind"
type LoadState =
  | { kind: 'loading' }
  | { kind: 'failed'; message: string }
  | { kind: 'ready'; events: CleanupEvent[] }

const cove: Site = {
  id: 'driftwood-cove',
  name: 'Driftwood Cove',
  town: 'Port Marisol',
  terrain: 'mixed',
  accessible: false,
  image: {
    url: '/images/sites/driftwood-cove.jpg',
    alt: 'A small curved cove with pale sand and gray driftwood logs along the tide line.',
    width: 1200,
    height: 675,
  },
}
const sites: Site[] = [cove]

const weekendCove: CleanupEventDetail = {
  id: 'e08',
  title: 'Weekend Cove Cleanup',
  siteId: 'driftwood-cove',
  status: 'scheduled',
  startTime: '09:00',
  capacity: 18,
  spotsTaken: 18,
  site: cove,
}

const kayakDraft: CleanupEvent = {
  id: 'e15',
  title: 'Harbor Kayak Cleanup',
  siteId: 'north-jetty',
  status: 'draft',
  startTime: '09:00',
  capacity: 8,
  spotsTaken: 0,
}

const crew: Volunteer[] = [
  { id: 'v02', name: 'Luis Romero', phone: '(831) 555-0102' },
  { id: 'v03', name: 'Hannah Becker', phone: null },
]

function statusLabel(status: EventStatus) {
  switch (status) {
    case 'draft':
      return 'Draft (organizers only)'
    case 'scheduled':
      return 'Scheduled'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
  }
}

function spotsLine(event: CleanupEvent) {
  const left = event.capacity - event.spotsTaken
  return left > 0 ? `${left} spots left` : 'Full: join the waiting list'
}

function siteName(siteId: string) {
  return sites.find((site) => site.id === siteId)?.name ?? 'Unknown site'
}

function checkInLine(event: CleanupEventDetail) {
  return `Check-in code: ${event.checkInCode ?? 'shown to organizers only'}`
}

function contactLine(person: Volunteer) {
  if (person.phone === null) {
    return `${person.name}: no phone on file`
  }
  return `${person.name}: ${person.phone}`
}

function report(state: LoadState) {
  if (state.kind === 'loading') {
    return 'Loading cleanups...'
  }
  if (state.kind === 'failed') {
    return `Could not load cleanups: ${state.message}`
  }
  return `${state.events.length} cleanups loaded`
}

for (const event of [weekendCove, kayakDraft]) {
  const where = siteName(event.siteId)
  console.log(`${event.title} at ${where}: ${statusLabel(event.status)}, ${spotsLine(event)}`)
}
console.log(`${weekendCove.site.name} is ${weekendCove.site.terrain}; ${checkInLine(weekendCove)}`)
for (const person of crew) {
  console.log(contactLine(person))
}
console.log(report({ kind: 'loading' }))
console.log(report({ kind: 'failed', message: 'the API did not answer' }))
console.log(report({ kind: 'ready', events: [weekendCove, kayakDraft] }))
