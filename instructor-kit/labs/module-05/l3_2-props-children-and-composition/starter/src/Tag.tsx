// Task 1: a small rounded label with a tone. Two tones only: 'info' (the default) and 'warning'.
// TODO 1: describe the props with an interface above the component (label required, tone optional and
// only one of the two words), give tone its default in the destructuring, and draw
//   <span className="tag tag-info">LABEL</span>      (tag-warning for a warning)
export function Tag({ label, tone }: { label: string; tone?: string }) {
  return <span>TODO 1: {label} {tone}</span>
}
