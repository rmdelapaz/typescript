import type { ComponentPropsWithRef, ElementType } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'link'

/** Button's own props, plus every prop of the element or component named in `as` */
type ButtonProps<C extends ElementType> = {
  /** What to render: 'button' (the default), 'a', or a component such as a router link */
  as?: C
  variant?: ButtonVariant
} & Omit<ComponentPropsWithRef<C>, 'as' | 'className'>

// The HQ's one button look, on whatever element the job needs
export function Button<C extends ElementType = 'button'>({
  as,
  variant = 'secondary',
  ...props
}: ButtonProps<C>) {
  const Component = as ?? 'button'
  // A <button> in a form submits unless told otherwise: make "button" the default type
  const type = Component === 'button' ? 'button' : undefined
  return <Component type={type} {...props} className={styles[variant]} />
}
