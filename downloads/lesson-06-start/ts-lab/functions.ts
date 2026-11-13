// Shoreline Crew functions (Lesson 2.3): typed functions, function types and generics

// Copied from shapes.ts: each ts-lab file has its own types until Lesson 2.4 shares them
type EventStatus = 'draft' | 'scheduled' | 'completed' | 'cancelled'

interface CleanupEvent {
  id: string
  title: string
  siteId: string
  status: EventStatus
  startTime: string
  capacity: number
  spotsTaken: number
}

interface Volunteer {
  id: string
  name: string
  phone: string | null
}

const events: CleanupEvent[] = [
  {
    id: 'e08',
    title: 'Weekend Cove Cleanup',
    siteId: 'driftwood-cove',
    status: 'scheduled',
    startTime: '09:00',
    capacity: 18,
    spotsTaken: 18,
  },
  {
    id: 'e09',
    title: 'Boardwalk and Mudflats',
    siteId: 'sandpiper-flats',
    status: 'scheduled',
    startTime: '10:00',
    capacity: 16,
    spotsTaken: 15,
  },
  {
    id: 'e15',
    title: 'Harbor Kayak Cleanup',
    siteId: 'north-jetty',
    status: 'draft',
    startTime: '09:00',
    capacity: 8,
    spotsTaken: 0,
  },
  {
    id: 'e01',
    title: 'Storm Debris Sweep',
    siteId: 'driftwood-cove',
    status: 'completed',
    startTime: '09:00',
    capacity: 20,
    spotsTaken: 20,
  },
]

const crew: Volunteer[] = [
  { id: 'v01', name: 'Maya Okafor', phone: '(831) 555-0101' },
  { id: 'v02', name: 'Luis Romero', phone: '(831) 555-0102' },
  { id: 'v03', name: 'Hannah Becker', phone: null },
  { id: 'v04', name: 'Theo Nakamura', phone: '(831) 555-0104' },
  { id: 'v05', name: 'Amara Diallo', phone: null },
]

// Parameters, defaults and return types

function spotsLeft(event: CleanupEvent): number {
  return Math.max(event.capacity - event.spotsTaken, 0)
}

function pluralize(count: number, word: string, plural = `${word}s`): string {
  return count === 1 ? `1 ${word}` : `${count} ${plural}`
}

interface LineOptions {
  showStatus?: boolean
  prefix?: string
}

function eventLine(
  event: CleanupEvent,
  { showStatus = false, prefix = '-' }: LineOptions = {},
): string {
  const left = spotsLeft(event)
  const spots = left === 0 ? 'full' : `${pluralize(left, 'spot')} left`
  const line = `${prefix} ${event.title}: ${spots}`
  return showStatus ? `${line} [${event.status}]` : line
}

console.log('All cleanups:')
for (const event of events) {
  console.log(eventLine(event))
}
console.log(pluralize(1, 'bag'), '/', pluralize(3, 'bag'), '/', pluralize(2, 'person', 'people'))

// Function types

// Any function that turns a cleanup into a line of text
type EventFormatter = (event: CleanupEvent) => string

const titleOnly: EventFormatter = (event) => `- ${event.title}`
const withStatus: EventFormatter = (event) => eventLine(event, { showStatus: true })

function printAll(list: CleanupEvent[], format: EventFormatter): void {
  for (const event of list) {
    console.log(format(event))
  }
}

function isOpen(event: CleanupEvent): boolean {
  return event.status === 'scheduled' && spotsLeft(event) > 0
}

console.log('Titles only:')
printAll(events, titleOnly)
console.log('Open for sign-ups:')
printAll(events.filter(isOpen), withStatus)

// Generics: one function for any type

function first<T>(items: T[]): T | undefined {
  return items[0]
}

// T can be any type that has at least an id that is a string
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}

function groupBy<T, K>(items: T[], keyOf: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>()
  for (const item of items) {
    const key = keyOf(item)
    const group = groups.get(key)
    if (group === undefined) {
      groups.set(key, [item])
    } else {
      group.push(item)
    }
  }
  return groups
}

// The API's paging information, and a page of anything
interface PageInfo {
  page: number
  perPage: number
  total: number
  totalPages: number
}

interface Page<T> {
  items: T[]
  page: PageInfo
}

function paginate<T>(items: T[], page = 1, perPage = 10): Page<T> {
  const start = (page - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    page: { page, perPage, total: items.length, totalPages: Math.ceil(items.length / perPage) },
  }
}

console.log(`First cleanup: ${first(events)?.title ?? 'none yet'}`)
console.log(`v03 is ${findById(crew, 'v03')?.name ?? 'nobody'}`)
console.log(`e99 is ${findById(events, 'e99')?.title ?? 'not a cleanup'}`)

const byStatus = groupBy(events, (event) => event.status)
for (const [status, group] of byStatus) {
  console.log(`${status}: ${pluralize(group.length, 'cleanup')}`)
}

const crewPage = paginate(crew, 2, 2)
const names = crewPage.items.map((person) => person.name).join(', ')
console.log(`Crew page ${crewPage.page.page} of ${crewPage.page.totalPages}: ${names}`)
