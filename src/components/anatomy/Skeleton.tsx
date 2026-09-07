'use client';

import { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { AnatomicalScaleFactors } from '@/types/anatomy';
import { BuiltSkeleton, createAnatomicalSkeleton, createBoneMeshHierarchy, updateSkeletonTransforms } from '@/lib/anatomy/skeletonBuilder';

interface SkeletonProps {
  scaleFactors: AnatomicalScaleFactors;
  opacity?: number;
  visible?: boolean;
  skeletonData?: BuiltSkeleton;
}

export default function Skeleton({
  scaleFactors,
  opacity = 1.0,
  visible = true,
  skeletonData,
}: SkeletonProps) {
  // If skeletonData is provided from parent, reuse it; otherwise create internal instance
  const internalSkeleton = useMemo<BuiltSkeleton>(() => {
    if (skeletonData) return skeletonData;
    const built = createAnatomicalSkeleton();
    createBoneMeshHierarchy(built.boneMap);
    return built;
  }, [skeletonData]);

  const { rootBone, boneMap, skeleton } = skeletonData || internalSkeleton;

  // Update bone transforms when scale factors change
  useEffect(() => {
    if (boneMap && rootBone && skeleton) {
      updateSkeletonTransforms(boneMap, scaleFactors);
      rootBone.updateMatrixWorld(true);
      skeleton.update();
    }
  }, [boneMap, scaleFactors, rootBone, skeleton]);

  // Adjust material opacity cleanly across bone meshes
  useEffect(() => {
    if (!rootBone) return;

    rootBone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.Material) {
            mat.transparent = opacity < 1.0;
            mat.opacity = opacity;
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [rootBone, opacity]);

  if (!visible || !rootBone) return null;

  return <primitive object={rootBone} />;
}
