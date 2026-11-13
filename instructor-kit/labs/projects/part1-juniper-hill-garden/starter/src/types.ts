// Juniper Hill Community Garden: the plot board's data, described once (TODO A)
// Open src/data/plots.ts first: your types must describe that data exactly, not the other way round.

// TODO A1: the three kinds of bed ('raised', 'ground', 'greenhouse'), as a union of string literals
export type BedKind = string

// TODO A2: the three statuses ('open', 'assigned', 'resting'), the same way
export type PlotStatus = string

// TODO A3: one plot, with every property in src/data/plots.ts (which one is not on every plot?)
export interface Plot {}

// TODO A4: what a valid request holds: name, email, bed (a BedKind) and householdSize (a number)
export interface PlotRequest {}
