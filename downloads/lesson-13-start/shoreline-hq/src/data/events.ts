import type { CleanupEvent } from '../api/types.ts'

// The public cleanups, copied from GET /api/events?perPage=50 (Lesson 3.3).
// Lesson 4.1 fetches them from the API instead, and this file goes away.
export const events: CleanupEvent[] = [
  {
    "id": "e01",
    "title": "Storm Debris Sweep",
    "siteId": "driftwood-cove",
    "status": "completed",
    "date": "2026-06-15",
    "startTime": "09:00",
    "endTime": "12:00",
    "capacity": 20,
    "spotsTaken": 10,
    "meetingPoint": "Top of the Cove Lane stairs",
    "description": "We work the tide line from the stairs to the north rocks. Bring a water bottle; we bring the rest.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v02",
    "createdAt": "2026-05-25T17:00:00.000Z",
    "updatedAt": "2026-06-16T18:00:00.000Z"
  },
  {
    "id": "e02",
    "title": "Jetty Fishing Line Roundup",
    "siteId": "north-jetty",
    "status": "completed",
    "date": "2026-07-13",
    "startTime": "08:30",
    "endTime": "11:00",
    "capacity": 12,
    "spotsTaken": 8,
    "meetingPoint": "Harbor lot B, by the bait shop",
    "description": "Careful work on the rocks: we cut and bag fishing line and collect lures and weights.",
    "suppliesProvided": [
      "Gloves",
      "Bags",
      "Line cutters"
    ],
    "leadOrganizerId": "v02",
    "createdAt": "2026-06-22T17:00:00.000Z",
    "updatedAt": "2026-07-14T18:00:00.000Z"
  },
  {
    "id": "e03",
    "title": "Marsh Boardwalk Cleanup",
    "siteId": "sandpiper-flats",
    "status": "completed",
    "date": "2026-08-09",
    "startTime": "10:00",
    "endTime": "12:30",
    "capacity": 15,
    "spotsTaken": 9,
    "meetingPoint": "Visitor center front porch",
    "description": "A quiet cleanup along the boardwalk and marsh edge. Good for first-timers and families.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v03",
    "createdAt": "2026-07-19T17:00:00.000Z",
    "updatedAt": "2026-08-10T18:00:00.000Z"
  },
  {
    "id": "e04",
    "title": "Pelican Point Beach Sweep",
    "siteId": "pelican-point",
    "status": "completed",
    "date": "2026-09-07",
    "startTime": "09:00",
    "endTime": "12:00",
    "capacity": 30,
    "spotsTaken": 18,
    "meetingPoint": "Lifeguard tower 3",
    "description": "A classic beach sweep in teams of four. Kids are welcome with an adult.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v01",
    "createdAt": "2026-08-17T17:00:00.000Z",
    "updatedAt": "2026-09-08T18:00:00.000Z"
  },
  {
    "id": "e05",
    "title": "Creek Mouth After the Rains",
    "siteId": "otter-creek",
    "status": "cancelled",
    "date": "2026-09-28",
    "startTime": "09:30",
    "endTime": "12:00",
    "capacity": 15,
    "spotsTaken": 0,
    "meetingPoint": "Gravel pull-out on Highway 1",
    "description": "We clear trash caught in the willows and along the creek banks. Expect mud.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v03",
    "createdAt": "2026-09-07T17:00:00.000Z",
    "updatedAt": "2026-09-29T18:00:00.000Z"
  },
  {
    "id": "e06",
    "title": "Long Strand Big Day",
    "siteId": "long-strand",
    "status": "completed",
    "date": "2026-10-12",
    "startTime": "08:00",
    "endTime": "13:00",
    "capacity": 60,
    "spotsTaken": 14,
    "meetingPoint": "Main lot information board",
    "description": "Our largest cleanup: teams spread out along three miles of beach and dunes.",
    "suppliesProvided": [
      "Gloves",
      "Bags",
      "Water and snacks"
    ],
    "leadOrganizerId": "v01",
    "createdAt": "2026-09-21T17:00:00.000Z",
    "updatedAt": "2026-10-13T18:00:00.000Z"
  },
  {
    "id": "e07",
    "title": "Sunset Stairs Cleanup",
    "siteId": "pelican-point",
    "status": "completed",
    "date": "2026-10-31",
    "startTime": "16:30",
    "endTime": "18:30",
    "capacity": 20,
    "spotsTaken": 9,
    "meetingPoint": "Lifeguard tower 3",
    "description": "A classic beach sweep in teams of four. Kids are welcome with an adult.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v02",
    "createdAt": "2026-10-10T17:00:00.000Z",
    "updatedAt": "2026-11-01T18:00:00.000Z"
  },
  {
    "id": "e17",
    "title": "Tide Pool Morning Cleanup",
    "siteId": "otter-creek",
    "status": "scheduled",
    "date": "2026-11-12",
    "startTime": "08:00",
    "endTime": "10:30",
    "capacity": 12,
    "spotsTaken": 7,
    "meetingPoint": "Gravel pull-out on Highway 1",
    "description": "We clear trash caught in the willows and along the creek banks. Expect mud.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v03",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e08",
    "title": "Weekend Cove Cleanup",
    "siteId": "driftwood-cove",
    "status": "scheduled",
    "date": "2026-11-15",
    "startTime": "09:00",
    "endTime": "11:30",
    "capacity": 18,
    "spotsTaken": 18,
    "meetingPoint": "Top of the Cove Lane stairs",
    "description": "We work the tide line from the stairs to the north rocks. Bring a water bottle; we bring the rest.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v02",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e09",
    "title": "Boardwalk and Mudflats",
    "siteId": "sandpiper-flats",
    "status": "scheduled",
    "date": "2026-11-21",
    "startTime": "10:00",
    "endTime": "12:30",
    "capacity": 16,
    "spotsTaken": 7,
    "meetingPoint": "Visitor center front porch",
    "description": "A quiet cleanup along the boardwalk and marsh edge. Good for first-timers and families.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v03",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e10",
    "title": "Family Beach Morning",
    "siteId": "pelican-point",
    "status": "scheduled",
    "date": "2026-11-28",
    "startTime": "09:00",
    "endTime": "11:00",
    "capacity": 40,
    "spotsTaken": 16,
    "meetingPoint": "Lifeguard tower 3",
    "description": "A classic beach sweep in teams of four. Kids are welcome with an adult.",
    "suppliesProvided": [
      "Gloves",
      "Bags",
      "Water and snacks"
    ],
    "leadOrganizerId": "v01",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e11",
    "title": "Jetty Rocks Deep Clean",
    "siteId": "north-jetty",
    "status": "scheduled",
    "date": "2026-12-05",
    "startTime": "08:30",
    "endTime": "11:30",
    "capacity": 10,
    "spotsTaken": 9,
    "meetingPoint": "Harbor lot B, by the bait shop",
    "description": "Careful work on the rocks: we cut and bag fishing line and collect lures and weights.",
    "suppliesProvided": [
      "Gloves",
      "Bags",
      "Line cutters"
    ],
    "leadOrganizerId": "v02",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e12",
    "title": "Creek Mouth Willows",
    "siteId": "otter-creek",
    "status": "scheduled",
    "date": "2026-12-12",
    "startTime": "09:30",
    "endTime": "12:00",
    "capacity": 14,
    "spotsTaken": 10,
    "meetingPoint": "Gravel pull-out on Highway 1",
    "description": "We clear trash caught in the willows and along the creek banks. Expect mud.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v03",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e13",
    "title": "Long Strand Coastal Cleanup Day",
    "siteId": "long-strand",
    "status": "scheduled",
    "date": "2026-12-26",
    "startTime": "08:00",
    "endTime": "13:00",
    "capacity": 80,
    "spotsTaken": 21,
    "meetingPoint": "Main lot information board",
    "description": "Our largest cleanup: teams spread out along three miles of beach and dunes.",
    "suppliesProvided": [
      "Gloves",
      "Bags",
      "Water and snacks"
    ],
    "leadOrganizerId": "v01",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  },
  {
    "id": "e14",
    "title": "Night Heron Walk and Clean",
    "siteId": "sandpiper-flats",
    "status": "scheduled",
    "date": "2027-01-09",
    "startTime": "17:00",
    "endTime": "19:00",
    "capacity": 12,
    "spotsTaken": 9,
    "meetingPoint": "Visitor center front porch",
    "description": "A quiet cleanup along the boardwalk and marsh edge. Good for first-timers and families.",
    "suppliesProvided": [
      "Gloves",
      "Bags"
    ],
    "leadOrganizerId": "v03",
    "createdAt": "2026-10-22T17:00:00.000Z",
    "updatedAt": "2026-10-24T18:00:00.000Z"
  }
]
