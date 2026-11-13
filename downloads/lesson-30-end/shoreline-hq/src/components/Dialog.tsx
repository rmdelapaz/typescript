import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Dialog.module.css'

interface DialogProps {
  /** The dialog's heading, also its accessible name */
  title: string
  /** Called when the person presses Escape: the parent should stop rendering the dialog */
  onClose: () => void
  children: ReactNode
}

// A modal dialog: render it to open it, stop rendering it to close it
export function Dialog({ title, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<Element | null>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog === null) return
    if (!dialog.open) {
      openerRef.current = document.activeElement // remember where the focus was
      dialog.showModal() // focus moves into the dialog, the page behind it goes inert
    }
    return () => {
      // Closing: give the focus back to the control that opened the dialog
      const opener = openerRef.current
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [])

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby={titleId} className={styles.dialog} onClose={onClose}>
      <h2 id={titleId}>{title}</h2>
      {children}
    </dialog>,
    document.body,
  )
}
