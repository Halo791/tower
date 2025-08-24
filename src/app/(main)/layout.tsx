'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/icons';
import { towers as allTowers } from '@/lib/mock-data';
import type { Tower, UserRole } from '@/types';
import { MOCK_OWNER_NAME, MOCK_PROVIDER_NAME, USER_ROLES } from '@/lib/constants';
import { LayoutDashboard, Map } from 'lucide-react';

import TowerFilters from '@/components/tower-filters';
import RoleSwitcher from '@/components/role-switcher';
import PredictiveMaintenanceTool from '@/components/predictive-maintenance-tool';

interface TowerDataContextType {
  towers: Tower[];
  selectedTower: Tower | null;
  onSelectTower: (tower: Tower | null) => void;
}

export const TowerDataContext = React.createContext<TowerDataContextType>({
  towers: [],
  selectedTower: null,
  onSelectTower: () => {},
});


export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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

  React.useEffect(() => {
    handleFilterChange({ district: 'all', provider: 'all', height: [0] });
  }, [role, handleFilterChange]);
  
  const handleSelectTower = React.useCallback((tower: Tower | null) => {
    setSelectedTower(tower);
  }, []);

  const contextValue = {
    towers: filteredTowers,
    selectedTower: selectedTower,
    onSelectTower: handleSelectTower
  };

  return (
    <TowerDataContext.Provider value={contextValue}>
      <div className="h-full">
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard')}>
                            <Link href="/dashboard">
                                <LayoutDashboard />
                                Dashboard
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/map')}>
                            <Link href="/map">
                                <Map />
                                Map View
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
              <SidebarSeparator />
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
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TowerDataContext.Provider>
  );
}
