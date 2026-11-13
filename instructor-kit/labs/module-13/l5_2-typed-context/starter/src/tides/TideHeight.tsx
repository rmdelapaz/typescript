interface TideHeightProps {
  meters: number
}

// Task 1: read the unit from HeightUnitContext (not from a prop) and show "1.5 m", or "4.9 ft" in feet
// (1 m = 3.28 ft; one decimal in both: toFixed(1)).
export function TideHeight({ meters }: TideHeightProps) {
  return <strong>TODO 1: {meters}</strong>
}
