'use client';

import { AnatomyConfig } from '@/types/anatomy';
import { BodyMeasurements } from '@/types';
import { useAnatomy } from '@/context/AnatomyContext';
import { useViewer } from '@/context/ViewerContext';
import { useMeasurements } from '@/context/MeasurementContext';

interface ControlsProps {
  isAnimating?: boolean;
  onToggleAnimation?: () => void;
  config?: AnatomyConfig;
  onConfigChange?: (config: AnatomyConfig) => void;
  measurements?: BodyMeasurements;
}

export default function Controls({
  isAnimating: propIsAnimating,
  onToggleAnimation: propOnToggleAnimation,
  config: propConfig,
  onConfigChange: propOnConfigChange,
  measurements: propMeasurements,
}: ControlsProps = {}) {
  // Use context hooks as authoritative sources, allowing prop overrides if provided
  const anatomyCtx = useAnatomy();
  const viewerCtx = useViewer();
  const measurementCtx = useMeasurements();

  const isAnimating = propIsAnimating !== undefined ? propIsAnimating : viewerCtx.isAnimating;
  const toggleAnimation = propOnToggleAnimation || viewerCtx.toggleAnimation;
  const config = propConfig || anatomyCtx.config;
  const measurements = propMeasurements || measurementCtx.measurements;

  const { bmi, category: bmiCategory } = anatomyCtx.getBMIData(measurements);

  const toggleLayer = (layer: keyof AnatomyConfig['layerVisibility']) => {
    if (propOnConfigChange) {
      propOnConfigChange({
        ...config,
        layerVisibility: {
          ...config.layerVisibility,
          [layer]: !config.layerVisibility[layer],
        },
      });
    } else {
      anatomyCtx.toggleLayer(layer);
    }
  };

  const toggleMuscleMode = () => {
    if (propOnConfigChange) {
      propOnConfigChange({
        ...config,
        muscleMode: config.muscleMode === 'geometric' ? 'visual' : 'geometric',
      });
    } else {
      anatomyCtx.toggleMuscleMode();
    }
  };

  const toggleFatMode = () => {
    if (propOnConfigChange) {
      propOnConfigChange({
        ...config,
        fatMode: config.fatMode === 'regional' ? 'uniform' : 'regional',
      });
    } else {
      anatomyCtx.toggleFatMode();
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
      {/* Top Row: Animation & BMI stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-300">Animation:</span>
          <button
            onClick={toggleAnimation}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              isAnimating
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            {isAnimating ? 'Playing' : 'Paused'}
          </button>
        </div>

        {/* BMI Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 rounded border border-zinc-800 text-xs">
          <span className="text-zinc-400">BMI:</span>
          <span className="font-bold text-blue-400">{bmi.toFixed(1)}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300">{bmiCategory}</span>
        </div>

        <span className="text-xs text-zinc-500 hidden sm:inline">
          Drag to rotate • Scroll to zoom
        </span>
      </div>

      {/* Middle Row: Anatomical Layer Toggles */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 mr-2">Anatomical Layers:</span>

        {/* Skeleton Layer Toggle */}
        <button
          onClick={() => toggleLayer('skeleton')}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            config.layerVisibility.skeleton
              ? 'bg-amber-950/60 border-amber-600 text-amber-200'
              : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-400'
          }`}
        >
          Skeleton (~206 Bones)
        </button>

        {/* Muscle Layer Toggle */}
        <button
          onClick={() => toggleLayer('muscles')}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            config.layerVisibility.muscles
              ? 'bg-red-950/60 border-red-600 text-red-200'
              : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-400'
          }`}
        >
          Muscles
        </button>

        {/* Fat Layer Toggle */}
        <button
          onClick={() => toggleLayer('fat')}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            config.layerVisibility.fat
              ? 'bg-yellow-950/60 border-yellow-600 text-yellow-200'
              : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-400'
          }`}
        >
          Fat Layer
        </button>

        {/* Skin Layer Toggle */}
        <button
          onClick={() => toggleLayer('skin')}
          className={`px-3 py-1 text-xs rounded border transition-colors ${
            config.layerVisibility.skin
              ? 'bg-blue-950/60 border-blue-600 text-blue-200'
              : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-400'
          }`}
        >
          Skin
        </button>
      </div>

      {/* Bottom Row: Mode Switches */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-zinc-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Muscles:</span>
          <button
            onClick={toggleMuscleMode}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors"
          >
            {config.muscleMode === 'geometric' ? 'Geometric Meshes' : 'Visual Only'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Fat Scaling:</span>
          <button
            onClick={toggleFatMode}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors"
          >
            {config.fatMode === 'regional' ? 'Regional (BMI-guided)' : 'Uniform'}
          </button>
        </div>
      </div>
    </div>
  );
}
