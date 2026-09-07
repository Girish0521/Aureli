import * as THREE from 'three';
import { AnatomicalScaleFactors } from '@/types/anatomy';
import { BONE_REGISTRY, getHierarchicalBoneOrder } from './boneRegistry';

export interface BuiltSkeleton {
  skeleton: THREE.Skeleton;
  rootBone: THREE.Bone;
  boneMap: Map<string, THREE.Bone>;
  boneArray: THREE.Bone[];
}

/**
 * Creates the Three.js Bone hierarchy and Skeleton instance
 */
export function createAnatomicalSkeleton(): BuiltSkeleton {
  const boneMap = new Map<string, THREE.Bone>();
  const boneArray: THREE.Bone[] = [];
  const boneOrder = getHierarchicalBoneOrder();

  // 1. Create all Bone instances
  boneOrder.forEach(boneId => {
    const bone = new THREE.Bone();
    bone.name = boneId;
    boneMap.set(boneId, bone);
    boneArray.push(bone);
  });

  // 2. Set up hierarchy and rest transforms
  boneOrder.forEach(boneId => {
    const boneDef = BONE_REGISTRY[boneId];
    const bone = boneMap.get(boneId)!;

    // Set rest position
    bone.position.set(...boneDef.restPosition);

    // Set rest rotation
    bone.rotation.set(...boneDef.restRotation);

    // Attach to parent
    if (boneDef.parentBoneId) {
      const parentBone = boneMap.get(boneDef.parentBoneId);
      if (parentBone) {
        parentBone.add(bone);
      }
    }
  });

  const rootBone = boneMap.get('pelvis_root')!;

  // Update world matrices before binding to skeleton
  rootBone.updateMatrixWorld(true);

  // 3. Create Three.js Skeleton
  const skeleton = new THREE.Skeleton(boneArray);

  return {
    skeleton,
    rootBone,
    boneMap,
    boneArray,
  };
}

/**
 * Apply measurement-based scale factors to the bone hierarchy
 */
export function updateSkeletonTransforms(
  boneMap: Map<string, THREE.Bone>,
  factors: AnatomicalScaleFactors
): void {
  // 1. Height scales the spine and legs
  const spineBones = [
    'l5', 'l4', 'l3', 'l2', 'l1',
    't12', 't11', 't10', 't9', 't8', 't7', 't6', 't5', 't4', 't3', 't2', 't1',
    'c7', 'c6', 'c5', 'c4', 'c3', 'c2', 'c1', 'skull_base'
  ];

  spineBones.forEach(boneId => {
    const bone = boneMap.get(boneId);
    const boneDef = BONE_REGISTRY[boneId];
    if (bone && boneDef) {
      // Scale vertical segment lengths
      bone.position.y = boneDef.restPosition[1] * factors.torsoHeightScale;
    }
  });

  // 2. Shoulder width scales clavicle spread and arm positioning
  const leftClavicle = boneMap.get('clavicle_left');
  const rightClavicle = boneMap.get('clavicle_right');
  if (leftClavicle && BONE_REGISTRY.clavicle_left) {
    leftClavicle.position.x = BONE_REGISTRY.clavicle_left.restPosition[0] * factors.shoulderSpanScale;
  }
  if (rightClavicle && BONE_REGISTRY.clavicle_right) {
    rightClavicle.position.x = BONE_REGISTRY.clavicle_right.restPosition[0] * factors.shoulderSpanScale;
  }

  // 3. Pelvis / Hips width
  const leftHip = boneMap.get('hip_left');
  const rightHip = boneMap.get('hip_right');
  if (leftHip && BONE_REGISTRY.hip_left) {
    leftHip.position.x = BONE_REGISTRY.hip_left.restPosition[0] * factors.pelvicWidthScale;
  }
  if (rightHip && BONE_REGISTRY.hip_right) {
    rightHip.position.x = BONE_REGISTRY.hip_right.restPosition[0] * factors.pelvicWidthScale;
  }

  // 4. Arm lengths
  const armBones = [
    { id: 'humerus_left', scale: factors.armLengthScale },
    { id: 'radius_left', scale: factors.armLengthScale },
    { id: 'ulna_left', scale: factors.armLengthScale },
    { id: 'hand_left', scale: factors.armLengthScale },
    { id: 'humerus_right', scale: factors.armLengthScale },
    { id: 'radius_right', scale: factors.armLengthScale },
    { id: 'ulna_right', scale: factors.armLengthScale },
    { id: 'hand_right', scale: factors.armLengthScale },
  ];

  armBones.forEach(({ id, scale }) => {
    const bone = boneMap.get(id);
    const boneDef = BONE_REGISTRY[id];
    if (bone && boneDef) {
      bone.position.y = boneDef.restPosition[1] * scale;
    }
  });

  // 5. Leg lengths
  const legBones = [
    { id: 'femur_left', scale: factors.legLengthScale },
    { id: 'tibia_left', scale: factors.legLengthScale },
    { id: 'fibula_left', scale: factors.legLengthScale },
    { id: 'patella_left', scale: factors.legLengthScale },
    { id: 'femur_right', scale: factors.legLengthScale },
    { id: 'tibia_right', scale: factors.legLengthScale },
    { id: 'fibula_right', scale: factors.legLengthScale },
    { id: 'patella_right', scale: factors.legLengthScale },
  ];

  legBones.forEach(({ id, scale }) => {
    const bone = boneMap.get(id);
    const boneDef = BONE_REGISTRY[id];
    if (bone && boneDef) {
      bone.position.y = boneDef.restPosition[1] * scale;
    }
  });

  // 6. Rib cage width and depth
  const ribBones = [
    'ribs_left_upper', 'ribs_right_upper',
    'ribs_left_middle', 'ribs_right_middle',
    'ribs_left_lower', 'ribs_right_lower'
  ];

  ribBones.forEach(boneId => {
    const bone = boneMap.get(boneId);
    const boneDef = BONE_REGISTRY[boneId];
    if (bone && boneDef) {
      bone.position.x = boneDef.restPosition[0] * factors.ribCageScale[0];
      bone.position.z = boneDef.restPosition[2] * factors.ribCageScale[2];
    }
  });

  const sternum = boneMap.get('sternum');
  if (sternum && BONE_REGISTRY.sternum) {
    sternum.position.z = BONE_REGISTRY.sternum.restPosition[2] * factors.ribCageScale[2];
  }
}

/**
 * Creates visual procedural bone meshes for all anatomical bones
 */
export function createBoneMeshHierarchy(boneMap: Map<string, THREE.Bone>): THREE.Group {
  const visualGroup = new THREE.Group();
  visualGroup.name = 'VisualBones';

  const boneMaterial = new THREE.MeshStandardMaterial({
    color: '#e5e1d8',
    roughness: 0.6,
    metalness: 0.1,
  });

  const jointMaterial = new THREE.MeshStandardMaterial({
    color: '#d4cebe',
    roughness: 0.7,
    metalness: 0.05,
  });

  Object.entries(BONE_REGISTRY).forEach(([boneId, boneDef]) => {
    const bone = boneMap.get(boneId);
    if (!bone) return;

    let mesh: THREE.Mesh | null = null;

    // Procedural geometry matched to anatomical bone type
    switch (boneDef.category) {
      case 'cranial': {
        const geom = new THREE.SphereGeometry(boneDef.radius, 16, 16);
        geom.scale(1, 1.15, 1.1);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'facial': {
        const geom = new THREE.BoxGeometry(boneDef.radius * 2.5, 0.03, boneDef.length);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'vertebral_cervical':
      case 'vertebral_thoracic':
      case 'vertebral_lumbar': {
        const geom = new THREE.CylinderGeometry(boneDef.radius, boneDef.radius * 1.1, boneDef.length, 12);
        mesh = new THREE.Mesh(geom, jointMaterial);
        break;
      }

      case 'vertebral_sacrococcygeal': {
        const geom = new THREE.ConeGeometry(boneDef.radius, boneDef.length, 12);
        geom.rotateX(Math.PI);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'thoracic_cage': {
        if (boneDef.id === 'sternum') {
          const geom = new THREE.BoxGeometry(0.04, boneDef.length, 0.015);
          mesh = new THREE.Mesh(geom, boneMaterial);
        } else {
          // Curved rib geometry
          const geom = new THREE.TorusGeometry(boneDef.length * 0.4, boneDef.radius, 8, 16, Math.PI * 0.7);
          geom.rotateX(Math.PI / 2);
          mesh = new THREE.Mesh(geom, boneMaterial);
        }
        break;
      }

      case 'pelvic_girdle': {
        const geom = new THREE.TorusGeometry(boneDef.length * 0.5, boneDef.radius * 0.5, 8, 16, Math.PI);
        geom.rotateX(Math.PI / 2);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'pectoral_girdle': {
        const geom = new THREE.CylinderGeometry(boneDef.radius, boneDef.radius, boneDef.length, 8);
        geom.rotateZ(Math.PI / 2);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'upper_arm':
      case 'forearm':
      case 'thigh':
      case 'lower_leg': {
        // Long bones: Diaphysis with flared epiphyses
        const geom = new THREE.CylinderGeometry(
          boneDef.radius * 1.15, // Upper epiphysis
          boneDef.radius * 1.15, // Lower epiphysis
          boneDef.length,
          12
        );
        geom.translate(0, -boneDef.length / 2, 0);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'hand': {
        const geom = new THREE.BoxGeometry(0.07, boneDef.length, 0.025);
        geom.translate(0, -boneDef.length / 2, 0);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }

      case 'foot': {
        const geom = new THREE.BoxGeometry(0.08, 0.04, boneDef.length);
        geom.translate(0, 0, boneDef.length / 2);
        mesh = new THREE.Mesh(geom, boneMaterial);
        break;
      }
    }

    if (mesh) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = `Mesh_${boneId}`;
      bone.add(mesh);
    }
  });

  return visualGroup;
}
