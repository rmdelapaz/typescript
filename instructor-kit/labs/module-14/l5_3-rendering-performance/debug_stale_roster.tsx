// Debug handout (deliberately broken): the roster's toggle, "fixed" with useCallback the wrong way.
// Copy it into starter/src/ as StaleRoster.tsx, run npm run lint, read the warning, then predict what clicking
// Ana and then Ben shows before you fix it. Delete the copy when you are done.
import { useCallback, useState } from 'react'

export function StaleRoster() {
  const [present, setPresent] = useState<string[]>([])

  // Looks stable. Is it right?
  const markPresent = useCallback((id: string) => {
    setPresent(present.includes(id) ? present : [...present, id])
  }, [])

  return (
    <p>
      <button type="button" onClick={() => markPresent('v1')}>
        Ana Lima
      </button>{' '}
      <button type="button" onClick={() => markPresent('v2')}>
        Ben Okafor
      </button>{' '}
      Present: {present.join(', ') || 'nobody yet'}
    </p>
  )
}
