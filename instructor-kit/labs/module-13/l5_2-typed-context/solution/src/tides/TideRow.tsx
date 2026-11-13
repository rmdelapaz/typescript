import { TideHeight } from './TideHeight.tsx'

interface TideRowProps {
  label: string
  meters: number
}

// Knows nothing about units: no unit prop passes through it
export function TideRow({ label, meters }: TideRowProps) {
  return (
    <p>
      {label}: <TideHeight meters={meters} />
    </p>
  )
}
