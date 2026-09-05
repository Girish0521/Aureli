import { BodyMeasurements } from '@/types';

export interface BodyScaleFactors {
  height: number;
  torsoWidth: number;
  waistWidth: number;
  hipWidth: number;
  shoulderWidth: number;
  volumeScale: number;
}

/**
 * Maps user body measurements to 3D model scale factors
 * Base measurements (M size): height=170cm, chest=95cm, waist=80cm, hips=95cm, shoulder=42cm, weight=70kg
 */
export const mapMeasurementsToScale = (measurements: BodyMeasurements): BodyScaleFactors => {
  const baseHeight = 170;
  const baseChest = 95;
  const baseWaist = 80;
  const baseHips = 95;
  const baseShoulder = 42;
  const baseWeight = 70;

  // Height scales the entire model vertically
  const heightScale = measurements.height / baseHeight;

  // Chest measurement affects upper torso width
  const torsoWidthScale = measurements.chest / baseChest;

  // Waist affects midsection
  const waistWidthScale = measurements.waist / baseWaist;

  // Hips affect lower torso/leg connection
  const hipWidthScale = measurements.hips / baseHips;

  // Shoulder width affects upper body spread
  const shoulderWidthScale = measurements.shoulderWidth / baseShoulder;

  // Weight affects overall volume (slight bulking)
  const volumeScale = Math.pow(measurements.weight / baseWeight, 0.3);

  return {
    height: heightScale,
    torsoWidth: torsoWidthScale,
    waistWidth: waistWidthScale,
    hipWidth: hipWidthScale,
    shoulderWidth: shoulderWidthScale,
    volumeScale: volumeScale,
  };
};
