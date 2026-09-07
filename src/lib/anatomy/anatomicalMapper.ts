import { BodyMeasurements } from '@/types';
import {
  AnatomicalScaleFactors,
  FatDistributionMode,
  MuscleGroupId
} from '@/types/anatomy';
import { calculateAdiposeProfile } from './bmiCalculator';

/**
 * Compute complete anatomical scale factors from body measurements
 * Maps user measurements to bone scaling, muscle volumes, and fat distribution
 */
export function computeAnatomicalScaleFactors(
  measurements: BodyMeasurements,
  fatMode: FatDistributionMode = 'regional'
): AnatomicalScaleFactors {
  const baseHeight = 170.0;
  const baseWeight = 70.0;
  const baseChest = 95.0;
  const baseWaist = 80.0;
  const baseHips = 95.0;
  const baseShoulder = 42.0;

  // 1. Skeletal Scaling
  const heightScale = measurements.height / baseHeight;
  const shoulderSpanScale = measurements.shoulderWidth / baseShoulder;
  const pelvicWidthScale = measurements.hips / baseHips;

  // Torso height vs Limb proportions (anthropometric ratio: legs ~48% height, torso ~35%)
  const torsoHeightScale = heightScale * 0.98;
  const legLengthScale = heightScale * 1.02;
  const armLengthScale = (heightScale * 0.5 + shoulderSpanScale * 0.5);

  // Rib cage 3D scaling (x: width, y: height, z: depth)
  const chestRatio = measurements.chest / baseChest;
  const ribCageScale: [number, number, number] = [
    chestRatio * 0.95,
    torsoHeightScale,
    chestRatio * 1.05
  ];

  // 2. Adipose Profile (BMI and regional fat distribution)
  const adiposeProfile = calculateAdiposeProfile(measurements, fatMode);

  // 3. Muscle Volume Multipliers
  // Muscular hypertrophy scales with chest-to-waist ratio and overall weight
  const muscularityIndex = Math.max(
    0.7,
    (measurements.chest / measurements.waist) * Math.pow(measurements.weight / baseWeight, 0.25)
  );

  const muscleVolumeMultipliers: Partial<Record<MuscleGroupId, number>> = {};

  // Upper body muscles (chest-driven)
  const upperBodyMuscles: MuscleGroupId[] = [
    'pectoralis_major',
    'pectoralis_minor',
    'deltoid_anterior',
    'deltoid_lateral',
    'deltoid_posterior',
    'biceps_brachii',
    'brachialis',
    'triceps_brachii',
    'serratus_anterior'
  ];

  upperBodyMuscles.forEach(id => {
    muscleVolumeMultipliers[id] = muscularityIndex * (measurements.chest / baseChest);
  });

  // Lower body muscles (hip-driven)
  const lowerBodyMuscles: MuscleGroupId[] = [
    'quadriceps_rectus_femoris',
    'quadriceps_vastus_lateralis',
    'quadriceps_vastus_medialis',
    'gluteus_maximus',
    'gluteus_medius',
    'hamstrings_biceps_femoris',
    'hamstrings_semitendinosus',
    'adductors'
  ];

  lowerBodyMuscles.forEach(id => {
    muscleVolumeMultipliers[id] = muscularityIndex * (measurements.hips / baseHips);
  });

  // Core muscles (waist-driven)
  const coreMuscles: MuscleGroupId[] = [
    'rectus_abdominis',
    'external_obliques'
  ];

  coreMuscles.forEach(id => {
    muscleVolumeMultipliers[id] = measurements.waist / baseWaist;
  });

  // Back muscles
  const backMuscles: MuscleGroupId[] = [
    'latissimus_dorsi',
    'trapezius',
    'erector_spinae'
  ];

  backMuscles.forEach(id => {
    muscleVolumeMultipliers[id] = muscularityIndex * (measurements.chest / baseChest) * 0.9;
  });

  // Calf and lower leg muscles
  const calfMuscles: MuscleGroupId[] = [
    'gastrocnemius',
    'soleus',
    'tibialis_anterior'
  ];

  calfMuscles.forEach(id => {
    muscleVolumeMultipliers[id] = muscularityIndex * legLengthScale;
  });

  // Forearm and neck muscles
  muscleVolumeMultipliers['forearm_flexors'] = muscularityIndex * armLengthScale * 0.8;
  muscleVolumeMultipliers['forearm_extensors'] = muscularityIndex * armLengthScale * 0.8;
  muscleVolumeMultipliers['sternocleidomastoid'] = muscularityIndex * 0.9;
  muscleVolumeMultipliers['iliopsoas'] = muscularityIndex;

  return {
    heightScale,
    torsoHeightScale,
    legLengthScale,
    armLengthScale,
    shoulderSpanScale,
    pelvicWidthScale,
    ribCageScale,
    muscleVolumeMultipliers,
    adiposeProfile
  };
}

/**
 * Get scaling factor for a specific body region
 * Useful for procedural geometry generation
 */
export function getRegionalScale(
  factors: AnatomicalScaleFactors,
  region: 'head' | 'neck' | 'torso' | 'arm' | 'leg' | 'hand' | 'foot'
): number {
  switch (region) {
    case 'head':
      return Math.pow(factors.heightScale, 0.3); // Head scales slower
    case 'neck':
      return (factors.heightScale + factors.ribCageScale[0]) / 2;
    case 'torso':
      return factors.torsoHeightScale;
    case 'arm':
      return factors.armLengthScale;
    case 'leg':
      return factors.legLengthScale;
    case 'hand':
      return Math.pow(factors.heightScale, 0.6);
    case 'foot':
      return Math.pow(factors.heightScale, 0.7);
  }
}
