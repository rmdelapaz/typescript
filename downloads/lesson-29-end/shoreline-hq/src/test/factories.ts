// Sample data for tests: complete, correctly typed objects. A test passes only the parts it is about.
import type { Session } from '../api/client.ts'
import type { CleanupEvent, Site } from '../api/types.ts'

/** A scheduled cleanup with 12 spots, 5 of them taken */
export function makeEvent(changes: Partial<CleanupEvent> = {}): CleanupEvent {
  return {
    id: 'e17',
    title: 'Tide Pool Morning Cleanup',
    siteId: 'otter-creek',
    status: 'scheduled',
    date: '2026-07-04',
    startTime: '08:00',
    endTime: '10:30',
    capacity: 12,
    spotsTaken: 5,
    meetingPoint: 'Gravel pull-out on Highway 1',
    description: 'We clear trash caught in the willows and along the creek banks. Expect mud.',
    suppliesProvided: ['gloves', 'bags'],
    leadOrganizerId: 'v03',
    createdAt: '2026-06-01T16:00:00.000Z',
    updatedAt: '2026-06-01T16:00:00.000Z',
    ...changes,
  }
}

/** Otter Creek Mouth, one of the six beach sites */
export function makeSite(changes: Partial<Site> = {}): Site {
  return {
    id: 'otter-creek',
    name: 'Otter Creek Mouth',
    town: 'Seal Rock',
    terrain: 'mixed',
    accessible: false,
    latitude: 36.979,
    longitude: -122.1183,
    parking: 'Gravel pull-out on Highway 1 (12 spaces).',
    description: 'Where the creek meets the ocean.',
    image: {
      url: 'http://localhost:4000/images/sites/otter-creek.jpg',
      alt: 'A creek flowing out of green willows across the beach into the ocean, with low hills behind.',
      width: 1200,
      height: 675,
    },
    ...changes,
  }
}

/** Maya, signed in as an organizer */
export const organizer: Session = {
  token: 'test-organizer',
  user: { id: 'v01', name: 'Maya Okafor', email: 'maya.okafor@example.com', role: 'organizer' },
}

/** Theo, signed in as a volunteer */
export const volunteer: Session = {
  token: 'test-volunteer',
  user: { id: 'v04', name: 'Theo Nakamura', email: 'theo.nakamura@example.com', role: 'volunteer' },
}
