'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { Tower } from '@/types';
import { Skeleton } from './ui/skeleton';

const MALANG_CENTER: LatLngExpression = [-7.9666, 112.6333];

interface MapComponentProps {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

export default function MapComponent({ towers, selectedTower, onSelectTower }: MapComponentProps) {
  return (
    <MapContainer
      center={MALANG_CENTER}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {towers.map((tower) => (
        <Marker
          key={tower.id}
          position={[tower.latitude, tower.longitude]}
          eventHandlers={{
            click: () => {
              onSelectTower(tower);
            },
          }}
        >
          <Tooltip>{tower.id}</Tooltip>
        </Marker>
      ))}

      {selectedTower && (
        <Popup position={[selectedTower.latitude, selectedTower.longitude]} onClose={() => onSelectTower(null)}>
           <div className="p-1 w-60">
              <h3 className="font-bold text-lg text-primary">{selectedTower.id}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedTower.village}, {selectedTower.district}
              </p>
              <div className="mt-4 text-xs space-y-2">
                <p>
                  <strong>Provider:</strong> {selectedTower.providerName}
                </p>
                <p>
                  <strong>Owner:</strong> {selectedTower.ownerName}
                </p>
                <p>
                  <strong>Owner Contact:</strong> {selectedTower.ownerPhoneNumber}
                </p>
                <p>
                  <strong>Height:</strong> {selectedTower.height}m
                </p>
              </div>
            </div>
        </Popup>
      )}
    </MapContainer>
  );
}
