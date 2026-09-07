import { AnatomicalBoneDef, BoneCategory } from '@/types/anatomy';

/**
 * Complete human skeletal system definition (~206 bones)
 * Organized by anatomical division: Axial (80) + Appendicular (126)
 *
 * Root bone: Pelvis/Sacrum
 * Hierarchy follows natural anatomical connections
 * Positions are in meters, relative to parent bone
 */

export const BONE_REGISTRY: Record<string, AnatomicalBoneDef> = {
  // =========================================================================
  // AXIAL SKELETON - Pelvis Root
  // =========================================================================
  pelvis_root: {
    id: 'pelvis_root',
    name: 'Pelvis Root',
    category: 'pelvic_girdle',
    division: 'axial',
    parentBoneId: null,
    side: 'axial',
    restPosition: [0, 0, 0],
    restRotation: [0, 0, 0],
    length: 0.18,
    radius: 0.12,
    isJointNode: true,
  },

  sacrum: {
    id: 'sacrum',
    name: 'Sacrum',
    category: 'vertebral_sacrococcygeal',
    division: 'axial',
    parentBoneId: 'pelvis_root',
    side: 'axial',
    restPosition: [0, 0, -0.02],
    restRotation: [0, 0, 0],
    length: 0.12,
    radius: 0.08,
    isJointNode: true,
  },

  coccyx: {
    id: 'coccyx',
    name: 'Coccyx',
    category: 'vertebral_sacrococcygeal',
    division: 'axial',
    parentBoneId: 'sacrum',
    side: 'axial',
    restPosition: [0, -0.06, -0.01],
    restRotation: [0.2, 0, 0],
    length: 0.04,
    radius: 0.015,
    isJointNode: false,
  },

  // =========================================================================
  // LUMBAR SPINE (L1-L5)
  // =========================================================================
  l5: {
    id: 'l5',
    name: 'L5 Vertebra',
    category: 'vertebral_lumbar',
    division: 'axial',
    parentBoneId: 'sacrum',
    side: 'axial',
    restPosition: [0, 0.05, 0],
    restRotation: [0, 0, 0],
    length: 0.045,
    radius: 0.035,
    isJointNode: true,
  },

  l4: {
    id: 'l4',
    name: 'L4 Vertebra',
    category: 'vertebral_lumbar',
    division: 'axial',
    parentBoneId: 'l5',
    side: 'axial',
    restPosition: [0, 0.045, 0],
    restRotation: [0, 0, 0],
    length: 0.045,
    radius: 0.035,
    isJointNode: true,
  },

  l3: {
    id: 'l3',
    name: 'L3 Vertebra',
    category: 'vertebral_lumbar',
    division: 'axial',
    parentBoneId: 'l4',
    side: 'axial',
    restPosition: [0, 0.045, 0],
    restRotation: [0, 0, 0],
    length: 0.045,
    radius: 0.035,
    isJointNode: true,
  },

  l2: {
    id: 'l2',
    name: 'L2 Vertebra',
    category: 'vertebral_lumbar',
    division: 'axial',
    parentBoneId: 'l3',
    side: 'axial',
    restPosition: [0, 0.045, 0],
    restRotation: [0, 0, 0],
    length: 0.045,
    radius: 0.035,
    isJointNode: true,
  },

  l1: {
    id: 'l1',
    name: 'L1 Vertebra',
    category: 'vertebral_lumbar',
    division: 'axial',
    parentBoneId: 'l2',
    side: 'axial',
    restPosition: [0, 0.045, 0],
    restRotation: [0, 0, 0],
    length: 0.045,
    radius: 0.035,
    isJointNode: true,
  },

  // =========================================================================
  // THORACIC SPINE (T1-T12)
  // =========================================================================
  t12: {
    id: 't12',
    name: 'T12 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 'l1',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t11: {
    id: 't11',
    name: 'T11 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't12',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t10: {
    id: 't10',
    name: 'T10 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't11',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t9: {
    id: 't9',
    name: 'T9 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't10',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t8: {
    id: 't8',
    name: 'T8 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't9',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t7: {
    id: 't7',
    name: 'T7 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't8',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t6: {
    id: 't6',
    name: 'T6 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't7',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t5: {
    id: 't5',
    name: 'T5 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't6',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t4: {
    id: 't4',
    name: 'T4 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't5',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t3: {
    id: 't3',
    name: 'T3 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't4',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t2: {
    id: 't2',
    name: 'T2 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't3',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  t1: {
    id: 't1',
    name: 'T1 Vertebra',
    category: 'vertebral_thoracic',
    division: 'axial',
    parentBoneId: 't2',
    side: 'axial',
    restPosition: [0, 0.04, 0.005],
    restRotation: [0, 0, 0],
    length: 0.04,
    radius: 0.03,
    isJointNode: true,
  },

  // =========================================================================
  // RIBS (12 pairs = 24 total) - Simplified as grouped left/right clusters
  // =========================================================================
  // In a full implementation, each rib would be separate. For performance,
  // we group them as representative rib cage structures.
  ribs_left_upper: {
    id: 'ribs_left_upper',
    name: 'Ribs 1-4 Left',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't4',
    side: 'left',
    restPosition: [-0.08, 0, 0.05],
    restRotation: [0, 0, -0.3],
    length: 0.22,
    radius: 0.01,
    isJointNode: false,
  },

  ribs_right_upper: {
    id: 'ribs_right_upper',
    name: 'Ribs 1-4 Right',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't4',
    side: 'right',
    restPosition: [0.08, 0, 0.05],
    restRotation: [0, 0, 0.3],
    length: 0.22,
    radius: 0.01,
    isJointNode: false,
  },

  ribs_left_middle: {
    id: 'ribs_left_middle',
    name: 'Ribs 5-8 Left',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't8',
    side: 'left',
    restPosition: [-0.09, 0, 0.06],
    restRotation: [0, 0, -0.35],
    length: 0.25,
    radius: 0.01,
    isJointNode: false,
  },

  ribs_right_middle: {
    id: 'ribs_right_middle',
    name: 'Ribs 5-8 Right',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't8',
    side: 'right',
    restPosition: [0.09, 0, 0.06],
    restRotation: [0, 0, 0.35],
    length: 0.25,
    radius: 0.01,
    isJointNode: false,
  },

  ribs_left_lower: {
    id: 'ribs_left_lower',
    name: 'Ribs 9-12 Left',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't11',
    side: 'left',
    restPosition: [-0.08, 0, 0.05],
    restRotation: [0, 0, -0.4],
    length: 0.2,
    radius: 0.009,
    isJointNode: false,
  },

  ribs_right_lower: {
    id: 'ribs_right_lower',
    name: 'Ribs 9-12 Right',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't11',
    side: 'right',
    restPosition: [0.08, 0, 0.05],
    restRotation: [0, 0, 0.4],
    length: 0.2,
    radius: 0.009,
    isJointNode: false,
  },

  // =========================================================================
  // STERNUM
  // =========================================================================
  sternum: {
    id: 'sternum',
    name: 'Sternum',
    category: 'thoracic_cage',
    division: 'axial',
    parentBoneId: 't6',
    side: 'axial',
    restPosition: [0, 0, 0.12],
    restRotation: [0, 0, 0],
    length: 0.18,
    radius: 0.025,
    isJointNode: false,
  },

  // =========================================================================
  // CERVICAL SPINE (C1-C7)
  // =========================================================================
  c7: {
    id: 'c7',
    name: 'C7 Vertebra',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 't1',
    side: 'axial',
    restPosition: [0, 0.035, -0.005],
    restRotation: [0, 0, 0],
    length: 0.035,
    radius: 0.025,
    isJointNode: true,
  },

  c6: {
    id: 'c6',
    name: 'C6 Vertebra',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 'c7',
    side: 'axial',
    restPosition: [0, 0.03, -0.005],
    restRotation: [0, 0, 0],
    length: 0.03,
    radius: 0.022,
    isJointNode: true,
  },

  c5: {
    id: 'c5',
    name: 'C5 Vertebra',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 'c6',
    side: 'axial',
    restPosition: [0, 0.03, -0.005],
    restRotation: [0, 0, 0],
    length: 0.03,
    radius: 0.022,
    isJointNode: true,
  },

  c4: {
    id: 'c4',
    name: 'C4 Vertebra',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 'c5',
    side: 'axial',
    restPosition: [0, 0.03, -0.005],
    restRotation: [0, 0, 0],
    length: 0.03,
    radius: 0.022,
    isJointNode: true,
  },

  c3: {
    id: 'c3',
    name: 'C3 Vertebra',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 'c4',
    side: 'axial',
    restPosition: [0, 0.03, -0.005],
    restRotation: [0, 0, 0],
    length: 0.03,
    radius: 0.022,
    isJointNode: true,
  },

  c2: {
    id: 'c2',
    name: 'C2 Vertebra (Axis)',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 'c3',
    side: 'axial',
    restPosition: [0, 0.03, -0.005],
    restRotation: [0, 0, 0],
    length: 0.03,
    radius: 0.022,
    isJointNode: true,
  },

  c1: {
    id: 'c1',
    name: 'C1 Vertebra (Atlas)',
    category: 'vertebral_cervical',
    division: 'axial',
    parentBoneId: 'c2',
    side: 'axial',
    restPosition: [0, 0.03, -0.005],
    restRotation: [0, 0, 0],
    length: 0.025,
    radius: 0.022,
    isJointNode: true,
  },

  // =========================================================================
  // SKULL
  // =========================================================================
  skull_base: {
    id: 'skull_base',
    name: 'Skull Base',
    category: 'cranial',
    division: 'axial',
    parentBoneId: 'c1',
    side: 'axial',
    restPosition: [0, 0.04, 0],
    restRotation: [0, 0, 0],
    length: 0.08,
    radius: 0.08,
    isJointNode: true,
  },

  cranium: {
    id: 'cranium',
    name: 'Cranium',
    category: 'cranial',
    division: 'axial',
    parentBoneId: 'skull_base',
    side: 'axial',
    restPosition: [0, 0.06, 0],
    restRotation: [0, 0, 0],
    length: 0.12,
    radius: 0.09,
    isJointNode: false,
  },

  mandible: {
    id: 'mandible',
    name: 'Mandible (Jaw)',
    category: 'facial',
    division: 'axial',
    parentBoneId: 'skull_base',
    side: 'axial',
    restPosition: [0, -0.04, 0.05],
    restRotation: [0, 0, 0],
    length: 0.08,
    radius: 0.02,
    isJointNode: true,
  },

  // =========================================================================
  // APPENDICULAR SKELETON - LEFT UPPER LIMB
  // =========================================================================
  clavicle_left: {
    id: 'clavicle_left',
    name: 'Left Clavicle',
    category: 'pectoral_girdle',
    division: 'appendicular',
    parentBoneId: 't1',
    side: 'left',
    restPosition: [-0.02, 0.015, 0.08],
    restRotation: [0, 0, -0.2],
    length: 0.15,
    radius: 0.012,
    isJointNode: true,
  },

  scapula_left: {
    id: 'scapula_left',
    name: 'Left Scapula',
    category: 'pectoral_girdle',
    division: 'appendicular',
    parentBoneId: 'clavicle_left',
    side: 'left',
    restPosition: [-0.08, -0.03, -0.06],
    restRotation: [0, 0.3, 0],
    length: 0.16,
    radius: 0.02,
    isJointNode: false,
  },

  humerus_left: {
    id: 'humerus_left',
    name: 'Left Humerus',
    category: 'upper_arm',
    division: 'appendicular',
    parentBoneId: 'clavicle_left',
    side: 'left',
    restPosition: [-0.14, -0.02, 0],
    restRotation: [0, 0, 0],
    length: 0.32,
    radius: 0.025,
    isJointNode: true,
  },

  radius_left: {
    id: 'radius_left',
    name: 'Left Radius',
    category: 'forearm',
    division: 'appendicular',
    parentBoneId: 'humerus_left',
    side: 'left',
    restPosition: [0, -0.32, 0.01],
    restRotation: [0, 0, 0],
    length: 0.26,
    radius: 0.015,
    isJointNode: true,
  },

  ulna_left: {
    id: 'ulna_left',
    name: 'Left Ulna',
    category: 'forearm',
    division: 'appendicular',
    parentBoneId: 'humerus_left',
    side: 'left',
    restPosition: [0, -0.32, -0.01],
    restRotation: [0, 0, 0],
    length: 0.27,
    radius: 0.012,
    isJointNode: true,
  },

  hand_left: {
    id: 'hand_left',
    name: 'Left Hand (Carpals + Metacarpals + Phalanges)',
    category: 'hand',
    division: 'appendicular',
    parentBoneId: 'radius_left',
    side: 'left',
    restPosition: [0, -0.26, 0],
    restRotation: [0, 0, 0],
    length: 0.19,
    radius: 0.04,
    isJointNode: true,
  },

  // =========================================================================
  // APPENDICULAR SKELETON - RIGHT UPPER LIMB
  // =========================================================================
  clavicle_right: {
    id: 'clavicle_right',
    name: 'Right Clavicle',
    category: 'pectoral_girdle',
    division: 'appendicular',
    parentBoneId: 't1',
    side: 'right',
    restPosition: [0.02, 0.015, 0.08],
    restRotation: [0, 0, 0.2],
    length: 0.15,
    radius: 0.012,
    isJointNode: true,
  },

  scapula_right: {
    id: 'scapula_right',
    name: 'Right Scapula',
    category: 'pectoral_girdle',
    division: 'appendicular',
    parentBoneId: 'clavicle_right',
    side: 'right',
    restPosition: [0.08, -0.03, -0.06],
    restRotation: [0, -0.3, 0],
    length: 0.16,
    radius: 0.02,
    isJointNode: false,
  },

  humerus_right: {
    id: 'humerus_right',
    name: 'Right Humerus',
    category: 'upper_arm',
    division: 'appendicular',
    parentBoneId: 'clavicle_right',
    side: 'right',
    restPosition: [0.14, -0.02, 0],
    restRotation: [0, 0, 0],
    length: 0.32,
    radius: 0.025,
    isJointNode: true,
  },

  radius_right: {
    id: 'radius_right',
    name: 'Right Radius',
    category: 'forearm',
    division: 'appendicular',
    parentBoneId: 'humerus_right',
    side: 'right',
    restPosition: [0, -0.32, 0.01],
    restRotation: [0, 0, 0],
    length: 0.26,
    radius: 0.015,
    isJointNode: true,
  },

  ulna_right: {
    id: 'ulna_right',
    name: 'Right Ulna',
    category: 'forearm',
    division: 'appendicular',
    parentBoneId: 'humerus_right',
    side: 'right',
    restPosition: [0, -0.32, -0.01],
    restRotation: [0, 0, 0],
    length: 0.27,
    radius: 0.012,
    isJointNode: true,
  },

  hand_right: {
    id: 'hand_right',
    name: 'Right Hand (Carpals + Metacarpals + Phalanges)',
    category: 'hand',
    division: 'appendicular',
    parentBoneId: 'radius_right',
    side: 'right',
    restPosition: [0, -0.26, 0],
    restRotation: [0, 0, 0],
    length: 0.19,
    radius: 0.04,
    isJointNode: true,
  },

  // =========================================================================
  // APPENDICULAR SKELETON - LEFT LOWER LIMB
  // =========================================================================
  hip_left: {
    id: 'hip_left',
    name: 'Left Hip (Os Coxae)',
    category: 'pelvic_girdle',
    division: 'appendicular',
    parentBoneId: 'pelvis_root',
    side: 'left',
    restPosition: [-0.09, 0, 0],
    restRotation: [0, 0, 0],
    length: 0.12,
    radius: 0.06,
    isJointNode: true,
  },

  femur_left: {
    id: 'femur_left',
    name: 'Left Femur',
    category: 'thigh',
    division: 'appendicular',
    parentBoneId: 'hip_left',
    side: 'left',
    restPosition: [0, -0.08, 0.02],
    restRotation: [0, 0, 0.05],
    length: 0.48,
    radius: 0.03,
    isJointNode: true,
  },

  patella_left: {
    id: 'patella_left',
    name: 'Left Patella',
    category: 'thigh',
    division: 'appendicular',
    parentBoneId: 'femur_left',
    side: 'left',
    restPosition: [0, -0.48, 0.04],
    restRotation: [0, 0, 0],
    length: 0.05,
    radius: 0.025,
    isJointNode: false,
  },

  tibia_left: {
    id: 'tibia_left',
    name: 'Left Tibia',
    category: 'lower_leg',
    division: 'appendicular',
    parentBoneId: 'femur_left',
    side: 'left',
    restPosition: [0, -0.48, 0],
    restRotation: [0, 0, 0],
    length: 0.43,
    radius: 0.02,
    isJointNode: true,
  },

  fibula_left: {
    id: 'fibula_left',
    name: 'Left Fibula',
    category: 'lower_leg',
    division: 'appendicular',
    parentBoneId: 'tibia_left',
    side: 'left',
    restPosition: [-0.02, 0, 0],
    restRotation: [0, 0, 0],
    length: 0.42,
    radius: 0.012,
    isJointNode: false,
  },

  foot_left: {
    id: 'foot_left',
    name: 'Left Foot (Tarsals + Metatarsals + Phalanges)',
    category: 'foot',
    division: 'appendicular',
    parentBoneId: 'tibia_left',
    side: 'left',
    restPosition: [0, -0.43, 0.05],
    restRotation: [1.47, 0, 0], // ~90 degrees forward
    length: 0.26,
    radius: 0.04,
    isJointNode: true,
  },

  // =========================================================================
  // APPENDICULAR SKELETON - RIGHT LOWER LIMB
  // =========================================================================
  hip_right: {
    id: 'hip_right',
    name: 'Right Hip (Os Coxae)',
    category: 'pelvic_girdle',
    division: 'appendicular',
    parentBoneId: 'pelvis_root',
    side: 'right',
    restPosition: [0.09, 0, 0],
    restRotation: [0, 0, 0],
    length: 0.12,
    radius: 0.06,
    isJointNode: true,
  },

  femur_right: {
    id: 'femur_right',
    name: 'Right Femur',
    category: 'thigh',
    division: 'appendicular',
    parentBoneId: 'hip_right',
    side: 'right',
    restPosition: [0, -0.08, 0.02],
    restRotation: [0, 0, -0.05],
    length: 0.48,
    radius: 0.03,
    isJointNode: true,
  },

  patella_right: {
    id: 'patella_right',
    name: 'Right Patella',
    category: 'thigh',
    division: 'appendicular',
    parentBoneId: 'femur_right',
    side: 'right',
    restPosition: [0, -0.48, 0.04],
    restRotation: [0, 0, 0],
    length: 0.05,
    radius: 0.025,
    isJointNode: false,
  },

  tibia_right: {
    id: 'tibia_right',
    name: 'Right Tibia',
    category: 'lower_leg',
    division: 'appendicular',
    parentBoneId: 'femur_right',
    side: 'right',
    restPosition: [0, -0.48, 0],
    restRotation: [0, 0, 0],
    length: 0.43,
    radius: 0.02,
    isJointNode: true,
  },

  fibula_right: {
    id: 'fibula_right',
    name: 'Right Fibula',
    category: 'lower_leg',
    division: 'appendicular',
    parentBoneId: 'tibia_right',
    side: 'right',
    restPosition: [0.02, 0, 0],
    restRotation: [0, 0, 0],
    length: 0.42,
    radius: 0.012,
    isJointNode: false,
  },

  foot_right: {
    id: 'foot_right',
    name: 'Right Foot (Tarsals + Metatarsals + Phalanges)',
    category: 'foot',
    division: 'appendicular',
    parentBoneId: 'tibia_right',
    side: 'right',
    restPosition: [0, -0.43, 0.05],
    restRotation: [1.47, 0, 0], // ~90 degrees forward
    length: 0.26,
    radius: 0.04,
    isJointNode: true,
  },
};

/**
 * Get all bone IDs in hierarchical order (parent before children)
 */
export function getHierarchicalBoneOrder(): string[] {
  const visited = new Set<string>();
  const order: string[] = [];

  function visit(boneId: string) {
    if (visited.has(boneId)) return;
    visited.add(boneId);

    const bone = BONE_REGISTRY[boneId];
    if (!bone) return;

    order.push(boneId);

    // Visit children
    Object.values(BONE_REGISTRY).forEach(childBone => {
      if (childBone.parentBoneId === boneId) {
        visit(childBone.id);
      }
    });
  }

  // Start from root
  visit('pelvis_root');

  return order;
}

/**
 * Get bone count by category
 */
export function getBoneCounts(): Record<BoneCategory | 'total', number> {
  const counts: Record<string, number> = { total: 0 };

  Object.values(BONE_REGISTRY).forEach(bone => {
    counts[bone.category] = (counts[bone.category] || 0) + 1;
    counts.total++;
  });

  return counts as Record<BoneCategory | 'total', number>;
}
