'use client';
import { DashboardPageContent } from '@/components/dashboard-layout';
import { Tower } from '@/types';

interface DashboardPageProps {
  towers: Tower[];
  onSelectTower: (tower: Tower | null) => void;
}

export default function DashboardPage({ towers, onSelectTower }: DashboardPageProps) {
  return <DashboardPageContent towers={towers} onSelectTower={onSelectTower} />;
}
