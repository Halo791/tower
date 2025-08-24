import { USER_ROLES } from "@/lib/constants";

export type Tower = {
  id: string;
  id_site?: string;
  providerName: string; 
  ownerName: string; 
  ownerPhoneNumber: string;
  village: string; 
  district: string; 
  address: string;
  rtRw: string; 
  latitude: number; 
  longitude: number;
  height: number; 
  coverageRadius: number; 
  status: string; 
  operationalDate: string; 
  surveyDate?: string; 
  notes?: string; 
  petugas_1?: string;
  petugas_2?: string;
  verifikator?: string;
};

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
