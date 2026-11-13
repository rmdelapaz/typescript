// The words people see for each union value (Lab 11.1, Task 1).
import type { PianoKind, VisitStatus } from './types.ts'

// TODO 1: once VisitStatus is a union, this Record must list every status (the starter's labels.ts does the same):
// Requested, Scheduled, Tuned, Invoiced, Paid
export const visitStatusLabels: Record<VisitStatus, string> = {}

// TODO 1: Upright, Baby grand, Grand
export const pianoKindLabels: Record<PianoKind, string> = {}
