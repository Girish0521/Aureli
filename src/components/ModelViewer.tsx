'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { BodyMeasurements } from '@/types';
import { AnatomyConfig } from '@/types/anatomy';
import { useMeasurements } from '@/context/MeasurementContext';
import { useAnatomy } from '@/context/AnatomyContext';
import { useViewer } from '@/context/ViewerContext';
import AnatomicalHumanModel from './anatomy/AnatomicalHumanModel';

interface ModelViewerProps {
  measurements?: BodyMeasurements;
  config?: AnatomyConfig;
  isAnimating?: boolean;
}

export default function ModelViewer({
  measurements: propMeasurements,
  config: propConfig,
  isAnimating: propIsAnimating,
}: ModelViewerProps = {}) {
  const measurementCtx = useMeasurements();
  const anatomyCtx = useAnatomy();
  const viewerCtx = useViewer();

  const measurements = propMeasurements || measurementCtx.measurements;
  const config = propConfig || anatomyCtx.config;
  const isAnimating = propIsAnimating !== undefined ? propIsAnimating : viewerCtx.isAnimating;

  return (
    <div className="w-full h-full bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
      <Canvas
        camera={{ position: [2, 1, 3], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />

        {/* 3D Anatomical Human Model */}
        <AnatomicalHumanModel
          measurements={measurements}
          config={config}
          isAnimating={isAnimating}
        />

        {/* Ground Grid */}
        {viewerCtx.showGrid && (
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
        )}

        {/* Orbit Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={1.2}
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0.4, 0]}
        />
      </Canvas>
    </div>
  );
}
