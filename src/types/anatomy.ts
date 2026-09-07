import { BodyMeasurements } from './index';

// -------------------------------------------------------------------------
// Skeletal System Types
// -------------------------------------------------------------------------

export type BoneDivision = 'axial' | 'appendicular';

export type BoneCategory =
  | 'cranial'
  | 'facial'
  | 'vertebral_cervical'
  | 'vertebral_thoracic'
  | 'vertebral_lumbar'
  | 'vertebral_sacrococcygeal'
  | 'thoracic_cage'
  | 'pectoral_girdle'
  | 'upper_arm'
  | 'forearm'
  | 'hand'
  | 'pelvic_girdle'
  | 'thigh'
  | 'lower_leg'
  | 'foot';

export interface AnatomicalBoneDef {
  id: string;
  name: string;
  category: BoneCategory;
  division: BoneDivision;
  parentBoneId: string | null;
  side?: 'left' | 'right' | 'axial';
  restPosition: [number, number, number]; // Relative to parent [x, y, z] in meters
  restRotation: [number, number, number]; // Euler angles [x, y, z]
  length: number;                        // In meters
  radius: number;                        // Average diaphysis radius in meters
  isJointNode: boolean;                  // True if this bone drives kinematics
}

export interface BoneTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export type BoneTransformMap = Record<string, BoneTransform>;

// -------------------------------------------------------------------------
// Muscular System Types
// -------------------------------------------------------------------------

export type MuscleGroupId =
  | 'sternocleidomastoid'
  | 'trapezius'
  | 'pectoralis_major'
  | 'pectoralis_minor'
  | 'rectus_abdominis'
  | 'external_obliques'
  | 'serratus_anterior'
  | 'latissimus_dorsi'
  | 'erector_spinae'
  | 'deltoid_anterior'
  | 'deltoid_lateral'
  | 'deltoid_posterior'
  | 'biceps_brachii'
  | 'brachialis'
  | 'triceps_brachii'
  | 'forearm_flexors'
  | 'forearm_extensors'
  | 'gluteus_maximus'
  | 'gluteus_medius'
  | 'iliopsoas'
  | 'quadriceps_rectus_femoris'
  | 'quadriceps_vastus_lateralis'
  | 'quadriceps_vastus_medialis'
  | 'hamstrings_biceps_femoris'
  | 'hamstrings_semitendinosus'
  | 'adductors'
  | 'gastrocnemius'
  | 'soleus'
  | 'tibialis_anterior';

export interface MuscleAttachment {
  boneId: string;
  localOffset: [number, number, number];
}

export interface AnatomicalMuscleDef {
  id: MuscleGroupId;
  name: string;
  side: 'left' | 'right' | 'bilateral';
  origin: MuscleAttachment;
  insertion: MuscleAttachment;
  baseVolumeCm3: number;
  bellyProfileCurve: number[]; // Profile curve sampling points
  color: string;
}

export type MuscleRenderMode = 'geometric' | 'visual';

// -------------------------------------------------------------------------
// Adipose / Fat Layer Types
// -------------------------------------------------------------------------

export type FatRegionId =
  | 'abdomen'
  | 'hips_gluteal'
  | 'chest_pectoral'
  | 'upper_arms'
  | 'thighs'
  | 'calves'
  | 'back_flanks'
  | 'neck_face';

export type FatDistributionMode = 'regional' | 'uniform';

export interface RegionalFatSensitivity {
  bmiCoefficient: number;
  measurementField: keyof BodyMeasurements;
  measurementCoefficient: number;
  baseThicknessMm: number;
}

export interface RegionalFatThicknessMap {
  abdomen: number;
  hips_gluteal: number;
  chest_pectoral: number;
  upper_arms: number;
  thighs: number;
  calves: number;
  back_flanks: number;
  neck_face: number;
}

export interface AdiposeProfile {
  bmi: number;
  bmiDelta: number;
  overallFatMassKg: number;
  fatPercentageEstimated: number;
  distributionMode: FatDistributionMode;
  regionalThicknessMm: RegionalFatThicknessMap;
}

// -------------------------------------------------------------------------
// Master Anatomical Scale Factors & Configuration
// -------------------------------------------------------------------------

export interface AnatomicalScaleFactors {
  heightScale: number;
  torsoHeightScale: number;
  legLengthScale: number;
  armLengthScale: number;
  shoulderSpanScale: number;
  pelvicWidthScale: number;
  ribCageScale: [number, number, number]; // [x, y, z]
  muscleVolumeMultipliers: Partial<Record<MuscleGroupId, number>>;
  adiposeProfile: AdiposeProfile;
}

export interface LayerVisibilitySettings {
  skeleton: boolean;
  muscles: boolean;
  fat: boolean;
  skin: boolean;
}

export interface LayerOpacitySettings {
  skeleton: number; // 0.0 - 1.0
  muscles: number;
  fat: number;
  skin: number;
}

export interface AnatomyConfig {
  layerVisibility: LayerVisibilitySettings;
  layerOpacity: LayerOpacitySettings;
  muscleMode: MuscleRenderMode;
  fatMode: FatDistributionMode;
  showAnatomicalLabels: boolean;
}

export const DEFAULT_ANATOMY_CONFIG: AnatomyConfig = {
  layerVisibility: {
    skeleton: false,
    muscles: true,
    fat: true,
    skin: true,
  },
  layerOpacity: {
    skeleton: 1.0,
    muscles: 1.0,
    fat: 0.8,
    skin: 1.0,
  },
  muscleMode: 'geometric',
  fatMode: 'regional',
  showAnatomicalLabels: false,
};
