// Task 3: what the crew hears on the morning of a cleanup, and who is waiting for a spot.
export type TideCall =
  | { kind: 'go' }
  | { kind: 'delayed'; minutes: number }
  | { kind: 'cancelled'; reason: string }

interface TideBannerProps {
  call: TideCall
  waiting: string[]
}

export function TideBanner({ call, waiting }: TideBannerProps) {
  return (
    <section aria-label="Tide call">
      <CallLine call={call} />
      {waiting.length > 0 && <p>{waiting.length} people are waiting for a spot.</p>}
    </section>
  )
}

function CallLine({ call }: { call: TideCall }) {
  switch (call.kind) {
    case 'go':
      return <p>On as planned.</p>
    case 'delayed':
      return <p>Starts {call.minutes} minutes late: the tide is still high.</p>
    case 'cancelled':
      return <p role="alert">Cancelled: {call.reason}</p>
  }
}
