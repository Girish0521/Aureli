import { AnatomicalMuscleDef } from '@/types/anatomy';

/**
 * Major human muscle group registry (~30-40 key muscle groups)
 * Defined with origin and insertion bone anchors for anatomical skinning
 */
export const MUSCLE_REGISTRY: AnatomicalMuscleDef[] = [
  // =========================================================================
  // CHEST & ANTERIOR TORSO
  // =========================================================================
  {
    id: 'pectoralis_major',
    name: 'Pectoralis Major (Left)',
    side: 'left',
    origin: { boneId: 'sternum', localOffset: [-0.02, 0.05, 0] },
    insertion: { boneId: 'humerus_left', localOffset: [0, -0.06, 0.02] },
    baseVolumeCm3: 280,
    bellyProfileCurve: [0.3, 0.8, 1.2, 1.1, 0.6, 0.2],
    color: '#b91c1c',
  },
  {
    id: 'pectoralis_major',
    name: 'Pectoralis Major (Right)',
    side: 'right',
    origin: { boneId: 'sternum', localOffset: [0.02, 0.05, 0] },
    insertion: { boneId: 'humerus_right', localOffset: [0, -0.06, 0.02] },
    baseVolumeCm3: 280,
    bellyProfileCurve: [0.3, 0.8, 1.2, 1.1, 0.6, 0.2],
    color: '#b91c1c',
  },
  {
    id: 'rectus_abdominis',
    name: 'Rectus Abdominis (6-Pack Core)',
    side: 'bilateral',
    origin: { boneId: 'pelvis_root', localOffset: [0, 0, 0.08] },
    insertion: { boneId: 'sternum', localOffset: [0, -0.08, 0] },
    baseVolumeCm3: 320,
    bellyProfileCurve: [0.5, 0.9, 1.0, 1.0, 0.9, 0.6],
    color: '#991b1b',
  },
  {
    id: 'external_obliques',
    name: 'External Obliques (Left)',
    side: 'left',
    origin: { boneId: 'ribs_left_middle', localOffset: [-0.05, 0, 0] },
    insertion: { boneId: 'hip_left', localOffset: [0, 0.02, 0.03] },
    baseVolumeCm3: 220,
    bellyProfileCurve: [0.4, 0.8, 1.0, 0.9, 0.5],
    color: '#a82020',
  },
  {
    id: 'external_obliques',
    name: 'External Obliques (Right)',
    side: 'right',
    origin: { boneId: 'ribs_right_middle', localOffset: [0.05, 0, 0] },
    insertion: { boneId: 'hip_right', localOffset: [0, 0.02, 0.03] },
    baseVolumeCm3: 220,
    bellyProfileCurve: [0.4, 0.8, 1.0, 0.9, 0.5],
    color: '#a82020',
  },

  // =========================================================================
  // SHOULDERS & UPPER ARMS
  // =========================================================================
  {
    id: 'deltoid_anterior',
    name: 'Deltoid Anterior (Left)',
    side: 'left',
    origin: { boneId: 'clavicle_left', localOffset: [-0.06, 0, 0.03] },
    insertion: { boneId: 'humerus_left', localOffset: [0, -0.12, 0] },
    baseVolumeCm3: 160,
    bellyProfileCurve: [0.4, 1.0, 1.3, 0.9, 0.3],
    color: '#dc2626',
  },
  {
    id: 'deltoid_anterior',
    name: 'Deltoid Anterior (Right)',
    side: 'right',
    origin: { boneId: 'clavicle_right', localOffset: [0.06, 0, 0.03] },
    insertion: { boneId: 'humerus_right', localOffset: [0, -0.12, 0] },
    baseVolumeCm3: 160,
    bellyProfileCurve: [0.4, 1.0, 1.3, 0.9, 0.3],
    color: '#dc2626',
  },
  {
    id: 'biceps_brachii',
    name: 'Biceps Brachii (Left)',
    side: 'left',
    origin: { boneId: 'humerus_left', localOffset: [0, -0.04, 0.03] },
    insertion: { boneId: 'radius_left', localOffset: [0, -0.04, 0] },
    baseVolumeCm3: 190,
    bellyProfileCurve: [0.3, 0.8, 1.4, 1.2, 0.6, 0.2],
    color: '#b91c1c',
  },
  {
    id: 'biceps_brachii',
    name: 'Biceps Brachii (Right)',
    side: 'right',
    origin: { boneId: 'humerus_right', localOffset: [0, -0.04, 0.03] },
    insertion: { boneId: 'radius_right', localOffset: [0, -0.04, 0] },
    baseVolumeCm3: 190,
    bellyProfileCurve: [0.3, 0.8, 1.4, 1.2, 0.6, 0.2],
    color: '#b91c1c',
  },
  {
    id: 'triceps_brachii',
    name: 'Triceps Brachii (Left)',
    side: 'left',
    origin: { boneId: 'humerus_left', localOffset: [0, -0.03, -0.03] },
    insertion: { boneId: 'ulna_left', localOffset: [0, 0, -0.02] },
    baseVolumeCm3: 240,
    bellyProfileCurve: [0.4, 1.0, 1.3, 1.1, 0.6, 0.2],
    color: '#991b1b',
  },
  {
    id: 'triceps_brachii',
    name: 'Triceps Brachii (Right)',
    side: 'right',
    origin: { boneId: 'humerus_right', localOffset: [0, -0.03, -0.03] },
    insertion: { boneId: 'ulna_right', localOffset: [0, 0, -0.02] },
    baseVolumeCm3: 240,
    bellyProfileCurve: [0.4, 1.0, 1.3, 1.1, 0.6, 0.2],
    color: '#991b1b',
  },

  // =========================================================================
  // BACK & POSTERIOR TORSO
  // =========================================================================
  {
    id: 'latissimus_dorsi',
    name: 'Latissimus Dorsi (Left)',
    side: 'left',
    origin: { boneId: 't8', localOffset: [-0.03, 0, -0.04] },
    insertion: { boneId: 'humerus_left', localOffset: [0, -0.08, -0.02] },
    baseVolumeCm3: 310,
    bellyProfileCurve: [0.5, 0.9, 1.2, 1.0, 0.6],
    color: '#7f1d1d',
  },
  {
    id: 'latissimus_dorsi',
    name: 'Latissimus Dorsi (Right)',
    side: 'right',
    origin: { boneId: 't8', localOffset: [0.03, 0, -0.04] },
    insertion: { boneId: 'humerus_right', localOffset: [0, -0.08, -0.02] },
    baseVolumeCm3: 310,
    bellyProfileCurve: [0.5, 0.9, 1.2, 1.0, 0.6],
    color: '#7f1d1d',
  },
  {
    id: 'trapezius',
    name: 'Trapezius (Upper & Middle)',
    side: 'bilateral',
    origin: { boneId: 'c1', localOffset: [0, 0, -0.03] },
    insertion: { boneId: 't6', localOffset: [0, 0, -0.03] },
    baseVolumeCm3: 270,
    bellyProfileCurve: [0.6, 1.2, 1.1, 0.8, 0.4],
    color: '#991b1b',
  },

  // =========================================================================
  // GLUTES & HIPS
  // =========================================================================
  {
    id: 'gluteus_maximus',
    name: 'Gluteus Maximus (Left)',
    side: 'left',
    origin: { boneId: 'sacrum', localOffset: [-0.04, 0, -0.03] },
    insertion: { boneId: 'femur_left', localOffset: [0, -0.12, -0.03] },
    baseVolumeCm3: 480,
    bellyProfileCurve: [0.5, 1.1, 1.6, 1.4, 0.8, 0.3],
    color: '#b91c1c',
  },
  {
    id: 'gluteus_maximus',
    name: 'Gluteus Maximus (Right)',
    side: 'right',
    origin: { boneId: 'sacrum', localOffset: [0.04, 0, -0.03] },
    insertion: { boneId: 'femur_right', localOffset: [0, -0.12, -0.03] },
    baseVolumeCm3: 480,
    bellyProfileCurve: [0.5, 1.1, 1.6, 1.4, 0.8, 0.3],
    color: '#b91c1c',
  },

  // =========================================================================
  // THIGHS & LEGS
  // =========================================================================
  {
    id: 'quadriceps_rectus_femoris',
    name: 'Rectus Femoris (Left Quadriceps)',
    side: 'left',
    origin: { boneId: 'hip_left', localOffset: [0, -0.03, 0.04] },
    insertion: { boneId: 'patella_left', localOffset: [0, 0, 0] },
    baseVolumeCm3: 380,
    bellyProfileCurve: [0.4, 0.9, 1.4, 1.3, 0.8, 0.3],
    color: '#dc2626',
  },
  {
    id: 'quadriceps_rectus_femoris',
    name: 'Rectus Femoris (Right Quadriceps)',
    side: 'right',
    origin: { boneId: 'hip_right', localOffset: [0, -0.03, 0.04] },
    insertion: { boneId: 'patella_right', localOffset: [0, 0, 0] },
    baseVolumeCm3: 380,
    bellyProfileCurve: [0.4, 0.9, 1.4, 1.3, 0.8, 0.3],
    color: '#dc2626',
  },
  {
    id: 'hamstrings_biceps_femoris',
    name: 'Hamstrings (Left)',
    side: 'left',
    origin: { boneId: 'hip_left', localOffset: [0, -0.06, -0.03] },
    insertion: { boneId: 'tibia_left', localOffset: [0, -0.04, -0.02] },
    baseVolumeCm3: 320,
    bellyProfileCurve: [0.4, 0.9, 1.3, 1.1, 0.7, 0.3],
    color: '#991b1b',
  },
  {
    id: 'hamstrings_biceps_femoris',
    name: 'Hamstrings (Right)',
    side: 'right',
    origin: { boneId: 'hip_right', localOffset: [0, -0.06, -0.03] },
    insertion: { boneId: 'tibia_right', localOffset: [0, -0.04, -0.02] },
    baseVolumeCm3: 320,
    bellyProfileCurve: [0.4, 0.9, 1.3, 1.1, 0.7, 0.3],
    color: '#991b1b',
  },
  {
    id: 'gastrocnemius',
    name: 'Gastrocnemius (Left Calf)',
    side: 'left',
    origin: { boneId: 'femur_left', localOffset: [0, -0.44, -0.02] },
    insertion: { boneId: 'foot_left', localOffset: [0, 0, -0.04] },
    baseVolumeCm3: 260,
    bellyProfileCurve: [0.4, 1.1, 1.5, 1.2, 0.5, 0.2],
    color: '#b91c1c',
  },
  {
    id: 'gastrocnemius',
    name: 'Gastrocnemius (Right Calf)',
    side: 'right',
    origin: { boneId: 'femur_right', localOffset: [0, -0.44, -0.02] },
    insertion: { boneId: 'foot_right', localOffset: [0, 0, -0.04] },
    baseVolumeCm3: 260,
    bellyProfileCurve: [0.4, 1.1, 1.5, 1.2, 0.5, 0.2],
    color: '#b91c1c',
  },
];
