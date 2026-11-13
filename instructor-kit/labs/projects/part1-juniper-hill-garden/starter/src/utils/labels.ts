// Labels, tones and the board's filter (TODO B)
import type { BadgeTone } from '../components/Badge.tsx'
import type { BedKind, Plot, PlotStatus } from '../types.ts'

// TODO B1: one label per bed: 'Raised bed', 'Ground plot', 'Greenhouse bench'
export const bedLabels: Record<BedKind, string> = {}

// TODO B2: one label per status: 'Open', 'Assigned', 'Resting'
export const statusLabels: Record<PlotStatus, string> = {}

// TODO B3: one Badge tone per status: open is 'success', assigned is 'info', resting is 'neutral'
export const statusTones: Record<PlotStatus, BadgeTone> = {}

// TODO B4: true only for the three bed kinds (a <select> hands over any string: Lesson 3.4's guard)
export function isBedKind(value: unknown): value is BedKind {
  throw new Error(`TODO B4: is ${String(value)} a BedKind?`)
}

// What the filters can be set to: a status or a bed, or 'all'
export type StatusFilter = PlotStatus | 'all'
export type BedFilter = BedKind | 'all'

// TODO B5: the plots that match both filters, in the order they come
export function filterPlots(plots: Plot[], status: StatusFilter, bed: BedFilter): Plot[] {
  throw new Error(`TODO B5: filter ${plots.length} plots by ${status} and ${bed}`)
}

// TODO B6: 'Showing 5 of 12 plots'
export function countLine(shown: number, total: number): string {
  throw new Error(`TODO B6: the count line for ${shown} of ${total}`)
}
