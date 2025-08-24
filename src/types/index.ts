export type Tower = {
  id: string;
  providerName: string; // `nama` in DB
  ownerName: string; // `pemilik_provider` or `penunggu_nama`
  ownerPhoneNumber: string; // `penunggu_telepon`
  village: string; // `desa_kelurahan`
  district: string; // `kecamatan`
  address: string; // `alamat`
  rtRw: string; // `rt_rw`
  latitude: number; // `lat`
  longitude: number; // `lng`
  height: number; // `tinggi_tower`
  coverageRadius: number; // `radius` in meters
  status: string; // `status_aktif`
  operationalDate: string; // `bulan_tahun_operasional`
  surveyDate?: string; // `tanggal_survey`
  notes?: string; // `keterangan`
};

export type UserRole = "superadmin" | "provider" | "owner";
