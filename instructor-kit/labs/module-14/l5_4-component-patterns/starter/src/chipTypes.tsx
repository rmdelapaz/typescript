// Type tests (do not edit): npm run typecheck. Each @ts-expect-error line says "the next line MUST be a type
// error". While Chip accepts anything, tsc reports error TS2578 (Unused '@ts-expect-error' directive) instead.
import { Chip } from './Chip.tsx'

export function ChipTypeTests() {
  return (
    <p>
      <Chip>Fine: a span</Chip>
      <Chip as="a" href="/sites" tone="alert">
        Fine: a link
      </Chip>
      <Chip as="button" type="submit" disabled>
        Fine: a button
      </Chip>
      {/* @ts-expect-error a span has no href */}
      <Chip href="/sites">A span with an href</Chip>
      {/* @ts-expect-error a link has no disabled */}
      <Chip as="a" href="/sites" disabled>
        A disabled link
      </Chip>
      {/* @ts-expect-error 'loud' is not a ChipTone */}
      <Chip tone="loud">Too loud</Chip>
    </p>
  )
}
