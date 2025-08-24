'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarGroup,
  SidebarSeparator,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/icons';
import { towers as allTowers } from '@/lib/mock-data';
import type { Tower, UserRole } from '@/types';
import { MOCK_OWNER_NAME, MOCK_PROVIDER_NAME, USER_ROLES } from '@/lib/constants';

import TowerTable from './tower-table';
import TowerFilters from './tower-filters';
import RoleSwitcher from './role-switcher';
import PredictiveMaintenanceTool from './predictive-maintenance-tool';
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

export default function DashboardLayout() {
  const [role, setRole] = React.useState<UserRole>(USER_ROLES.SUPERADMIN);
  const [filteredTowers, setFilteredTowers] = React.useState<Tower[]>(allTowers);
  const [selectedTower, setSelectedTower] = React.useState<Tower | null>(null);

  const districts = React.useMemo(() => [...new Set(allTowers.map((t) => t.district))], []);
  const providers = React.useMemo(() => [...new Set(allTowers.map((t) => t.providerName))], []);

  const handleFilterChange = React.useCallback(
    (filters: { district: string; provider: string; height: number[] }) => {
      let towersByRole: Tower[];

      switch (role) {
        case USER_ROLES.PROVIDER:
          towersByRole = allTowers.filter((t) => t.providerName === MOCK_PROVIDER_NAME);
          break;
        case USER_ROLES.OWNER:
          towersByRole = allTowers.filter((t) => t.ownerName === MOCK_OWNER_NAME);
          break;
        case USER_ROLES.SUPERADMIN:
        default:
          towersByRole = allTowers;
          break;
      }

      const filtered = towersByRole.filter((tower) => {
        const districtMatch = filters.district === 'all' || tower.district === filters.district;
        const providerMatch = filters.provider === 'all' || tower.providerName === filters.provider;
        const heightMatch = tower.height >= filters.height[0];
        return districtMatch && providerMatch && heightMatch;
      });
      setFilteredTowers(filtered);
      setSelectedTower(null); // Reset selection on filter change
    },
    [role]
  );

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

  React.useEffect(() => {
    handleFilterChange({ district: 'all', provider: 'all', height: [0] });
  }, [role, handleFilterChange]);
  
  const handleSelectTower = React. useCallback((tower: Tower) => {
    setSelectedTower(tower);
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppLogo className="size-6 text-primary" />
            <h1 className="text-lg font-semibold">Tower Dashboard</h1>
            <div className="ml-auto">
              <SidebarTrigger />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <RoleSwitcher role={role} setRole={setRole} />
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <TowerFilters districts={districts} providers={providers} onFilterChange={handleFilterChange} role={role} />
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <PredictiveMaintenanceTool towers={allTowers} />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground p-2">&copy; {new Date().getFullYear()} Malang Tower Management</p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Towers</CardTitle>
                <TowerIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTowers}</div>
                <p className="text-xs text-muted-foreground">in Malang City</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Height</CardTitle>
                <TowerIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageHeight}m</div>
                <p className="text-xs text-muted-foreground">across all towers</p>
              </CardContent>
            </Card>
          </div>

          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle>Tower Map</CardTitle>
            </CardHeader>
            <CardContent>
              <MapView towers={filteredTowers} selectedTower={selectedTower} onSelectTower={handleSelectTower} />
            </CardContent>
          </Card>


          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart className="size-5" />
                  Tower Distribution by District
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
                  Towers by Provider
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
          <TowerTable towers={filteredTowers} onSelectTower={handleSelectTower} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
