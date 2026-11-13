// The fields of shoreline-api's answers this lab needs (the HQ's full types are in src/api/types.ts)
export interface Site {
  id: string
  name: string
  town: string
}

export interface CleanupEvent {
  id: string
  title: string
  siteId: string
  status: 'draft' | 'scheduled' | 'completed' | 'cancelled'
  date: string
}
