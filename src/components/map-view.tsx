'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { Tower } from '@/types';
import { Skeleton } from './ui/skeleton';

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
  return (
    <MapComponent
      towers={towers}
      selectedTower={selectedTower}
      onSelectTower={onSelectTower}
    />
  );
}
