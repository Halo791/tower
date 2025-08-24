'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Tooltip } from 'react-leaflet';
import type { LatLngExpression, Map } from 'leaflet';
import { Tower } from '@/types';

const MALANG_CENTER: LatLngExpression = [-7.9666, 112.6326];

interface MapViewProps {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

function MapUpdater({ selectedTower }: { selectedTower: Tower | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (selectedTower) {
      map.flyTo([selectedTower.latitude, selectedTower.longitude], 15);
    }
  }, [selectedTower, map]);
  return null;
}

export default function MapView({ towers, selectedTower, onSelectTower }: MapViewProps) {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={MALANG_CENTER}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {towers.map((tower) => (
          <React.Fragment key={tower.id}>
            <Marker
              position={[tower.latitude, tower.longitude]}
              eventHandlers={{
                click: () => {
                  onSelectTower(tower);
                },
              }}
            >
              <Popup>
                <b>{tower.id} - {tower.providerName}</b><br />
                {tower.village}, {tower.district}<br />
                Tinggi: {tower.height}m
              </Popup>
              <Tooltip>{tower.id}</Tooltip>
            </Marker>
            <Circle
              center={[tower.latitude, tower.longitude]}
              pathOptions={{
                color: selectedTower?.id === tower.id ? 'blue' : 'green',
                fillColor: selectedTower?.id === tower.id ? '#3388ff' : '#22c55e',
                fillOpacity: 0.2,
              }}
              radius={tower.coverageRadius}
            />
          </React.Fragment>
        ))}
        <MapUpdater selectedTower={selectedTower} />
      </MapContainer>
    </div>
  );
}
