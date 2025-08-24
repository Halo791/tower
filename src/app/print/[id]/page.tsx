
'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { towers } from '@/lib/mock-data';
import { PrintDocument } from '@/components/print-document';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function PrintPage() {
  const params = useParams();
  const id = params.id as string;

  const tower = React.useMemo(() => towers.find((t) => t.id === id), [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!tower) {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <p>Tower with ID {id} not found.</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="no-print p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">Print Preview: Tower {tower.id}</h1>
        <Button onClick={handlePrint}>
            <Printer className="mr-2"/>
            Print Document
        </Button>
      </div>
      <div className="p-4">
        <div className="max-w-5xl mx-auto">
             <div className="print-only">
                <PrintDocument tower={tower} />
             </div>
        </div>
      </div>
    </div>
  );
}
