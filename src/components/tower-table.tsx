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
              <CardTitle>Daftar Menara</CardTitle>
              <CardDescription>
                Menampilkan {filteredTowers.length} dari {towers.length} menara.
              </CardDescription>
            </div>
            <Input
              placeholder="Cari menara..."
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
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Pemilik</TableHead>
                  <TableHead>Tinggi (m)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTowers.length > 0 ? (
                  filteredTowers.map((tower) => (
                    <TableRow key={tower.id} className="cursor-pointer" onClick={() => onSelectTower(tower)}>
                      <TableCell className="font-medium">{tower.id}</TableCell>
                      <TableCell>
                        {tower.address}, {tower.village}, {tower.district}
                      </TableCell>
                      <TableCell>{tower.providerName}</TableCell>
                      <TableCell>{tower.ownerName}</TableCell>
                      <TableCell>{tower.height}</TableCell>
                      <TableCell>{tower.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handlePreview(tower.id); }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Tidak ada hasil yang ditemukan.
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
