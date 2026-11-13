import type { Skill } from '../api/types.ts'

// The API's names for each skill (GET /api/meta lists the same labels)
export const skillLabels: Record<Skill, string> = {
  'first-aid': 'First aid',
  'boat-handling': 'Boat handling',
  'heavy-lifting': 'Heavy lifting',
  photography: 'Photography',
  'data-recording': 'Data recording',
  'team-lead': 'Team lead',
}
