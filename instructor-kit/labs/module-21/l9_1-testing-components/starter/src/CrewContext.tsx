import { createContext, use, type ReactNode } from 'react'

// The crew's name, provided once around the app (like the HQ's AuthProvider, Lesson 5.2)
const CrewContext = createContext<string | undefined>(undefined)

export function CrewProvider({ crewName, children }: { crewName: string; children: ReactNode }) {
  return <CrewContext value={crewName}>{children}</CrewContext>
}

export function useCrewName(): string {
  const crewName = use(CrewContext)
  if (crewName === undefined) throw new Error('useCrewName must be used inside <CrewProvider>')
  return crewName
}
