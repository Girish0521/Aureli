'use client';

import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { AnatomicalScaleFactors } from '@/types/anatomy';

interface SkinLayerProps {
  scaleFactors: AnatomicalScaleFactors;
  opacity?: number;
  visible?: boolean;
}

export default function SkinLayer({
  scaleFactors,
  opacity = 1.0,
  visible = true,
}: SkinLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { regionalThicknessMm } = scaleFactors.adiposeProfile;

  // Realistic human skin PBR material
  const skinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f5d5c1', // Realistic skin tone
      roughness: 0.75,
      metalness: 0.05,
      transparent: opacity < 1.0,
      opacity: opacity,
    });
  }, [opacity]);

  const clothesMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1e293b', // Dark athletic shorts
      roughness: 0.7,
      metalness: 0.1,
      transparent: opacity < 1.0,
      opacity: opacity,
    });
  }, [opacity]);

  // Clean up on unmount or material recreation
  useEffect(() => {
    return () => {
      skinMaterial.dispose();
      clothesMaterial.dispose();
    };
  }, [skinMaterial, clothesMaterial]);

  // Dynamic regional expansions incorporating fat thickness
  const abdomenFat = 1.0 + (regionalThicknessMm.abdomen - 18.0) * 0.015;
  const hipsFat = 1.0 + (regionalThicknessMm.hips_gluteal - 20.0) * 0.015;
  const chestFat = 1.0 + (regionalThicknessMm.chest_pectoral - 12.0) * 0.012;
  const thighsFat = 1.0 + (regionalThicknessMm.thighs - 16.0) * 0.012;
  const armsFat = 1.0 + (regionalThicknessMm.upper_arms - 10.0) * 0.01;

  const shoulderSpread = 0.28 * scaleFactors.shoulderSpanScale;
  const hipSpread = 0.09 * scaleFactors.pelvicWidthScale;

  if (!visible) return null;

  return (
    <group ref={groupRef} name="SkinLayer">
      {/* Head */}
      <mesh position={[0, 0.68 * scaleFactors.heightScale, 0]} castShadow>
        <sphereGeometry args={[0.125, 32, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.53 * scaleFactors.heightScale, 0]} castShadow>
        <cylinderGeometry args={[0.048, 0.055, 0.12 * scaleFactors.torsoHeightScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Upper Torso (Chest & Ribs envelope) */}
      <mesh
        position={[0, 0.32 * scaleFactors.torsoHeightScale, 0]}
        scale={[scaleFactors.ribCageScale[0] * chestFat, 1, scaleFactors.ribCageScale[2] * chestFat]}
        castShadow
      >
        <capsuleGeometry args={[0.145, 0.28 * scaleFactors.torsoHeightScale, 4, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Mid Torso (Waist & Abdomen envelope) */}
      <mesh
        position={[0, 0.06 * scaleFactors.torsoHeightScale, 0]}
        scale={[abdomenFat, 1, abdomenFat]}
        castShadow
      >
        <capsuleGeometry args={[0.125, 0.18 * scaleFactors.torsoHeightScale, 4, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Hips / Pelvis envelope (Shorts / Pelvic skin) */}
      <mesh
        position={[0, -0.12, 0]}
        scale={[scaleFactors.pelvicWidthScale * hipsFat, 1, hipsFat]}
        castShadow
      >
        <capsuleGeometry args={[0.135, 0.15, 4, 16]} />
        <primitive object={clothesMaterial} attach="material" />
      </mesh>

      {/* Left Shoulder */}
      <mesh position={[-shoulderSpread, 0.47 * scaleFactors.torsoHeightScale, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[shoulderSpread, 0.47 * scaleFactors.torsoHeightScale, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Upper Arm */}
      <mesh
        position={[-shoulderSpread, 0.30 * scaleFactors.torsoHeightScale, 0]}
        scale={[armsFat, 1, armsFat]}
        castShadow
      >
        <cylinderGeometry args={[0.045, 0.040, 0.26 * scaleFactors.armLengthScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Upper Arm */}
      <mesh
        position={[shoulderSpread, 0.30 * scaleFactors.torsoHeightScale, 0]}
        scale={[armsFat, 1, armsFat]}
        castShadow
      >
        <cylinderGeometry args={[0.045, 0.040, 0.26 * scaleFactors.armLengthScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Elbow */}
      <mesh position={[-shoulderSpread, 0.17 * scaleFactors.armLengthScale, 0]} castShadow>
        <sphereGeometry args={[0.042, 12, 12]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Elbow */}
      <mesh position={[shoulderSpread, 0.17 * scaleFactors.armLengthScale, 0]} castShadow>
        <sphereGeometry args={[0.042, 12, 12]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Forearm */}
      <mesh position={[-shoulderSpread, 0.03 * scaleFactors.armLengthScale, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.032, 0.24 * scaleFactors.armLengthScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Forearm */}
      <mesh position={[shoulderSpread, 0.03 * scaleFactors.armLengthScale, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.032, 0.24 * scaleFactors.armLengthScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-shoulderSpread, -0.10 * scaleFactors.armLengthScale, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.02]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Hand */}
      <mesh position={[shoulderSpread, -0.10 * scaleFactors.armLengthScale, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.02]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Thigh */}
      <mesh
        position={[-hipSpread, -0.44 * scaleFactors.legLengthScale, 0]}
        scale={[thighsFat, 1, thighsFat]}
        castShadow
      >
        <cylinderGeometry args={[0.075, 0.062, 0.40 * scaleFactors.legLengthScale, 16]} />
        <primitive object={clothesMaterial} attach="material" />
      </mesh>

      {/* Right Thigh */}
      <mesh
        position={[hipSpread, -0.44 * scaleFactors.legLengthScale, 0]}
        scale={[thighsFat, 1, thighsFat]}
        castShadow
      >
        <cylinderGeometry args={[0.075, 0.062, 0.40 * scaleFactors.legLengthScale, 16]} />
        <primitive object={clothesMaterial} attach="material" />
      </mesh>

      {/* Left Knee */}
      <mesh position={[-hipSpread, -0.65 * scaleFactors.legLengthScale, 0]} castShadow>
        <sphereGeometry args={[0.058, 14, 14]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Knee */}
      <mesh position={[hipSpread, -0.65 * scaleFactors.legLengthScale, 0]} castShadow>
        <sphereGeometry args={[0.058, 14, 14]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Shin & Calf */}
      <mesh position={[-hipSpread, -0.88 * scaleFactors.legLengthScale, 0]} castShadow>
        <cylinderGeometry args={[0.052, 0.042, 0.40 * scaleFactors.legLengthScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Right Shin & Calf */}
      <mesh position={[hipSpread, -0.88 * scaleFactors.legLengthScale, 0]} castShadow>
        <cylinderGeometry args={[0.052, 0.042, 0.40 * scaleFactors.legLengthScale, 16]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-hipSpread, -1.12 * scaleFactors.legLengthScale, 0.04]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.18]} />
        <primitive object={clothesMaterial} attach="material" />
      </mesh>

      {/* Right Foot */}
      <mesh position={[hipSpread, -1.12 * scaleFactors.legLengthScale, 0.04]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.18]} />
        <primitive object={clothesMaterial} attach="material" />
      </mesh>
    </group>
  );
}
