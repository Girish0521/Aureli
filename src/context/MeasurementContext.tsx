'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { BodyMeasurements, SizePreset, MeasurementField } from '@/types';
import {
  getDefaultMeasurements,
  loadMeasurements,
  saveMeasurements,
  validateMeasurement,
  clampMeasurement,
  SIZE_PRESETS,
} from '@/lib/measurements';

interface MeasurementContextValue {
  measurements: BodyMeasurements;
  setMeasurement: (field: MeasurementField, value: number) => void;
  setMeasurements: (measurements: BodyMeasurements) => void;
  applyPreset: (preset: SizePreset) => void;
  resetMeasurements: () => void;
  isValid: (field: MeasurementField, value: number) => boolean;
  presets: SizePreset[];
}

const MeasurementContext = createContext<MeasurementContextValue | null>(null);

export function MeasurementProvider({ children }: { children: React.ReactNode }) {
  const [measurements, setMeasurementsState] = useState<BodyMeasurements>(() => {
    return loadMeasurements() || getDefaultMeasurements();
  });

  const setMeasurement = useCallback((field: MeasurementField, value: number) => {
    const clamped = clampMeasurement(field, value);
    setMeasurementsState((prev) => {
      const updated = { ...prev, [field]: clamped };
      saveMeasurements(updated);
      return updated;
    });
  }, []);

  const setMeasurements = useCallback((newMeasurements: BodyMeasurements) => {
    setMeasurementsState(newMeasurements);
    saveMeasurements(newMeasurements);
  }, []);

  const applyPreset = useCallback((preset: SizePreset) => {
    setMeasurementsState(preset.measurements);
    saveMeasurements(preset.measurements);
  }, []);

  const resetMeasurements = useCallback(() => {
    const defaults = getDefaultMeasurements();
    setMeasurementsState(defaults);
    saveMeasurements(defaults);
  }, []);

  const isValid = useCallback((field: MeasurementField, value: number) => {
    return validateMeasurement(field, value);
  }, []);

  const value = useMemo<MeasurementContextValue>(
    () => ({
      measurements,
      setMeasurement,
      setMeasurements,
      applyPreset,
      resetMeasurements,
      isValid,
      presets: SIZE_PRESETS,
    }),
    [measurements, setMeasurement, setMeasurements, applyPreset, resetMeasurements, isValid]
  );

  return <MeasurementContext.Provider value={value}>{children}</MeasurementContext.Provider>;
}

export function useMeasurements(): MeasurementContextValue {
  const context = useContext(MeasurementContext);
  if (!context) {
    throw new Error('useMeasurements must be used within a MeasurementProvider');
  }
  return context;
}
