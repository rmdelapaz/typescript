import { useEffect } from 'react'

const appName = 'Shoreline Crew HQ'

/** Shows "title · Shoreline Crew HQ" in the browser tab while the component is on the screen */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · ${appName}`
    return () => {
      document.title = previous
    }
  }, [title])
}
