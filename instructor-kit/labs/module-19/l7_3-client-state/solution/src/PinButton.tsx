// Task 3: one pin button per site
import { usePinStore } from './pinStore.ts'
import { siteNames, type SiteId } from './sites.ts'

export function PinButton({ siteId }: { siteId: SiteId }) {
  // A boolean: this button re-renders only when ITS answer changes
  const pinned = usePinStore((state) => state.pinned.includes(siteId))
  // Actions never change: selecting one costs nothing
  const togglePin = usePinStore((state) => state.togglePin)
  return (
    <button type="button" aria-pressed={pinned} onClick={() => togglePin(siteId)}>
      Pin {siteNames[siteId]}
    </button>
  )
}
