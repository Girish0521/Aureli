'use client';

import { useState, useEffect } from 'react';
import { BodyMeasurements } from '@/types';
import {
  MEASUREMENT_RANGES,
  SIZE_PRESETS,
  validateMeasurement,
  getDefaultMeasurements,
  saveMeasurements,
  loadMeasurements,
} from '@/lib/measurements';

interface MeasurementFormProps {
  onMeasurementsChange: (measurements: BodyMeasurements) => void;
}

export default function MeasurementForm({ onMeasurementsChange }: MeasurementFormProps) {
  const [measurements, setMeasurements] = useState<BodyMeasurements>(getDefaultMeasurements());

  useEffect(() => {
    const loaded = loadMeasurements();
    if (loaded) {
      setMeasurements(loaded);
      onMeasurementsChange(loaded);
    } else {
      onMeasurementsChange(measurements);
    }
  }, []);

  const handleChange = (field: keyof BodyMeasurements, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && validateMeasurement(field, numValue)) {
      const updated = { ...measurements, [field]: numValue };
      setMeasurements(updated);
      saveMeasurements(updated);
      onMeasurementsChange(updated);
    }
  };

  const applyPreset = (preset: typeof SIZE_PRESETS[0]) => {
    setMeasurements(preset.measurements);
    saveMeasurements(preset.measurements);
    onMeasurementsChange(preset.measurements);
  };

  const resetToDefaults = () => {
    const defaults = getDefaultMeasurements();
    setMeasurements(defaults);
    saveMeasurements(defaults);
    onMeasurementsChange(defaults);
  };

  const fields: Array<{ key: keyof BodyMeasurements; label: string; unit: string }> = [
    { key: 'height', label: 'Height', unit: 'cm' },
    { key: 'weight', label: 'Weight', unit: 'kg' },
    { key: 'chest', label: 'Chest', unit: 'cm' },
    { key: 'waist', label: 'Waist', unit: 'cm' },
    { key: 'hips', label: 'Hips', unit: 'cm' },
    { key: 'shoulderWidth', label: 'Shoulder Width', unit: 'cm' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
      <h2 className="text-xl font-semibold text-white">Body Measurements</h2>

      {/* Size Presets */}
      <div className="flex gap-2">
        {SIZE_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
          >
            {preset.name}
          </button>
        ))}
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded transition-colors ml-auto"
        >
          Reset
        </button>
      </div>

      {/* Measurement Inputs */}
      <div className="flex flex-col gap-4">
        {fields.map(({ key, label, unit }) => {
          const range = MEASUREMENT_RANGES[key];
          return (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">
                {label} ({unit})
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={key === 'weight' ? 1 : 1}
                  value={measurements[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="number"
                  min={range.min}
                  max={range.max}
                  value={measurements[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-20 px-3 py-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:border-zinc-500 focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
