'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { Tower } from '@/types';
import { Skeleton } from './ui/skeleton';

// Dynamically import the entire map component with SSR turned off.
// This is the standard and recommended way to use Leaflet with Next.js.
const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

interface MapViewProps {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

export default function MapView({ towers, selectedTower, onSelectTower }: MapViewProps) {
  // The MapComponent will only be rendered on the client, preventing server-side errors.
  return (
    <MapComponent
      towers={towers}
      selectedTower={selectedTower}
      onSelectTower={onSelectTower}
    />
  );
}
