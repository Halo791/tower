'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { towers as allTowers } from '@/lib/mock-data';
import type { Tower } from '@/types';
import TowerTable from './tower-table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, PieChart, TowerControl as TowerIcon } from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const MapView = dynamic(() => import('./map-view'), {
  ssr: false,
});


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface PageContentProps {
  towers: Tower[];
  onSelectTower: (tower: Tower | null) => void;
}

export function DashboardPageContent({ towers, onSelectTower }: PageContentProps) {
    const districts = React.useMemo(() => [...new Set(allTowers.map((t) => t.district))], []);
    const providers = React.useMemo(() => [...new Set(allTowers.map((t) => t.providerName))], []);

    const totalTowers = React.useMemo(() => allTowers.length, []);
    const averageHeight = React.useMemo(
        () => Math.round(allTowers.reduce((acc, t) => acc + t.height, 0) / totalTowers),
        [totalTowers]
    );

    const districtChartData = React.useMemo(() => {
        return districts.map((district) => ({
        name: district,
        count: allTowers.filter((tower) => tower.district === district).length,
        }));
    }, [districts]);

    const providerChartData = React.useMemo(() => {
        return providers.map((provider) => ({
        name: provider,
        value: allTowers.filter((tower) => tower.providerName === provider).length,
        }));
    }, [providers]);


    return (
        <div className="flex flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Menara</CardTitle>
                <TowerIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTowers}</div>
                <p className="text-xs text-muted-foreground">di Kota Malang</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tinggi Rata-rata</CardTitle>
                <TowerIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageHeight}m</div>
                <p className="text-xs text-muted-foreground">di semua menara</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart className="size-5" />
                  Distribusi Menara per Kecamatan
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={districtChartData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip wrapperClassName="rounded-md border bg-background p-2 shadow-sm" contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PieChart className="size-5" />
                  Menara berdasarkan Provider
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={providerChartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {providerChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                     <Tooltip wrapperClassName="rounded-md border bg-background p-2 shadow-sm" contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <TowerTable towers={towers} onSelectTower={onSelectTower} />
        </div>
    )
}


export function MapPageContent({ towers, selectedTower, onSelectTower }: { towers: Tower[], selectedTower: Tower | null, onSelectTower: (tower: Tower | null) => void}) {
    return (
        <div className="h-full p-4">
             <Card className="h-full w-full">
                <CardHeader>
                <CardTitle>Peta Menara</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-4rem)]">
                <MapView towers={towers} selectedTower={selectedTower} onSelectTower={onSelectTower} />
                </CardContent>
            </Card>
        </div>
    )
}
