'use client';

import { useState } from 'react';
import { BodyMeasurements } from '@/types';
import { getDefaultMeasurements } from '@/lib/measurements';
import MeasurementForm from '@/components/MeasurementForm';
import ModelViewer from '@/components/ModelViewer';
import Controls from '@/components/Controls';

export default function Home() {
  const [measurements, setMeasurements] = useState<BodyMeasurements>(getDefaultMeasurements());
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <main className="min-h-screen flex flex-col p-6 gap-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Aureli</h1>
          <p className="text-zinc-400 text-sm mt-1">
            AI-powered online trial room with 3D human models
          </p>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        {/* Left Panel - Measurements */}
        <div className="flex flex-col gap-4">
          <MeasurementForm onMeasurementsChange={setMeasurements} />
        </div>

        {/* Right Panel - 3D Viewport */}
        <div className="flex flex-col gap-4 min-h-[600px] lg:min-h-0">
          <div className="flex-1">
            <ModelViewer measurements={measurements} isAnimating={isAnimating} />
          </div>
          <Controls
            isAnimating={isAnimating}
            onToggleAnimation={() => setIsAnimating(!isAnimating)}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-600 pt-4 border-t border-zinc-900">
        Aureli • Prototype v0.1 • Self-hosted • Free tech stack
      </footer>
    </main>
  );
}
