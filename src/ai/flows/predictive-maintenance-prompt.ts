// predictive-maintenance-prompt.ts
'use server';

/**
 * @fileOverview Predictive maintenance AI flow for tower infrastructure.
 *
 * This file defines a Genkit flow to perform predictive maintenance on towers,
 * leveraging historical and real-time data.
 *
 * @exports predictiveMaintenance - The main function to trigger the predictive maintenance flow.
 * @exports PredictiveMaintenanceInput - The input type for the predictiveMaintenance function.
 * @exports PredictiveMaintenanceOutput - The output type for the predictiveMaintenance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  towerId: z.string().describe('The ID of the tower to perform predictive maintenance on.'),
  historicalData: z.string().describe('Historical data for the specified tower.'),
  realTimeData: z.string().describe('Real-time data from similar towers.'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  predictedIssues: z.string().describe('Predicted maintenance issues for the tower.'),
  recommendedActions: z.string().describe('Recommended actions to address the predicted issues.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function predictiveMaintenance(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return predictiveMaintenanceFlow(input);
}

const predictiveMaintenancePrompt = ai.definePrompt({
  name: 'predictiveMaintenancePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  prompt: `You are an AI assistant specialized in predictive maintenance for tower infrastructure.

  Analyze the provided historical data for tower ID {{{towerId}}} and real-time data from similar towers to predict potential maintenance issues and recommend actions.

  Historical Data: {{{historicalData}}}
  Real-time Data from Similar Towers: {{{realTimeData}}}

  Based on this information, what are the predicted maintenance issues and recommended actions?
  `,
});

const predictiveMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictiveMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const {output} = await predictiveMaintenancePrompt(input);
    return output!;
  }
);
