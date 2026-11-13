// Advanced types you will meet (Lesson 11.2): read them in libraries, write them where they pay for themselves

// The real contract the HQ and the phone app share, straight from the API folder
import type { EventStatus, ImpactTotals } from '../shoreline-api/core/types.ts'

// 1. satisfies: checked against a type, but the value keeps its own, more precise type
const pageTitles = {
  events: 'Cleanup events',
  sites: 'Beach sites',
  impact: 'Impact',
} satisfies Record<string, string>

type PageName = keyof typeof pageTitles

function title(page: PageName) {
  return `${pageTitles[page]} · Shoreline Crew HQ`
}

const statusTones = {
  draft: 'neutral',
  scheduled: 'info',
  completed: 'success',
  cancelled: 'danger',
} satisfies Record<EventStatus, 'info' | 'success' | 'neutral' | 'danger'>

console.log(title('impact'))
console.log(`A scheduled cleanup gets the ${statusTones.scheduled} badge`)

// 2. Mapped types: a new type made from another type's keys
interface Settings {
  theme: 'system' | 'light' | 'dark'
  density: 'roomy' | 'compact'
}

type Setters<T> = {
  [K in keyof T & string as `set${Capitalize<K>}`]: (value: T[K]) => void
}

type SettingsStore = Settings & Setters<Settings>

const store: SettingsStore = {
  theme: 'system',
  density: 'roomy',
  setTheme: (theme) => console.log(`Theme is now ${theme}`),
  setDensity: (density) => console.log(`Lists are now ${density}`),
}

store.setDensity('compact')

// Template literal types: strings that must follow a pattern
type Collection = 'events' | 'sites' | 'volunteers'
type ApiPath = `/api/${Collection}` | `/api/${Collection}/${string}`

const sitesPath: ApiPath = '/api/sites'
console.log(`The sites live at ${sitesPath}`)

// 3. Conditional types with infer: take a type apart
type ItemOf<T> = T extends readonly (infer Item)[] ? Item : never

type MonthTotal = ItemOf<ImpactTotals['byMonth']>

function monthLine(total: MonthTotal) {
  return `${total.month}: ${total.events} cleanups, ${total.weightKg} kg`
}

console.log(monthLine({ month: 'this month', events: 2, weightKg: 61.5 }))

type ParamName<Path extends string> = Path extends `${string}:${infer Name}/${infer Rest}`
  ? Name | ParamName<Rest>
  : Path extends `${string}:${infer Name}`
    ? Name
    : never

type Params<Path extends string> = Record<ParamName<Path>, string>

const editParams: Params<'/events/:eventId/edit'> = { eventId: 'e08' }
const signupParams: Params<'/events/:eventId/signups/:signupId'> = { eventId: 'e08', signupId: 's101' }

console.log(editParams, signupParams)

// 4. Branded types: two kinds of string that TypeScript keeps apart
type EventId = string & { readonly __brand: 'EventId' }
type VolunteerId = string & { readonly __brand: 'VolunteerId' }

function toEventId(id: string): EventId {
  if (!/^e\d+$/.test(id)) {
    throw new Error(`Not a cleanup id: ${id}`)
  }
  return id as EventId
}

function toVolunteerId(id: string): VolunteerId {
  if (!/^v\d+$/.test(id)) {
    throw new Error(`Not a volunteer id: ${id}`)
  }
  return id as VolunteerId
}

function eventLink(id: EventId): ApiPath {
  return `/api/events/${id}`
}

const cove = toEventId('e08')
const theo = toVolunteerId('v04')

console.log(`${eventLink(cove)} (and ${theo} is a volunteer)`)
