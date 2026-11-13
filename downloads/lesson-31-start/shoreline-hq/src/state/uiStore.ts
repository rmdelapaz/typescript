import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// How the HQ looks in this browser: client state that shoreline-api never sees.
// Zustand keeps it in one store outside React, and persist saves it in localStorage.

export const themes = ['system', 'light', 'dark'] as const
export type Theme = (typeof themes)[number]

export const densities = ['roomy', 'compact'] as const
export type Density = (typeof densities)[number]

function isTheme(value: unknown): value is Theme {
  return themes.some((theme) => theme === value)
}

function isDensity(value: unknown): value is Density {
  return densities.some((density) => density === value)
}

interface UiState {
  theme: Theme
  density: Density
  setTheme: (theme: Theme) => void
  setDensity: (density: Density) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'system',
      density: 'roomy',
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
    }),
    {
      name: 'shoreline-hq-ui',
      // What localStorage holds is unknown (an old version, a hand edit): keep only values that pass the checks
      merge: (saved, current) => {
        if (typeof saved !== 'object' || saved === null) {
          return current
        }
        return {
          ...current,
          theme: 'theme' in saved && isTheme(saved.theme) ? saved.theme : current.theme,
          density: 'density' in saved && isDensity(saved.density) ? saved.density : current.density,
        }
      },
    },
  ),
)

// The theme belongs to the whole page, so it lives on <html data-theme="…">, where the CSS can see it
export function showTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}
