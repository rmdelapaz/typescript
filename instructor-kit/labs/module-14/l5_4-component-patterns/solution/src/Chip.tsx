import type { ComponentPropsWithRef, ElementType } from 'react'

export type ChipTone = 'calm' | 'alert'

/** Chip's own props, plus every prop of the element or component named in `as` */
type ChipProps<C extends ElementType> = {
  /** What to render: 'span' (the default), 'a', 'button' or a component */
  as?: C
  tone?: ChipTone
} & Omit<ComponentPropsWithRef<C>, 'as' | 'className'>

// A small label in one of two tones, on whatever element the job needs
export function Chip<C extends ElementType = 'span'>({ as, tone = 'calm', ...props }: ChipProps<C>) {
  const Component = as ?? 'span'
  // A <button> submits a form unless told otherwise: "button" by default, the caller's type wins
  const type = Component === 'button' ? 'button' : undefined
  // className last: the tone is the only class a Chip gets
  return <Component type={type} {...props} className={tone} />
}
