import { useContext } from 'react'
import { HeightUnitContext } from './heightUnit.ts'

const feetPerMeter = 3.28

interface TideHeightProps {
  meters: number
}

// Reads the unit from the nearest provider above it (or the default, 'm')
export function TideHeight({ meters }: TideHeightProps) {
  const unit = useContext(HeightUnitContext)
  const text = unit === 'm' ? `${meters.toFixed(1)} m` : `${(meters * feetPerMeter).toFixed(1)} ft`
  return <strong>{text}</strong>
}
