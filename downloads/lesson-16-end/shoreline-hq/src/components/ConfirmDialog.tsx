import type { ReactNode } from 'react'
import buttonStyles from './Button.module.css'
import styles from './ConfirmDialog.module.css'
import { Dialog } from './Dialog.tsx'

interface ConfirmDialogProps {
  title: string
  /** The safe choice, first in the dialog: it gets the focus when the dialog opens */
  keepLabel: string
  confirmLabel: string
  onKeep: () => void
  onConfirm: () => void
  children: ReactNode
}

// A question with two answers. Escape counts as the safe answer.
export function ConfirmDialog({
  title,
  keepLabel,
  confirmLabel,
  onKeep,
  onConfirm,
  children,
}: ConfirmDialogProps) {
  return (
    <Dialog title={title} onClose={onKeep}>
      {children}
      <div className={styles.actions}>
        <button type="button" className={buttonStyles.secondary} onClick={onKeep}>
          {keepLabel}
        </button>
        <button type="button" className={buttonStyles.primary} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Dialog>
  )
}
