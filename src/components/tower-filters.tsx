'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';
import type { UserRole } from '@/types';
import { USER_ROLES } from '@/lib/constants';

interface TowerFiltersProps {
  districts: string[];
  providers: string[];
  onFilterChange: (filters: { district: string; provider: string; height: number[] }) => void;
  role: UserRole;
}

export default function TowerFilters({ districts, providers, onFilterChange, role }: TowerFiltersProps) {
  const [district, setDistrict] = React.useState('all');
  const [provider, setProvider] = React.useState('all');
  const [height, setHeight] = React.useState([0]);

  const isDisabled = role !== USER_ROLES.SUPERADMIN;

  React.useEffect(() => {
    onFilterChange({ district, provider, height });
  }, [district, provider, height, onFilterChange]);

  React.useEffect(() => {
    // Reset filters when role changes and filters become disabled
    if (isDisabled) {
      setDistrict('all');
      setProvider('all');
      setHeight([0]);
    }
  }, [isDisabled]);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Filters</CardTitle>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription className="text-xs">
          Refine towers on the map.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="district-filter">District</Label>
          <Select value={district} onValueChange={setDistrict} disabled={isDisabled}>
            <SelectTrigger id="district-filter">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="provider-filter">Provider</Label>
          <Select value={provider} onValueChange={setProvider} disabled={isDisabled}>
            <SelectTrigger id="provider-filter">
              <SelectValue placeholder="Select Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              {providers.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="height-filter">Min. Height: {height[0]}m</Label>
          <Slider
            id="height-filter"
            min={0}
            max={100}
            step={5}
            value={height}
            onValueChange={setHeight}
            disabled={isDisabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
