'use server';

import { predictiveMaintenance, type PredictiveMaintenanceInput } from "@/ai/flows/predictive-maintenance-prompt";
import { z } from "zod";

const formSchema = z.object({
  towerId: z.string().min(1, "Please select a tower."),
  historicalData: z.string().min(1, "Historical data is required."),
  realTimeData: z.string().min(1, "Real-time data is required."),
});

export async function getPrediction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
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
