export type CameraViewPreset = 'front' | 'side' | 'back' | 'perspective' | 'close_torso';

export interface CameraViewConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface ViewerState {
  isAnimating: boolean;
  activePreset: CameraViewPreset;
  wireframe: boolean;
  showGrid: boolean;
}

export const CAMERA_PRESETS: Record<CameraViewPreset, CameraViewConfig> = {
  perspective: {
    position: [2, 1, 3],
    target: [0, 0.4, 0],
    fov: 50,
  },
  front: {
    position: [0, 0.4, 3.5],
    target: [0, 0.4, 0],
    fov: 45,
  },
  side: {
    position: [3.5, 0.4, 0],
    target: [0, 0.4, 0],
    fov: 45,
  },
  back: {
    position: [0, 0.4, -3.5],
    target: [0, 0.4, 0],
    fov: 45,
  },
  close_torso: {
    position: [0, 0.6, 1.8],
    target: [0, 0.5, 0],
    fov: 40,
  },
};
