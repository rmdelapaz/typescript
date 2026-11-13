// Task 3: one pin button per site
import { usePinStore } from './pinStore.ts'
import { siteNames, type SiteId } from './sites.ts'

// It works, but it reads the WHOLE store: every pin re-renders every button.
// TODO 3: select only what this button needs (a boolean, and the action)
export function PinButton({ siteId }: { siteId: SiteId }) {
  const { pinned, togglePin } = usePinStore()
  return (
    <button type="button" aria-pressed={pinned.includes(siteId)} onClick={() => togglePin(siteId)}>
      Pin {siteNames[siteId]}
    </button>
  )
}
