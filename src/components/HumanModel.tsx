'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BodyScaleFactors } from '@/lib/bodyMapper';

interface HumanModelProps {
  scaleFactors: BodyScaleFactors;
  isAnimating: boolean;
}

export default function HumanModel({ scaleFactors, isAnimating }: HumanModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const breathTime = useRef(0);

  // Idle breathing animation
  useFrame((state, delta) => {
    if (isAnimating && torsoRef.current) {
      breathTime.current += delta;
      const breathScale = 1 + Math.sin(breathTime.current * 2) * 0.015;
      torsoRef.current.scale.z = breathScale;
    }

    // Slow turntable rotation
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Base proportions for a 170cm person
  const baseScale = scaleFactors.height;
  const widthScale = (scaleFactors.torsoWidth + scaleFactors.volumeScale) / 2;
  const waistScale = scaleFactors.waistWidth * scaleFactors.volumeScale;
  const hipScale = scaleFactors.hipWidth * scaleFactors.volumeScale;
  const shoulderSpread = scaleFactors.shoulderWidth * 0.28 * widthScale;

  // Smooth transitions
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.lerp(new THREE.Vector3(1, baseScale, 1), 0.2);
  }, [baseScale]);

  return (
    <group ref={groupRef} position={[0, 1.1, 0]} scale={[1, baseScale, 1]}>
      {/* Head */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <sphereGeometry args={[0.125, 32, 32]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.53, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.12, 16]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Upper Torso (chest) */}
      <mesh
        ref={torsoRef}
        position={[0, 0.32, 0]}
        scale={[widthScale, 1, 1]}
        castShadow
      >
        <capsuleGeometry args={[0.14, 0.28, 4, 16]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </mesh>

      {/* Mid Torso (waist) */}
      <mesh position={[0, 0.05, 0]} scale={[waistScale, 1, 1]} castShadow>
        <capsuleGeometry args={[0.11, 0.18, 4, 16]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </mesh>

      {/* Hips/Pelvis */}
      <mesh position={[0, -0.12, 0]} scale={[hipScale, 1, 1]} castShadow>
        <capsuleGeometry args={[0.13, 0.14, 4, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Left Shoulder */}
      <mesh position={[-shoulderSpread, 0.47, 0]} castShadow>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[shoulderSpread, 0.47, 0]} castShadow>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Upper Arm */}
      <mesh position={[-shoulderSpread, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.038, 0.26, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Upper Arm */}
      <mesh position={[shoulderSpread, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.038, 0.26, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Elbow */}
      <mesh position={[-shoulderSpread, 0.17, 0]} castShadow>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Elbow */}
      <mesh position={[shoulderSpread, 0.17, 0]} castShadow>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Forearm */}
      <mesh position={[-shoulderSpread, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.22, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Forearm */}
      <mesh position={[shoulderSpread, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.22, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-shoulderSpread, -0.09, 0]} castShadow>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Hand */}
      <mesh position={[shoulderSpread, -0.09, 0]} castShadow>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Hip Joint */}
      <mesh position={[-0.08 * hipScale, -0.21, 0]} castShadow>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Right Hip Joint */}
      <mesh position={[0.08 * hipScale, -0.21, 0]} castShadow>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Left Thigh */}
      <mesh position={[-0.08 * hipScale, -0.44, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.055, 0.38, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Right Thigh */}
      <mesh position={[0.08 * hipScale, -0.44, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.055, 0.38, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Left Knee */}
      <mesh position={[-0.08 * hipScale, -0.63, 0]} castShadow>
        <sphereGeometry args={[0.056, 12, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Right Knee */}
      <mesh position={[0.08 * hipScale, -0.63, 0]} castShadow>
        <sphereGeometry args={[0.056, 12, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Left Shin */}
      <mesh position={[-0.08 * hipScale, -0.86, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.38, 16]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Shin */}
      <mesh position={[0.08 * hipScale, -0.86, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.38, 16]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Ankle */}
      <mesh position={[-0.08 * hipScale, -1.05, 0]} castShadow>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Right Ankle */}
      <mesh position={[0.08 * hipScale, -1.05, 0]} castShadow>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshStandardMaterial color="#f5d5c1" roughness={0.8} />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-0.08 * hipScale, -1.11, 0.04]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.18]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Right Foot */}
      <mesh position={[0.08 * hipScale, -1.11, 0.04]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.18]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
    </group>
  );
}
