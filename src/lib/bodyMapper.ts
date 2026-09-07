/**
 * Domain mapper re-exports: Body Measurements → 3D Anatomical Scale Factors
 * Authoritative implementation resides in src/lib/anatomy/anatomicalMapper.ts
 */
export { computeAnatomicalScaleFactors } from './anatomy/anatomicalMapper';
export { calculateBMI, getBMICategory, calculateAdiposeProfile } from './anatomy/bmiCalculator';
export type { AnatomicalScaleFactors, AdiposeProfile } from '@/types/anatomy';
