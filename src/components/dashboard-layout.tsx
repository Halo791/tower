'use client';

import * as React from 'react';
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

import MapView from './map-view';
import TowerFilters from './tower-filters';
import RoleSwitcher from './role-switcher';
import PredictiveMaintenanceTool from './predictive-maintenance-tool';

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
      setSelectedTower(null);
    },
    [role]
  );

  React.useEffect(() => {
    // Reset filters when role changes
    handleFilterChange({ district: 'all', provider: 'all', height: [0] });
  }, [role, handleFilterChange]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppLogo className="size-6 text-primary" />
            <h1 className="text-lg font-semibold">Malang Tower Locator</h1>
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
            <TowerFilters
              districts={districts}
              providers={providers}
              onFilterChange={handleFilterChange}
              role={role}
            />
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <PredictiveMaintenanceTool towers={allTowers} />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground p-2">
            &copy; {new Date().getFullYear()} Malang Tower Locator
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <MapView
          towers={filteredTowers}
          selectedTower={selectedTower}
          onSelectTower={setSelectedTower}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
