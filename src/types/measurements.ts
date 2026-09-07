export interface BodyMeasurements {
  height: number; // cm
  weight: number; // kg
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm
  shoulderWidth: number; // cm
}

export interface MeasurementRange {
  min: number;
  max: number;
  default: number;
  step?: number;
  unit: string;
  label: string;
}

export type MeasurementField = keyof BodyMeasurements;

export interface SizePreset {
  name: string;
  label?: string;
  measurements: BodyMeasurements;
}
