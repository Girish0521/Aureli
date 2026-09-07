'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { CameraViewPreset, CAMERA_PRESETS, CameraViewConfig } from '@/types/viewer';

interface ViewerContextValue {
  isAnimating: boolean;
  toggleAnimation: () => void;
  setAnimating: (animating: boolean) => void;
  cameraPreset: CameraViewPreset;
  setCameraPreset: (preset: CameraViewPreset) => void;
  currentCameraConfig: CameraViewConfig;
  showGrid: boolean;
  toggleGrid: () => void;
  wireframe: boolean;
  toggleWireframe: () => void;
}

const ViewerContext = createContext<ViewerContextValue | null>(null);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<CameraViewPreset>('perspective');
  const [showGrid, setShowGrid] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  const toggleAnimation = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  const setAnimating = useCallback((animating: boolean) => {
    setIsAnimating(animating);
  }, []);

  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => !prev);
  }, []);

  const toggleWireframe = useCallback(() => {
    setWireframe((prev) => !prev);
  }, []);

  const currentCameraConfig = useMemo(() => {
    return CAMERA_PRESETS[cameraPreset];
  }, [cameraPreset]);

  const value = useMemo<ViewerContextValue>(
    () => ({
      isAnimating,
      toggleAnimation,
      setAnimating,
      cameraPreset,
      setCameraPreset,
      currentCameraConfig,
      showGrid,
      toggleGrid,
      wireframe,
      toggleWireframe,
    }),
    [
      isAnimating,
      toggleAnimation,
      setAnimating,
      cameraPreset,
      currentCameraConfig,
      showGrid,
      toggleGrid,
      wireframe,
      toggleWireframe,
    ]
  );

  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}

export function useViewer(): ViewerContextValue {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error('useViewer must be used within a ViewerProvider');
  }
  return context;
}
