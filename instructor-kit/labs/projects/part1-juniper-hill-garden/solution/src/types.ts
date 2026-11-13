// Juniper Hill Community Garden: the plot board's data, described once (TODO A)

/** Where a plot is: a raised bed, a plot in the ground, or a bench in the greenhouse */
export type BedKind = 'raised' | 'ground' | 'greenhouse'

/** open = anyone can request it; assigned = a gardener has it this season; resting = left fallow this season */
export type PlotStatus = 'open' | 'assigned' | 'resting'

export interface Plot {
  id: string
  number: number
  bed: BedKind
  sizeSqFt: number
  sunHours: number
  status: PlotStatus
  /** Only assigned plots have a gardener */
  gardener?: string
  notes: string
}

/** What a valid request holds once the form's text has been checked */
export interface PlotRequest {
  name: string
  email: string
  bed: BedKind
  householdSize: number
}
