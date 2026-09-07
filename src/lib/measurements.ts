import { BodyMeasurements, MeasurementRange, SizePreset } from '@/types';

export const MEASUREMENT_CONFIG: Record<keyof BodyMeasurements, MeasurementRange> = {
  height: { min: 140, max: 210, default: 170, step: 1, unit: 'cm', label: 'Height' },
  weight: { min: 40, max: 150, default: 70, step: 1, unit: 'kg', label: 'Weight' },
  chest: { min: 70, max: 140, default: 95, step: 1, unit: 'cm', label: 'Chest Circumference' },
  waist: { min: 60, max: 130, default: 80, step: 1, unit: 'cm', label: 'Waist Circumference' },
  hips: { min: 70, max: 140, default: 95, step: 1, unit: 'cm', label: 'Hip Circumference' },
  shoulderWidth: { min: 35, max: 55, default: 42, step: 1, unit: 'cm', label: 'Shoulder Width' },
};

// Backward-compatible alias
export const MEASUREMENT_RANGES = MEASUREMENT_CONFIG;

export const SIZE_PRESETS: SizePreset[] = [
  {
    name: 'S',
    label: 'Small (EU 36-38)',
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
    label: 'Medium (EU 40-42)',
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
    label: 'Large (EU 44-46)',
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
    label: 'Extra Large (EU 48-50)',
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
  const range = MEASUREMENT_CONFIG[field];
  if (!range) return false;
  return value >= range.min && value <= range.max;
};

export const clampMeasurement = (field: keyof BodyMeasurements, value: number): number => {
  const range = MEASUREMENT_CONFIG[field];
  if (!range) return value;
  return Math.max(range.min, Math.min(range.max, value));
};

export const sanitizeMeasurements = (input: Partial<BodyMeasurements>): BodyMeasurements => {
  const defaults = getDefaultMeasurements();
  return {
    height: typeof input.height === 'number' ? clampMeasurement('height', input.height) : defaults.height,
    weight: typeof input.weight === 'number' ? clampMeasurement('weight', input.weight) : defaults.weight,
    chest: typeof input.chest === 'number' ? clampMeasurement('chest', input.chest) : defaults.chest,
    waist: typeof input.waist === 'number' ? clampMeasurement('waist', input.waist) : defaults.waist,
    hips: typeof input.hips === 'number' ? clampMeasurement('hips', input.hips) : defaults.hips,
    shoulderWidth: typeof input.shoulderWidth === 'number' ? clampMeasurement('shoulderWidth', input.shoulderWidth) : defaults.shoulderWidth,
  };
};

export const getDefaultMeasurements = (): BodyMeasurements => ({
  height: MEASUREMENT_CONFIG.height.default,
  weight: MEASUREMENT_CONFIG.weight.default,
  chest: MEASUREMENT_CONFIG.chest.default,
  waist: MEASUREMENT_CONFIG.waist.default,
  hips: MEASUREMENT_CONFIG.hips.default,
  shoulderWidth: MEASUREMENT_CONFIG.shoulderWidth.default,
});

const STORAGE_KEY = 'aureli_body_measurements';
const LEGACY_STORAGE_KEY = 'body-measurements';

export const saveMeasurements = (measurements: BodyMeasurements): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(measurements));
    } catch {
      // Ignore localStorage errors (e.g. quota exceeded or private mode)
    }
  }
};

export const loadMeasurements = (): BodyMeasurements | null => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<BodyMeasurements>;
        return sanitizeMeasurements(parsed);
      }
    } catch {
      return null;
    }
  }
  return null;
};
