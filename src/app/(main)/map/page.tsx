'use client';

import { MapPageContent } from "@/components/dashboard-layout";
import { Tower } from "@/types";

interface MapPageProps {
    towers: Tower[];
    selectedTower: Tower | null;
    onSelectTower: (tower: Tower | null) => void;
}

export default function MapPage({ towers, selectedTower, onSelectTower }: MapPageProps) {
    return <MapPageContent towers={towers} selectedTower={selectedTower} onSelectTower={onSelectTower} />
}
