'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

type DisposableItem =
  | THREE.BufferGeometry
  | THREE.Material
  | THREE.Texture
  | THREE.Object3D
  | THREE.SkinnedMesh;

/**
 * Utility hook to safely manage and dispose Three.js geometries, materials, and meshes
 * across component lifecycles and reactive updates without WebGL resource leaks.
 */
export function useThreeDisposal() {
  const disposablesRef = useRef<Set<DisposableItem>>(new Set());

  const registerDisposable = useCallback(<T extends DisposableItem>(item: T): T => {
    disposablesRef.current.add(item);
    return item;
  }, []);

  const disposeItem = useCallback((item: DisposableItem) => {
    if (item instanceof THREE.Mesh || item instanceof THREE.SkinnedMesh) {
      if (item.geometry) item.geometry.dispose();
      if (Array.isArray(item.material)) {
        item.material.forEach((m) => m.dispose());
      } else if (item.material) {
        item.material.dispose();
      }
    }
    if ('dispose' in item && typeof item.dispose === 'function') {
      item.dispose();
    }
    disposablesRef.current.delete(item);
  }, []);

  const disposeAll = useCallback(() => {
    disposablesRef.current.forEach((item) => {
      if (item instanceof THREE.Mesh || item instanceof THREE.SkinnedMesh) {
        if (item.geometry) item.geometry.dispose();
        if (Array.isArray(item.material)) {
          item.material.forEach((m) => m.dispose());
        } else if (item.material) {
          item.material.dispose();
        }
      }
      if ('dispose' in item && typeof item.dispose === 'function') {
        item.dispose();
      }
    });
    disposablesRef.current.clear();
  }, []);

  useEffect(() => {
    return () => {
      disposeAll();
    };
  }, [disposeAll]);

  return { registerDisposable, disposeItem, disposeAll };
}
