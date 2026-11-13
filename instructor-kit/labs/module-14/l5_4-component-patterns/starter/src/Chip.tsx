import type { ElementType } from 'react'

export type ChipTone = 'calm' | 'alert'

// TODO 3: make Chip polymorphic, like Lesson 5.4's Button. Its props should be its own (as, tone) plus every prop
// of the element or component named in `as` (ComponentPropsWithRef), without 'as' and 'className' (the tone picks the class); the default
// element is a <span>; a <button> gets type="button" unless the caller passes a type.
type ChipProps = { as?: ElementType; tone?: ChipTone } & Record<string, unknown>

// A small label in one of two tones, on whatever element the job needs
export function Chip({ tone = 'calm', ...props }: ChipProps) {
  return <span {...props} className={tone} />
}
