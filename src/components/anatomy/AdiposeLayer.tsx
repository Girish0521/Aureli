'use client';

import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { AnatomicalScaleFactors } from '@/types/anatomy';

interface AdiposeLayerProps {
  scaleFactors: AnatomicalScaleFactors;
  opacity?: number;
  visible?: boolean;
}

export default function AdiposeLayer({
  scaleFactors,
  opacity = 0.75,
  visible = true,
}: AdiposeLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { regionalThicknessMm } = scaleFactors.adiposeProfile;

  // Adipose tissue material (soft golden yellow, semi-translucent)
  const fatMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#facc15', // Golden adipose color
      roughness: 0.4,
      metalness: 0.05,
      transparent: opacity < 1.0,
      opacity: opacity,
      wireframe: false,
    });
  }, [opacity]);

  // Clean up on unmount or material change
  useEffect(() => {
    return () => {
      fatMaterial.dispose();
    };
  }, [fatMaterial]);

  // Scaled fat envelopes for anatomical regions (mm -> scale multipliers)
  const abdomenScale = 1.0 + (regionalThicknessMm.abdomen - 18.0) * 0.015;
  const hipsScale = 1.0 + (regionalThicknessMm.hips_gluteal - 20.0) * 0.015;
  const chestScale = 1.0 + (regionalThicknessMm.chest_pectoral - 12.0) * 0.012;
  const thighsScale = 1.0 + (regionalThicknessMm.thighs - 16.0) * 0.012;
  const armsScale = 1.0 + (regionalThicknessMm.upper_arms - 10.0) * 0.01;

  if (!visible) return null;

  return (
    <group ref={groupRef} name="AdiposeLayer">
      {/* Abdominal / Visceral & Subcutaneous Fat Depot */}
      <mesh position={[0, 0.08 * scaleFactors.torsoHeightScale, 0.02]} castShadow>
        <capsuleGeometry args={[0.13 * abdomenScale, 0.16 * scaleFactors.torsoHeightScale, 4, 16]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>

      {/* Flanks / Love Handles (Left & Right) */}
      <mesh position={[-0.11 * abdomenScale, 0.04 * scaleFactors.torsoHeightScale, 0]}>
        <sphereGeometry args={[0.07 * abdomenScale, 12, 12]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>
      <mesh position={[0.11 * abdomenScale, 0.04 * scaleFactors.torsoHeightScale, 0]}>
        <sphereGeometry args={[0.07 * abdomenScale, 12, 12]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>

      {/* Gluteal / Hip Adipose Depots */}
      <mesh position={[-0.09 * scaleFactors.pelvicWidthScale, -0.12, -0.04]} castShadow>
        <sphereGeometry args={[0.09 * hipsScale, 16, 16]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>
      <mesh position={[0.09 * scaleFactors.pelvicWidthScale, -0.12, -0.04]} castShadow>
        <sphereGeometry args={[0.09 * hipsScale, 16, 16]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>

      {/* Chest / Subclavicular Fat Depot */}
      <mesh position={[-0.07 * scaleFactors.ribCageScale[0], 0.30 * scaleFactors.torsoHeightScale, 0.06]} castShadow>
        <sphereGeometry args={[0.065 * chestScale, 14, 14]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>
      <mesh position={[0.07 * scaleFactors.ribCageScale[0], 0.30 * scaleFactors.torsoHeightScale, 0.06]} castShadow>
        <sphereGeometry args={[0.065 * chestScale, 14, 14]} />
        <primitive object={fatMaterial} attach="material" />
      </mesh>

      {/* Upper Thigh Fat Pads */}
      <mesh position={[-0.09 * scaleFactors.pelvicWidthScale, -0.32 * scaleFactors.legLengthScale, 0]} castShadow>
        <cylinderGeometry
          args={[
            0.072 * thighsScale,
            0.062 * thighsScale,
            0.24 * scaleFactors.legLengthScale,
            16,
          ]}
        />
        <primitive object={fatMaterial} attach="material" />
      </mesh>
      <mesh position={[0.09 * scaleFactors.pelvicWidthScale, -0.32 * scaleFactors.legLengthScale, 0]} castShadow>
        <cylinderGeometry
          args={[
            0.072 * thighsScale,
            0.062 * thighsScale,
            0.24 * scaleFactors.legLengthScale,
            16,
          ]}
        />
        <primitive object={fatMaterial} attach="material" />
      </mesh>

      {/* Upper Arm / Brachial Fat Pads */}
      <mesh
        position={[-0.22 * scaleFactors.shoulderSpanScale, 0.28 * scaleFactors.torsoHeightScale, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.045 * armsScale,
            0.040 * armsScale,
            0.20 * scaleFactors.armLengthScale,
            12,
          ]}
        />
        <primitive object={fatMaterial} attach="material" />
      </mesh>
      <mesh
        position={[0.22 * scaleFactors.shoulderSpanScale, 0.28 * scaleFactors.torsoHeightScale, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.045 * armsScale,
            0.040 * armsScale,
            0.20 * scaleFactors.armLengthScale,
            12,
          ]}
        />
        <primitive object={fatMaterial} attach="material" />
      </mesh>
    </group>
  );
}
