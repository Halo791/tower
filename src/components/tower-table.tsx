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
import type { Tower } from '@/types';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import { PrintDocument } from './print-document';

interface TowerTableProps {
  towers: Tower[];
  onSelectTower: (tower: Tower) => void;
}

export default function TowerTable({ towers = [], onSelectTower }: TowerTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handlePreview = (towerId: string) => {
    window.open(`/print/${towerId}`, '_blank');
  };

  const filteredTowers = towers.filter(
    (tower) =>
      (tower.id && tower.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tower.village && tower.village.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tower.district && tower.district.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tower.providerName && tower.providerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tower.ownerName && tower.ownerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tower.address && tower.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Tower List</CardTitle>
              <CardDescription>
                Showing {filteredTowers.length} of {towers.length} towers.
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
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTowers.length > 0 ? (
                  filteredTowers.map((tower) => (
                    <TableRow key={tower.id}>
                      <TableCell className="font-medium" onClick={() => onSelectTower(tower)}>{tower.id}</TableCell>
                      <TableCell onClick={() => onSelectTower(tower)}>
                        {tower.address}, {tower.village}, {tower.district}
                      </TableCell>
                      <TableCell onClick={() => onSelectTower(tower)}>{tower.providerName}</TableCell>
                      <TableCell onClick={() => onSelectTower(tower)}>{tower.ownerName}</TableCell>
                      <TableCell onClick={() => onSelectTower(tower)}>{tower.height}</TableCell>
                      <TableCell onClick={() => onSelectTower(tower)}>{tower.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handlePreview(tower.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
