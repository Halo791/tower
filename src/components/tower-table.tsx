'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tower } from '@/types';
import { ScrollArea } from './ui/scroll-area';

interface TowerTableProps {
  towers: Tower[];
  onSelectTower: (tower: Tower) => void;
}

export default function TowerTable({ towers, onSelectTower }: TowerTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTowers = (towers || []).filter(
    (tower) =>
      tower.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tower.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tower.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tower.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tower.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <CardTitle>Tower List</CardTitle>
                <CardDescription>
                Showing {filteredTowers.length} of {towers?.length || 0} towers.
                </CardDescription>
            </div>
            <Input
                placeholder="Search towers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
            />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Height (m)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTowers.length > 0 ? (
                filteredTowers.map((tower) => (
                  <TableRow key={tower.id} onClick={() => onSelectTower(tower)} className="cursor-pointer">
                    <TableCell className="font-medium">{tower.id}</TableCell>
                    <TableCell>
                      {tower.village}, {tower.district}
                    </TableCell>
                    <TableCell>{tower.providerName}</TableCell>
                    <TableCell>{tower.ownerName}</TableCell>
                    <TableCell>{tower.height}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
