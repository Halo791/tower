'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import type { UserRole } from '@/types';
import { USER_ROLES } from '@/lib/constants';

interface RoleSwitcherProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export default function RoleSwitcher({ role, setRole }: RoleSwitcherProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User Role</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold capitalize">{role}</div>
        <p className="text-xs text-muted-foreground">Select a role to change view</p>
        <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
          <SelectTrigger className="mt-4">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={USER_ROLES.SUPERADMIN}>Superadmin</SelectItem>
            <SelectItem value={USER_ROLES.PROVIDER}>Provider</SelectItem>
            <SelectItem value={USER_ROLES.OWNER}>Owner</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
