import type { ImpactReport } from '../api/types.ts'

// The impact report of a completed cleanup, saved from GET /api/events/e01/impact.
export const report: ImpactReport = {
  "eventId": "e01",
  "volunteersAttended": 10,
  "bags": 5,
  "weightKg": 18.5,
  "items": [
    {
      "category": "plastic-bottles",
      "count": 66
    },
    {
      "category": "plastic-bags",
      "count": 61
    },
    {
      "category": "food-wrappers",
      "count": 59
    },
    {
      "category": "bottle-caps",
      "count": 52
    },
    {
      "category": "cigarette-butts",
      "count": 241
    },
    {
      "category": "fishing-gear",
      "count": 50
    },
    {
      "category": "glass",
      "count": 76
    },
    {
      "category": "metal",
      "count": 79
    },
    {
      "category": "foam",
      "count": 76
    },
    {
      "category": "other",
      "count": 63
    }
  ],
  "notes": "",
  "photoIds": [],
  "submittedAt": "2026-01-17T20:00:00.000Z"
}
