// Pinned sites: client state (shoreline-api never hears about it) in a Zustand store (Lesson 7.3)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isSiteId, type SiteId } from './sites.ts'

interface PinState {
  /** Pinned sites, in the order they were pinned */
  pinned: SiteId[]
  togglePin: (siteId: SiteId) => void
  clearPins: () => void
}

export const usePinStore = create<PinState>()(
  persist(
    (set) => ({
      pinned: [],
      // A new array every time: selectors compare with Object.is, and the old state is never changed
      togglePin: (siteId) =>
        set((state) => ({
          pinned: state.pinned.includes(siteId)
            ? state.pinned.filter((id) => id !== siteId)
            : [...state.pinned, siteId],
        })),
      clearPins: () => set({ pinned: [] }),
    }),
    {
      name: 'shoreline-pins',
      // What localStorage holds is unknown (an old version, a hand edit): keep only real site ids, once each
      merge: (saved, current) => {
        if (typeof saved !== 'object' || saved === null || !('pinned' in saved) || !Array.isArray(saved.pinned)) {
          return current
        }
        const pinned = saved.pinned.filter(isSiteId).filter((id, index, all) => all.indexOf(id) === index)
        return { ...current, pinned }
      },
    },
  ),
)
