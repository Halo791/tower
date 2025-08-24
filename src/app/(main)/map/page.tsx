'use client';

import { useContext } from 'react';
import { MapPageContent } from "@/components/dashboard-layout";
import { TowerDataContext } from '../layout';


export default function MapPage() {
    const { towers, selectedTower, onSelectTower } = useContext(TowerDataContext);
    return <MapPageContent towers={towers} selectedTower={selectedTower} onSelectTower={onSelectTower} />
}
