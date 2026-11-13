// Labels, tones and the board's filter (TODO B)
import type { BadgeTone } from '../components/Badge.tsx'
import type { BedKind, Plot, PlotStatus } from '../types.ts'

// One entry per member of the union: TypeScript reports a missing or misspelled one
export const bedLabels: Record<BedKind, string> = {
  raised: 'Raised bed',
  ground: 'Ground plot',
  greenhouse: 'Greenhouse bench',
}

export const statusLabels: Record<PlotStatus, string> = {
  open: 'Open',
  assigned: 'Assigned',
  resting: 'Resting',
}

export const statusTones: Record<PlotStatus, BadgeTone> = {
  open: 'success',
  assigned: 'info',
  resting: 'neutral',
}

export const bedKinds: BedKind[] = ['raised', 'ground', 'greenhouse']
export const plotStatuses: PlotStatus[] = ['open', 'assigned', 'resting']

// A <select> hands over a string: these check it is one of ours
export function isBedKind(value: unknown): value is BedKind {
  return bedKinds.some((bed) => bed === value)
}

export function isPlotStatus(value: unknown): value is PlotStatus {
  return plotStatuses.some((status) => status === value)
}

export type StatusFilter = PlotStatus | 'all'
export type BedFilter = BedKind | 'all'

export function filterPlots(plots: Plot[], status: StatusFilter, bed: BedFilter): Plot[] {
  return plots.filter(
    (plot) => (status === 'all' || plot.status === status) && (bed === 'all' || plot.bed === bed),
  )
}

export function countLine(shown: number, total: number): string {
  return `Showing ${shown} of ${total} plots`
}
