// Pinned sites: client state (shoreline-api never hears about it) in a Zustand store (Lesson 7.3)
import { create } from 'zustand'
import type { SiteId } from './sites.ts'

interface PinState {
  /** Pinned sites, in the order they were pinned */
  pinned: SiteId[]
  togglePin: (siteId: SiteId) => void
  clearPins: () => void
}

// TODO 2: keep it across reloads: wrap the creator in persist (name 'shoreline-pins') with a merge that keeps
// only real site ids, once each, from whatever localStorage gives back
export const usePinStore = create<PinState>()((set) => ({
  pinned: [],
  togglePin: (siteId) => {
    // TODO 1: add the site at the end, or take it out if it is pinned (always a NEW array)
    throw new Error(`TODO 1: toggle ${siteId}`)
  },
  clearPins: () => set({ pinned: [] }),
}))
