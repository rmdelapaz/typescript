// Task 3: what the crew hears on the morning of a cleanup, and who is waiting for a spot.
export type TideCall =
  | { kind: 'go' }
  | { kind: 'delayed'; minutes: number }
  | { kind: 'cancelled'; reason: string }

interface TideBannerProps {
  call: TideCall
  waiting: string[]
}

// TODO 3: draw every kind of call (a cancelled call is an alert: role="alert"), and show the waiting
// line only when somebody is waiting. Two bugs here, and neither tsc nor a linter reports them.
export function TideBanner({ call, waiting }: TideBannerProps) {
  return (
    <section aria-label="Tide call">
      <CallLine call={call} />
      {waiting.length && <p>{waiting.length} people are waiting for a spot.</p>}
    </section>
  )
}

function CallLine({ call }: { call: TideCall }) {
  switch (call.kind) {
    case 'go':
      return <p>On as planned.</p>
    case 'delayed':
      return <p>Starts {call.minutes} minutes late: the tide is still high.</p>
  }
}
