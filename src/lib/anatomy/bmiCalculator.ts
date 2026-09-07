import { BodyMeasurements } from '@/types';
import {
  AdiposeProfile,
  FatDistributionMode,
  RegionalFatThicknessMap
} from '@/types/anatomy';

/**
 * Calculate Body Mass Index from height and weight
 * Formula: BMI = weight(kg) / (height(m))²
 */
export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Estimate body fat percentage using Deurenberg formula
 * BMI-based approximation for adults (age ~30)
 */
export function estimateBodyFatPercentage(bmi: number, age: number = 30): number {
  // Deurenberg formula: BF% = 1.20 × BMI + 0.23 × age - 16.2
  const rawEstimate = 1.20 * bmi + 0.23 * age - 16.2;
  return Math.max(5.0, Math.min(50.0, rawEstimate));
}

/**
 * Calculate regional fat thickness in millimeters based on BMI and body measurements
 *
 * Regional fat accumulation follows anthropometric patterns:
 * - Abdomen: Fastest accumulation (android pattern)
 * - Hips/Glutes: Significant accumulation (gynoid pattern)
 * - Thighs: Moderate accumulation
 * - Upper arms, chest, back: Moderate accumulation
 * - Calves, neck/face: Slower accumulation
 */
export function calculateRegionalFatThickness(
  measurements: BodyMeasurements,
  bmi: number,
  mode: FatDistributionMode
): RegionalFatThicknessMap {
  const baseWeight = 70.0;
  const baseChest = 95.0;
  const baseWaist = 80.0;
  const baseHips = 95.0;
  const baseShoulder = 42.0;
  const bmiRef = 24.22; // Reference BMI for base measurements

  const bmiDelta = (bmi - bmiRef) / bmiRef;

  // Uniform mode: same thickness everywhere
  if (mode === 'uniform') {
    const uniformThickness = 15.0 * (1.0 + bmiDelta * 0.5);
    return {
      abdomen: Math.max(3.0, uniformThickness),
      hips_gluteal: Math.max(3.0, uniformThickness),
      chest_pectoral: Math.max(3.0, uniformThickness),
      upper_arms: Math.max(2.0, uniformThickness),
      thighs: Math.max(3.0, uniformThickness),
      calves: Math.max(2.0, uniformThickness),
      back_flanks: Math.max(3.0, uniformThickness),
      neck_face: Math.max(2.0, uniformThickness),
    };
  }

  // Regional mode: measurement-driven + BMI-driven distribution
  const waistRatio = (measurements.waist - baseWaist) / baseWaist;
  const hipsRatio = (measurements.hips - baseHips) / baseHips;
  const chestRatio = (measurements.chest - baseChest) / baseChest;
  const shoulderRatio = (measurements.shoulderWidth - baseShoulder) / baseShoulder;
  const weightRatio = (measurements.weight - baseWeight) / baseWeight;

  return {
    // Abdomen: highest sensitivity to waist measurement and BMI
    abdomen: Math.max(
      4.0,
      18.0 * (1.0 + 0.45 * bmiDelta + 0.70 * waistRatio)
    ),

    // Hips/Glutes: high sensitivity to hip measurement
    hips_gluteal: Math.max(
      5.0,
      20.0 * (1.0 + 0.38 * bmiDelta + 0.75 * hipsRatio)
    ),

    // Chest: moderate sensitivity
    chest_pectoral: Math.max(
      3.0,
      12.0 * (1.0 + 0.28 * bmiDelta + 0.60 * chestRatio)
    ),

    // Upper arms: lower sensitivity
    upper_arms: Math.max(
      2.0,
      10.0 * (1.0 + 0.18 * bmiDelta + 0.40 * shoulderRatio)
    ),

    // Thighs: moderate, tied to hip measurement
    thighs: Math.max(
      4.0,
      16.0 * (1.0 + 0.25 * bmiDelta + 0.50 * hipsRatio)
    ),

    // Calves: low sensitivity
    calves: Math.max(
      2.0,
      8.0 * (1.0 + 0.10 * bmiDelta + 0.25 * weightRatio)
    ),

    // Back/Flanks: moderate, follows waist
    back_flanks: Math.max(
      3.0,
      14.0 * (1.0 + 0.30 * bmiDelta + 0.50 * waistRatio)
    ),

    // Neck/Face: lowest sensitivity
    neck_face: Math.max(
      2.0,
      6.0 * (1.0 + 0.15 * bmiDelta + 0.35 * weightRatio)
    ),
  };
}

/**
 * Calculate complete adipose profile from body measurements
 */
export function calculateAdiposeProfile(
  measurements: BodyMeasurements,
  mode: FatDistributionMode = 'regional'
): AdiposeProfile {
  const bmi = calculateBMI(measurements.height, measurements.weight);
  const bmiRef = 24.22;
  const bmiDelta = (bmi - bmiRef) / bmiRef;

  const fatPercentageEstimated = estimateBodyFatPercentage(bmi);
  const overallFatMassKg = measurements.weight * (fatPercentageEstimated / 100.0);

  const regionalThicknessMm = calculateRegionalFatThickness(
    measurements,
    bmi,
    mode
  );

  return {
    bmi,
    bmiDelta,
    overallFatMassKg,
    fatPercentageEstimated,
    distributionMode: mode,
    regionalThicknessMm,
  };
}

/**
 * Get BMI category string for display
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal weight';
  if (bmi < 30.0) return 'Overweight';
  if (bmi < 35.0) return 'Obese (Class I)';
  if (bmi < 40.0) return 'Obese (Class II)';
  return 'Obese (Class III)';
}
