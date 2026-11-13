import { createContext } from 'react'

export type HeightUnit = 'm' | 'ft'

// A sensible default exists: a component with no provider above it shows meters
export const HeightUnitContext = createContext<HeightUnit>('m')
