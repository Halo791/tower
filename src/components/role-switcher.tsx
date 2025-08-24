'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import type { UserRole } from '@/types';

interface RoleSwitcherProps {
  role: UserRole;
}

export default function RoleSwitcher({ role }: RoleSwitcherProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Peran Pengguna</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold capitalize">{role}</div>
        <p className="text-xs text-muted-foreground">Anda masuk sebagai {role}.</p>
      </CardContent>
    </Card>
  );
}
