'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';
import type { UserRole } from '@/types';

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

  React.useEffect(() => {
    onFilterChange({ district, provider, height });
  }, [district, provider, height, onFilterChange]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Filter</CardTitle>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription className="text-xs">
          Saring menara di dasbor & peta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="district-filter">Kecamatan</Label>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger id="district-filter">
              <SelectValue placeholder="Pilih Kecamatan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kecamatan</SelectItem>
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
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger id="provider-filter">
              <SelectValue placeholder="Pilih Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Provider</SelectItem>
              {providers.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="height-filter">Tinggi Min.: {height[0]}m</Label>
          <Slider
            id="height-filter"
            min={0}
            max={100}
            step={5}
            value={height}
            onValueChange={setHeight}
          />
        </div>
      </CardContent>
    </Card>
  );
}
