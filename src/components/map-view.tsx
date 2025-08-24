'use client';

import * as React from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { Tower } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface MapViewProps {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

const MALANG_CENTER = { lat: -7.9666, lng: 112.6333 };

export default function MapView({ towers, selectedTower, onSelectTower }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-2">Map Unavailable</h2>
          <p className="text-muted-foreground">
            Google Maps API key is missing. Please add it to your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={MALANG_CENTER}
        defaultZoom={11}
        mapId="malang_tower_map"
        className="w-full h-full border-0"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {towers.map((tower) => (
          <AdvancedMarker
            key={tower.id}
            position={{ lat: tower.latitude, lng: tower.longitude }}
            onClick={() => onSelectTower(tower)}
          >
            <Pin
              background={'hsl(var(--primary))'}
              borderColor={'hsl(var(--primary-foreground))'}
              glyphColor={'hsl(var(--primary-foreground))'}
            />
          </AdvancedMarker>
        ))}

        {selectedTower && (
          <InfoWindow
            position={{ lat: selectedTower.latitude, lng: selectedTower.longitude }}
            onCloseClick={() => onSelectTower(null)}
          >
            <div className="p-2 w-64">
              <h3 className="font-bold text-lg text-primary">{selectedTower.id}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedTower.village}, {selectedTower.district}
              </p>
              <div className="mt-4 text-xs space-y-2">
                <p><strong>Provider:</strong> {selectedTower.providerName}</p>
                <p><strong>Owner:</strong> {selectedTower.ownerName}</p>
                <p><strong>Owner Contact:</strong> {selectedTower.ownerPhoneNumber}</p>
                <p><strong>Height:</strong> {selectedTower.height}m</p>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
