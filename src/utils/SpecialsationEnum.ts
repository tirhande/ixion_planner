
export type SpecialisationType = 'space' | 'food' | 'population' | 'industry' | 'recycling';

const SPECIALISATION_THRESHOLDS: Record<SpecialisationType, number[]> = {
  industry: [300, 800],
  population: [400, 1000],
  space: [450, 700],
  food: [400, 800],
  recycling: [300, 800]
}

export function calculateSpecialisationLevel(amount: number, type: SpecialisationType): number {
  const thresholds = SPECIALISATION_THRESHOLDS[type];
  for (let i = 0; i < thresholds.length; i++) {
    if (amount < thresholds[i]) {
      return i
    }
  }
  return thresholds.length
}