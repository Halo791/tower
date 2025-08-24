'use client';
import { useContext } from 'react';
import { DashboardPageContent } from '@/components/dashboard-layout';
import { TowerDataContext } from '../layout';

export default function DashboardPage() {
  const { towers, onSelectTower } = useContext(TowerDataContext);
  return <DashboardPageContent towers={towers} onSelectTower={onSelectTower} />;
}
