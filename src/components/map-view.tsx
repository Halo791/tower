'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Tooltip } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { Tower } from '@/types';

const MALANG_CENTER: LatLngExpression = [-7.9666, 112.6326];

interface MapViewProps {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

// This component contains all map-rendering logic
function MapContent({ towers = [], selectedTower, onSelectTower }: MapViewProps) {
  const map = useMap();

  React.useEffect(() => {
    if (selectedTower) {
      map.flyTo([selectedTower.latitude, selectedTower.longitude], 15);
    }
  }, [selectedTower, map]);

  return (
    <>
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
              Owner: {tower.ownerName}<br/>
              Tinggi: {tower.height}m
            </Popup>
            <Tooltip>{tower.id}</Tooltip>
          </Marker>
          <Circle
            center={[tower.latitude, tower.longitude]}
            pathOptions={{
              color: selectedTower?.id === tower.id ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
              fillColor: selectedTower?.id === tower.id ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
              fillOpacity: 0.2,
            }}
            radius={tower.coverageRadius}
          />
        </React.Fragment>
      ))}
    </>
  );
}


export default function MapView({ towers, selectedTower, onSelectTower }: MapViewProps) {
  // This state ensures the component only renders on the client
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      {isClient ? (
        <MapContainer
          center={MALANG_CENTER}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          {/* Map content is a child, so it can re-render without re-initializing the container */}
          <MapContent towers={towers} selectedTower={selectedTower} onSelectTower={onSelectTower} />
        </MapContainer>
      ) : (
        // You can show a loading skeleton or a placeholder here
        <div>Loading map...</div>
      )}
    </div>
  );
}
