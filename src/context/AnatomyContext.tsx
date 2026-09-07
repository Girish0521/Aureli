'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  AnatomyConfig,
  DEFAULT_ANATOMY_CONFIG,
  LayerVisibilitySettings,
  LayerOpacitySettings,
  MuscleRenderMode,
  FatDistributionMode,
  AnatomicalScaleFactors,
} from '@/types/anatomy';
import { BodyMeasurements } from '@/types/measurements';
import { computeAnatomicalScaleFactors } from '@/lib/anatomy/anatomicalMapper';
import { calculateBMI, getBMICategory } from '@/lib/anatomy/bmiCalculator';

interface AnatomyContextValue {
  config: AnatomyConfig;
  setConfig: (config: AnatomyConfig) => void;
  toggleLayer: (layer: keyof LayerVisibilitySettings) => void;
  setLayerOpacity: (layer: keyof LayerOpacitySettings, opacity: number) => void;
  setMuscleMode: (mode: MuscleRenderMode) => void;
  toggleMuscleMode: () => void;
  setFatMode: (mode: FatDistributionMode) => void;
  toggleFatMode: () => void;
  getScaleFactors: (measurements: BodyMeasurements) => AnatomicalScaleFactors;
  getBMIData: (measurements: BodyMeasurements) => { bmi: number; category: string };
  resetConfig: () => void;
}

const AnatomyContext = createContext<AnatomyContextValue | null>(null);

export function AnatomyProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AnatomyConfig>(DEFAULT_ANATOMY_CONFIG);

  const toggleLayer = useCallback((layer: keyof LayerVisibilitySettings) => {
    setConfig((prev) => ({
      ...prev,
      layerVisibility: {
        ...prev.layerVisibility,
        [layer]: !prev.layerVisibility[layer],
      },
    }));
  }, []);

  const setLayerOpacity = useCallback((layer: keyof LayerOpacitySettings, opacity: number) => {
    setConfig((prev) => ({
      ...prev,
      layerOpacity: {
        ...prev.layerOpacity,
        [layer]: Math.max(0, Math.min(1, opacity)),
      },
    }));
  }, []);

  const setMuscleMode = useCallback((mode: MuscleRenderMode) => {
    setConfig((prev) => ({ ...prev, muscleMode: mode }));
  }, []);

  const toggleMuscleMode = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      muscleMode: prev.muscleMode === 'geometric' ? 'visual' : 'geometric',
    }));
  }, []);

  const setFatMode = useCallback((mode: FatDistributionMode) => {
    setConfig((prev) => ({ ...prev, fatMode: mode }));
  }, []);

  const toggleFatMode = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      fatMode: prev.fatMode === 'regional' ? 'uniform' : 'regional',
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_ANATOMY_CONFIG);
  }, []);

  const getScaleFactors = useCallback(
    (measurements: BodyMeasurements): AnatomicalScaleFactors => {
      return computeAnatomicalScaleFactors(measurements, config.fatMode);
    },
    [config.fatMode]
  );

  const getBMIData = useCallback((measurements: BodyMeasurements) => {
    const bmi = calculateBMI(measurements.height, measurements.weight);
    const category = getBMICategory(bmi);
    return { bmi, category };
  }, []);

  const value = useMemo<AnatomyContextValue>(
    () => ({
      config,
      setConfig,
      toggleLayer,
      setLayerOpacity,
      setMuscleMode,
      toggleMuscleMode,
      setFatMode,
      toggleFatMode,
      getScaleFactors,
      getBMIData,
      resetConfig,
    }),
    [
      config,
      toggleLayer,
      setLayerOpacity,
      setMuscleMode,
      toggleMuscleMode,
      setFatMode,
      toggleFatMode,
      getScaleFactors,
      getBMIData,
      resetConfig,
    ]
  );

  return <AnatomyContext.Provider value={value}>{children}</AnatomyContext.Provider>;
}

export function useAnatomy(): AnatomyContextValue {
  const context = useContext(AnatomyContext);
  if (!context) {
    throw new Error('useAnatomy must be used within an AnatomyProvider');
  }
  return context;
}
