import { cookies } from 'next/headers';
import type { UserRole } from '@/types';
import { USER_ROLES } from './constants';

export const MOCK_USERS = [
  { email: 'admin@example.com', password: 'password', role: USER_ROLES.SUPERADMIN },
  { email: 'provider@example.com', password: 'password', role: USER_ROLES.PROVIDER },
  { email: 'owner@example.com', password: 'password', role: USER_ROLES.OWNER },
];

export type Session = {
  isLoggedIn: boolean;
  role: UserRole;
  email: string;
};

export async function getSession(): Promise<Session | null> {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    return JSON.parse(sessionCookie);
  } catch (error) {
    return null;
  }
}
