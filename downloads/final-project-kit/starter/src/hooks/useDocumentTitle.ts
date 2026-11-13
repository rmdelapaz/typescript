import { useEffect } from 'react'
import { appName } from '../config.ts'

/** Shows "title · App name" in the browser tab while the component is on the screen (Lesson 4.2) */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · ${appName}`
    return () => {
      document.title = previous
    }
  }, [title])
}
