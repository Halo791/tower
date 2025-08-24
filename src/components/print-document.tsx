'use client';

import * as React from 'react';
import type { Tower } from '@/types';
import Image from 'next/image';

interface PrintDocumentProps {
  tower: Tower;
}

export function PrintDocument({ tower }: PrintDocumentProps) {
  return (
    <div className="bg-white text-black font-sans p-4">
      <div className="text-center mb-4">
        <h1 className="font-bold text-sm">FORM PENDATAAN TOWER TELEKOMUNIKASI</h1>
        <p className="text-xs">TIM PENGENDALIAN DAN PENGAWASAN MENARA TELEKOMUNIKASI</p>
        <p className="text-xs">DINAS KOMUNIKASI DAN INFORMATIKA KABUPATEN MALANG</p>
      </div>

      <div className="border border-black">
        <h2 className="bg-gray-200 text-center font-bold text-xs p-1 border-b border-black">IDENTITAS MENARA TELEKOMUNIKASI</h2>
        <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="border border-gray-400 p-1 w-1/4">1. ID SITE</td>
              <td className="border border-gray-400 p-1 w-3/4" colSpan={3}>{tower.id_site || tower.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">PEMILIK/PROVIDER</td>
              <td className="border border-gray-400 p-1" colSpan={3}>{tower.providerName}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">2. ALAMAT</td>
              <td className="border border-gray-400 p-1">{tower.address}</td>
              <td className="border border-gray-400 p-1">RT/RW: {tower.rtRw}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">3. DESA/KEL</td>
              <td className="border border-gray-400 p-1">{tower.village}</td>
              <td className="border border-gray-400 p-1">KECAMATAN: {tower.district}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">4. LATITUDE</td>
              <td className="border border-gray-400 p-1">{tower.latitude}</td>
              <td className="border border-gray-400 p-1">LONGITUDE: {tower.longitude}</td>
            </tr>
             <tr>
              <td className="border border-gray-400 p-1">5. TINGGI TOWER</td>
              <td className="border border-gray-400 p-1">{tower.height}m</td>
              <td className="border border-gray-400 p-1">TELAH AKTIF/OPERASIONAL: {tower.status}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">6. BULAN/TAHUN OPERASIONAL</td>
              <td className="border border-gray-400 p-1">{tower.operationalDate}</td>
               <td className="border border-gray-400 p-1">KETERANGAN: {tower.notes}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-x border-b border-black mt-4">
        <h2 className="bg-gray-200 text-center font-bold text-xs p-1 border-b border-black">FOTO DOKUMENTASI</h2>
        <div className="grid grid-cols-2">
            <div className="border-r border-b border-black text-center p-1">
                <p className="text-xs mb-1">Foto Tower Menyeluruh Atas</p>
                <Image src="https://placehold.co/300x200.png" alt="Foto Tower Atas" width={300} height={200} className="mx-auto" data-ai-hint="tower above"/>
            </div>
            <div className="border-b border-black text-center p-1">
                <p className="text-xs mb-1">Foto Tower Menyeluruh Bawah</p>
                <Image src="https://placehold.co/300x200.png" alt="Foto Tower Bawah" width={300} height={200} className="mx-auto" data-ai-hint="tower below"/>
            </div>
             <div className="border-r border-black text-center p-1">
                <p className="text-xs mb-1">Foto Perangkat BTS Bagian Bawah (PLN)</p>
                <Image src="https://placehold.co/300x200.png" alt="Foto BTS" width={300} height={200} className="mx-auto" data-ai-hint="bts device"/>
            </div>
            <div className="text-center p-1">
                <p className="text-xs mb-1">Barcode / Papan Tower</p>
                <Image src="https://placehold.co/300x200.png" alt="Barcode" width={300} height={200} className="mx-auto" data-ai-hint="barcode tower"/>
            </div>
        </div>
      </div>

       <div className="border-x border-b border-black mt-4">
        <h2 className="bg-gray-200 text-center font-bold text-xs p-1 border-b border-black">KETERANGAN LAIN-LAIN</h2>
         <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="border border-gray-400 p-1 w-1/4">TANGGAL SURVEY</td>
              <td className="border border-gray-400 p-1" colSpan={2}>{tower.surveyDate || new Date().toISOString().slice(0,10)}</td>
            </tr>
             <tr>
                <td className="bg-gray-200 text-center font-bold p-1 border border-gray-400" colSpan={3}>PENUNGGU TOWER</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">NAMA</td>
              <td className="border border-gray-400 p-1">{tower.ownerName}</td>
               <td className="border border-gray-400 p-1">TELEPON: {tower.ownerPhoneNumber}</td>
            </tr>
             <tr>
                <td className="bg-gray-200 text-center font-bold p-1 border border-gray-400" colSpan={3}>PETUGAS SURVEY</td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-1">Petugas 1: {tower.petugas_1}</td>
              <td className="border border-gray-400 p-1">Petugas 2: {tower.petugas_2}</td>
              <td className="border border-gray-400 p-1">Verifikator: {tower.verifikator}</td>
            </tr>
          </tbody>
        </table>
       </div>

        <div className="mt-8 flex justify-end">
            <div className="text-center text-xs w-1/3">
                <p>Mengetahui,</p>
                <p className="font-bold">KEPALA BIDANG INFRASTRUKTUR TIK</p>
                <div className="h-16"></div>
                <p className="font-bold underline">LINDEN SURYAWAN, ST, M.Eng</p>
                <p>Pembina</p>
                <p>19790101 200604 1 045</p>
            </div>
        </div>
    </div>
  );
}
