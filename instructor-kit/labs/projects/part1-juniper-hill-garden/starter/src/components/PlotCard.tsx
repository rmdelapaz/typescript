import type { Plot } from '../types.ts'

interface PlotCardProps {
  plot: Plot
}

// TODO C: an <article> with the heading "Plot 3", the bed and status badges, the size line, the gardener
// (assigned plots only) and a details toggle whose name makes sense out of context (TASKS.md)
export function PlotCard({ plot }: PlotCardProps) {
  return <p>TODO C: the card for {JSON.stringify(plot).slice(0, 20)}</p>
}
