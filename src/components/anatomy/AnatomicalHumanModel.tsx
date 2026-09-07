'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BodyMeasurements } from '@/types';
import { AnatomyConfig, AnatomicalScaleFactors } from '@/types/anatomy';
import { computeAnatomicalScaleFactors } from '@/lib/anatomy/anatomicalMapper';
import { getDefaultMeasurements } from '@/lib/measurements';
import {
  BuiltSkeleton,
  createAnatomicalSkeleton,
  createBoneMeshHierarchy,
  updateSkeletonTransforms,
} from '@/lib/anatomy/skeletonBuilder';
import Skeleton from './Skeleton';
import MuscleSystem from './MuscleSystem';
import AdiposeLayer from './AdiposeLayer';
import SkinLayer from './SkinLayer';

interface AnatomicalHumanModelProps {
  measurements?: BodyMeasurements;
  config?: AnatomyConfig;
  isAnimating?: boolean;
}

export default function AnatomicalHumanModel({
  measurements,
  config = {
    layerVisibility: { skeleton: false, muscles: true, fat: true, skin: true },
    layerOpacity: { skeleton: 1.0, muscles: 1.0, fat: 0.8, skin: 1.0 },
    muscleMode: 'geometric',
    fatMode: 'regional',
    showAnatomicalLabels: false,
  },
  isAnimating = true,
}: AnatomicalHumanModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const breathTime = useRef(0);

  // Derive anatomical scale factors from measurements
  const anatomicalFactors = useMemo<AnatomicalScaleFactors>(() => {
    const activeMeasurements = measurements || getDefaultMeasurements();
    return computeAnatomicalScaleFactors(activeMeasurements, config.fatMode);
  }, [measurements, config.fatMode]);

  // Create single unified skeleton instance with bone meshes attached
  const builtSkeleton = useMemo<BuiltSkeleton>(() => {
    const built = createAnatomicalSkeleton();
    createBoneMeshHierarchy(built.boneMap);
    return built;
  }, []);

  // Update skeleton when measurements change
  useEffect(() => {
    if (builtSkeleton) {
      updateSkeletonTransforms(builtSkeleton.boneMap, anatomicalFactors);
      builtSkeleton.rootBone.updateMatrixWorld(true);
      builtSkeleton.skeleton.update();
    }
  }, [builtSkeleton, anatomicalFactors]);

  // Animations (Breathing & Turntable)
  useFrame((_state, delta) => {
    if (isAnimating && groupRef.current) {
      breathTime.current += delta;
      const breathFactor = Math.sin(breathTime.current * 1.8) * 0.012;

      // Expand thoracic area slightly during breathing
      groupRef.current.position.y = 1.1 + breathFactor * 0.2;

      // Turntable slow rotation
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.1, 0]}>
      {/* 1. SKELETAL SYSTEM LAYER (~206 Bones) */}
      <Skeleton
        scaleFactors={anatomicalFactors}
        opacity={config.layerOpacity.skeleton}
        visible={config.layerVisibility.skeleton}
        skeletonData={builtSkeleton}
      />

      {/* 2. MUSCULAR SYSTEM LAYER (Skinned Meshes) */}
      <MuscleSystem
        scaleFactors={anatomicalFactors}
        mode={config.muscleMode}
        skeleton={builtSkeleton.skeleton}
        boneMap={builtSkeleton.boneMap}
        opacity={config.layerOpacity.muscles}
        visible={config.layerVisibility.muscles}
      />

      {/* 3. ADIPOSE / FAT LAYER (Regional BMI-based distribution) */}
      <AdiposeLayer
        scaleFactors={anatomicalFactors}
        opacity={config.layerOpacity.fat}
        visible={config.layerVisibility.fat}
      />

      {/* 4. EPIDERMAL / SKIN LAYER (Outer surface) */}
      <SkinLayer
        scaleFactors={anatomicalFactors}
        opacity={config.layerOpacity.skin}
        visible={config.layerVisibility.skin}
      />
    </group>
  );
}
