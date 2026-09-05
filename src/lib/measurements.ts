import { BodyMeasurements, MeasurementRange, SizePreset } from '@/types';

export const MEASUREMENT_RANGES: Record<keyof BodyMeasurements, MeasurementRange> = {
  height: { min: 140, max: 210, default: 170 },
  weight: { min: 40, max: 150, default: 70 },
  chest: { min: 70, max: 140, default: 95 },
  waist: { min: 60, max: 130, default: 80 },
  hips: { min: 70, max: 140, default: 95 },
  shoulderWidth: { min: 35, max: 55, default: 42 },
};

export const SIZE_PRESETS: SizePreset[] = [
  {
    name: 'S',
    measurements: {
      height: 165,
      weight: 60,
      chest: 88,
      waist: 70,
      hips: 90,
      shoulderWidth: 39,
    },
  },
  {
    name: 'M',
    measurements: {
      height: 170,
      weight: 70,
      chest: 95,
      waist: 80,
      hips: 95,
      shoulderWidth: 42,
    },
  },
  {
    name: 'L',
    measurements: {
      height: 175,
      weight: 80,
      chest: 102,
      waist: 90,
      hips: 102,
      shoulderWidth: 45,
    },
  },
  {
    name: 'XL',
    measurements: {
      height: 180,
      weight: 90,
      chest: 110,
      waist: 100,
      hips: 110,
      shoulderWidth: 48,
    },
  },
];

export const validateMeasurement = (field: keyof BodyMeasurements, value: number): boolean => {
  const range = MEASUREMENT_RANGES[field];
  return value >= range.min && value <= range.max;
};

export const getDefaultMeasurements = (): BodyMeasurements => ({
  height: MEASUREMENT_RANGES.height.default,
  weight: MEASUREMENT_RANGES.weight.default,
  chest: MEASUREMENT_RANGES.chest.default,
  waist: MEASUREMENT_RANGES.waist.default,
  hips: MEASUREMENT_RANGES.hips.default,
  shoulderWidth: MEASUREMENT_RANGES.shoulderWidth.default,
});

const STORAGE_KEY = 'body-measurements';

export const saveMeasurements = (measurements: BodyMeasurements): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(measurements));
  }
};

export const loadMeasurements = (): BodyMeasurements | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as BodyMeasurements;
      } catch {
        return null;
      }
    }
  }
  return null;
};
