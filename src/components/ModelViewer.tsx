'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { BodyMeasurements } from '@/types';
import { mapMeasurementsToScale } from '@/lib/bodyMapper';
import HumanModel from './HumanModel';

interface ModelViewerProps {
  measurements: BodyMeasurements;
  isAnimating: boolean;
}

export default function ModelViewer({ measurements, isAnimating }: ModelViewerProps) {
  const scaleFactors = mapMeasurementsToScale(measurements);

  return (
    <div className="w-full h-full bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
      <Canvas
        camera={{ position: [2, 1, 3], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />

        {/* 3D Human Model */}
        <HumanModel scaleFactors={scaleFactors} isAnimating={isAnimating} />

        {/* Ground Grid */}
        <Grid
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#404040"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#606060"
          fadeDistance={20}
          fadeStrength={1}
          followCamera={false}
          position={[0, -1, 0]}
        />

        {/* Orbit Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={1.5}
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}
