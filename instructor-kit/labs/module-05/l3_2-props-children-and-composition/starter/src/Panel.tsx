// Task 2: a frame with a heading. Whatever sits between <Panel> and </Panel> goes under the heading.
// TODO 2: accept that content as a prop (which type means "anything React can draw"?) and draw it.
interface PanelProps {
  title: string
}

export function Panel({ title }: PanelProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
    </section>
  )
}
