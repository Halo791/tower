'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { Tower } from '@/types';

interface MapViewProps {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

const MALANG_CENTER: LatLngExpression = [-7.9666, 112.6333];

// This is a workaround for a known issue with react-leaflet and Next.js App Router
// It dynamically imports the MapContainer to ensure Leaflet's CSS is loaded correctly.
const DynamicMapContainer = (props: React.ComponentProps<typeof MapContainer>) => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <MapContainer {...props} /> : null;
};


export default function MapView({ towers, selectedTower, onSelectTower }: MapViewProps) {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (mapRef.current && selectedTower) {
      (mapRef.current as any).flyTo([selectedTower.latitude, selectedTower.longitude], 15);
    }
  }, [selectedTower]);


  return (
    <DynamicMapContainer
      center={MALANG_CENTER}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-full border-0"
      ref={mapRef}
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
          {selectedTower && selectedTower.id === tower.id && (
             <Popup>
                <div className="p-1 w-60">
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
             </Popup>
          )}
        </Marker>
      ))}
    </DynamicMapContainer>
  );
}
