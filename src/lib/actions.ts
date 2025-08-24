'use server';

import { predictiveMaintenance, type PredictiveMaintenanceInput } from "@/ai/flows/predictive-maintenance-prompt";
import { z } from "zod";
import { MOCK_USERS } from './auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const predictiveMaintenanceFormSchema = z.object({
  towerId: z.string().min(1, "Please select a tower."),
  historicalData: z.string().min(1, "Historical data is required."),
  realTimeData: z.string().min(1, "Real-time data is required."),
});

export async function getPrediction(prevState: any, formData: FormData) {
  const validatedFields = predictiveMaintenanceFormSchema.safeParse({
    towerId: formData.get('towerId'),
    historicalData: formData.get('historicalData'),
    realTimeData: formData.get('realTimeData'),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await predictiveMaintenance(validatedFields.data as PredictiveMaintenanceInput);
    return { message: "success", data: result };
  } catch (error) {
    console.error(error);
    return { message: "Prediction failed. Please try again." };
  }
}

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const user = MOCK_USERS.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return {
      message: 'Invalid email or password',
      errors: { _form: ['Invalid email or password'] },
    };
  }

  const session = {
    isLoggedIn: true,
    role: user.role,
    email: user.email
  };

  cookies().set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  
  redirect('/dashboard');
}


export async function logout() {
  cookies().delete('session');
  redirect('/login');
}
