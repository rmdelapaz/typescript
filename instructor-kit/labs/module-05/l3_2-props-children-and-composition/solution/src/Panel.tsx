import type { ReactNode } from 'react'

// Task 2: a frame with a heading. Whatever sits between <Panel> and </Panel> goes under the heading.
interface PanelProps {
  title: string
  children: ReactNode
}

export function Panel({ title, children }: PanelProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  )
}
