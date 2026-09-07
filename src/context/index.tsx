'use client';

import React from 'react';
import { MeasurementProvider } from './MeasurementContext';
import { AnatomyProvider } from './AnatomyContext';
import { ViewerProvider } from './ViewerContext';

export * from './MeasurementContext';
export * from './AnatomyContext';
export * from './ViewerContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MeasurementProvider>
      <AnatomyProvider>
        <ViewerProvider>
          {children}
        </ViewerProvider>
      </AnatomyProvider>
    </MeasurementProvider>
  );
}
