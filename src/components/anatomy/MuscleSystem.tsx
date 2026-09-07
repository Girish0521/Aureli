'use client';

import { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AnatomicalScaleFactors, MuscleRenderMode } from '@/types/anatomy';
import { MUSCLE_REGISTRY } from '@/lib/anatomy/muscleRegistry';
import { createMuscleGeometry, createMuscleMaterial } from '@/lib/anatomy/muscleGeometryBuilder';

interface MuscleSystemProps {
  scaleFactors: AnatomicalScaleFactors;
  mode?: MuscleRenderMode;
  skeleton?: THREE.Skeleton;
  boneMap?: Map<string, THREE.Bone>;
  opacity?: number;
  visible?: boolean;
}

export default function MuscleSystem({
  scaleFactors,
  mode = 'geometric',
  skeleton,
  boneMap,
  opacity = 1.0,
  visible = true,
}: MuscleSystemProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Compute skinned muscle meshes
  const muscleMeshes = useMemo(() => {
    if (!boneMap || !skeleton || mode === 'visual' || !visible) {
      return [];
    }

    const meshes: THREE.SkinnedMesh[] = [];

    MUSCLE_REGISTRY.forEach((def) => {
      const originBone = boneMap.get(def.origin.boneId);
      const insertionBone = boneMap.get(def.insertion.boneId);

      if (!originBone || !insertionBone) return;

      const originWorld = new THREE.Vector3();
      const insertionWorld = new THREE.Vector3();

      originBone.getWorldPosition(originWorld);
      originWorld.add(new THREE.Vector3(...def.origin.localOffset));

      insertionBone.getWorldPosition(insertionWorld);
      insertionWorld.add(new THREE.Vector3(...def.insertion.localOffset));

      const originBoneIdx = skeleton.bones.indexOf(originBone);
      const insertionBoneIdx = skeleton.bones.indexOf(insertionBone);

      const volumeScale = scaleFactors.muscleVolumeMultipliers[def.id] || 1.0;

      const geometry = createMuscleGeometry(
        def,
        originWorld,
        insertionWorld,
        Math.max(0, originBoneIdx),
        Math.max(0, insertionBoneIdx),
        volumeScale
      );

      const material = createMuscleMaterial(def.color);
      material.transparent = opacity < 1.0;
      material.opacity = opacity;

      const skinnedMesh = new THREE.SkinnedMesh(geometry, material);
      skinnedMesh.bind(skeleton);
      skinnedMesh.castShadow = true;
      skinnedMesh.name = `Muscle_${def.name}`;

      meshes.push(skinnedMesh);
    });

    return meshes;
  }, [boneMap, skeleton, scaleFactors, mode, visible, opacity]);

  // Clean up WebGL resources when meshes change or component unmounts
  useEffect(() => {
    return () => {
      muscleMeshes.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) mesh.material.dispose();
      });
    };
  }, [muscleMeshes]);

  if (!visible || !boneMap || !skeleton) return null;

  return (
    <group ref={groupRef} name="MuscleSystem">
      {muscleMeshes.map((mesh, idx) => (
        <primitive key={idx} object={mesh} />
      ))}
    </group>
  );
}
