'use client';

import { AppProviders } from '@/context';
import MeasurementForm from '@/components/MeasurementForm';
import ModelViewer from '@/components/ModelViewer';
import Controls from '@/components/Controls';

function TrialRoomView() {
  return (
    <main className="min-h-screen flex flex-col p-6 gap-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Aureli
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            AI-powered online trial room with anatomically accurate 3D human models
          </p>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        {/* Left Panel - Measurements */}
        <div className="flex flex-col gap-4">
          <MeasurementForm />
        </div>

        {/* Right Panel - 3D Viewport */}
        <div className="flex flex-col gap-4 min-h-[600px] lg:min-h-0">
          <div className="flex-1">
            <ModelViewer />
          </div>
          <Controls />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-600 pt-4 border-t border-zinc-900">
        Aureli • Prototype v0.2 • Anatomically Accurate Skeleton, Muscles & BMI Adipose System
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <AppProviders>
      <TrialRoomView />
    </AppProviders>
  );
}
