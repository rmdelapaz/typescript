import type { Plot } from '../types.ts'

// Given: this season's plots, exactly as the garden's volunteers keep them.
// Your types in src/types.ts must describe this data (do not change it to fit your types).
export const plots: Plot[] = [
  { id: 'p01', number: 1, bed: 'raised', sizeSqFt: 32, sunHours: 8, status: 'assigned', gardener: 'Rosa Delgado', notes: 'Next to the tool shed. Tomatoes grew well here last season.' },
  { id: 'p02', number: 2, bed: 'raised', sizeSqFt: 32, sunHours: 8, status: 'open', notes: 'Corner bed by the gate, easy to reach from the path.' },
  { id: 'p03', number: 3, bed: 'raised', sizeSqFt: 32, sunHours: 6, status: 'open', notes: 'Raised to waist height: no bending needed.' },
  { id: 'p04', number: 4, bed: 'ground', sizeSqFt: 120, sunHours: 7, status: 'assigned', gardener: 'Sam Okafor', notes: 'Drip line on a timer.' },
  { id: 'p05', number: 5, bed: 'ground', sizeSqFt: 120, sunHours: 7, status: 'resting', notes: 'Resting this season under a cover crop of clover.' },
  { id: 'p06', number: 6, bed: 'ground', sizeSqFt: 160, sunHours: 5, status: 'open', notes: 'Part shade in the afternoon from the maple.' },
  { id: 'p07', number: 7, bed: 'ground', sizeSqFt: 160, sunHours: 8, status: 'assigned', gardener: 'Lena Fischer', notes: 'Shares a compost bin with plot 6.' },
  { id: 'p08', number: 8, bed: 'greenhouse', sizeSqFt: 24, sunHours: 10, status: 'open', notes: 'Bench by the vents: good for seedlings.' },
  { id: 'p09', number: 9, bed: 'greenhouse', sizeSqFt: 24, sunHours: 10, status: 'assigned', gardener: 'Marcus Bell', notes: 'Peppers and basil, watered from the rain barrel.' },
  { id: 'p10', number: 10, bed: 'greenhouse', sizeSqFt: 24, sunHours: 9, status: 'resting', notes: 'Bench under repair until the new frame arrives.' },
  { id: 'p11', number: 11, bed: 'raised', sizeSqFt: 48, sunHours: 4, status: 'open', notes: 'Shady bed: lettuce, herbs and greens do best here.' },
  { id: 'p12', number: 12, bed: 'ground', sizeSqFt: 120, sunHours: 8, status: 'assigned', gardener: 'Priya Raman', notes: 'Fenced against rabbits.' },
]
