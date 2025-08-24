export type Tower = {
  id: string;
  height: number;
  district: string;
  village: string;
  longitude: number;
  latitude: number;
  providerName: string;
  ownerName: string;
  ownerPhoneNumber: string;
  coverageRadius: number;
};

export type UserRole = "superadmin" | "provider" | "owner";
