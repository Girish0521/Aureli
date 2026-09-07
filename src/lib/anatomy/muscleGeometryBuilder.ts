import * as THREE from 'three';
import { AnatomicalMuscleDef } from '@/types/anatomy';

/**
 * Creates a parametric swept 3D muscle geometry between origin and insertion points
 * and computes 4-bone skinning weights.
 */
export function createMuscleGeometry(
  def: AnatomicalMuscleDef,
  originWorld: THREE.Vector3,
  insertionWorld: THREE.Vector3,
  originBoneIndex: number,
  insertionBoneIndex: number,
  volumeScale: number = 1.0
): THREE.BufferGeometry {
  const segmentsLength = 12;
  const segmentsRadial = 12;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const skinIndices: number[] = [];
  const skinWeights: number[] = [];
  const indices: number[] = [];

  const direction = new THREE.Vector3().subVectors(insertionWorld, originWorld);
  const length = direction.length();
  const dirNormalized = direction.clone().normalize();

  // Find perpendicular axes for radial expansion
  const up = Math.abs(dirNormalized.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const right = new THREE.Vector3().crossVectors(dirNormalized, up).normalize();
  const forward = new THREE.Vector3().crossVectors(right, dirNormalized).normalize();

  // Base radius derived from muscle volume
  const baseRadius = Math.sqrt(def.baseVolumeCm3 / (Math.PI * length * 100)) * 0.01 * volumeScale;

  // Generate vertices along muscle length
  for (let i = 0; i <= segmentsLength; i++) {
    const t = i / segmentsLength; // 0 (origin) to 1 (insertion)
    const center = new THREE.Vector3().lerpVectors(originWorld, insertionWorld, t);

    // Sample profile curve for belly shape
    const profileIdx = Math.min(
      def.bellyProfileCurve.length - 1,
      Math.floor(t * def.bellyProfileCurve.length)
    );
    const radiusFactor = def.bellyProfileCurve[profileIdx] || 1.0;
    const currentRadius = baseRadius * radiusFactor;

    // Skin weights: linear blend skinning from origin bone to insertion bone
    const wOrigin = Math.pow(1 - t, 1.5);
    const wInsertion = Math.pow(t, 1.5);
    const totalW = wOrigin + wInsertion || 1.0;
    const normWOrigin = wOrigin / totalW;
    const normWInsertion = wInsertion / totalW;

    for (let j = 0; j <= segmentsRadial; j++) {
      const theta = (j / segmentsRadial) * Math.PI * 2;
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      const radialOffset = new THREE.Vector3()
        .addScaledVector(right, cosTheta * currentRadius)
        .addScaledVector(forward, sinTheta * currentRadius);

      const vertex = new THREE.Vector3().addVectors(center, radialOffset);
      const normal = radialOffset.clone().normalize();

      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(j / segmentsRadial, t);

      // 4-weight skinning format (Three.js BufferAttribute)
      skinIndices.push(originBoneIndex, insertionBoneIndex, 0, 0);
      skinWeights.push(normWOrigin, normWInsertion, 0, 0);
    }
  }

  // Generate indices for faces
  for (let i = 0; i < segmentsLength; i++) {
    for (let j = 0; j < segmentsRadial; j++) {
      const first = i * (segmentsRadial + 1) + j;
      const second = first + segmentsRadial + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
  geometry.setIndex(indices);

  return geometry;
}

/**
 * Creates visual/geometric material for muscles
 */
export function createMuscleMaterial(color: string = '#b91c1c'): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.1,
    bumpScale: 0.02,
  });
}
