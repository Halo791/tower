// predictive-maintenance-prompt.ts
'use server';

/**
 * @fileOverview Alur AI untuk pemeliharaan prediktif infrastruktur menara.
 *
 * File ini mendefinisikan alur Genkit untuk melakukan pemeliharaan prediktif pada menara,
 * dengan memanfaatkan data historis dan real-time.
 *
 * @exports predictiveMaintenance - Fungsi utama untuk memicu alur pemeliharaan prediktif.
 * @exports PredictiveMaintenanceInput - Tipe input untuk fungsi predictiveMaintenance.
 * @exports PredictiveMaintenanceOutput - Tipe output untuk fungsi predictiveMaintenance.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  towerId: z.string().describe('ID menara yang akan dilakukan pemeliharaan prediktif.'),
  notes: z.string().describe('Catatan atau data mengenai menara yang akan dianalisis.'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  predictedIssues: z.string().describe('Prediksi masalah pemeliharaan untuk menara.'),
  recommendedActions: z.string().describe('Rekomendasi tindakan untuk mengatasi masalah yang diprediksi.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function predictiveMaintenance(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return predictiveMaintenanceFlow(input);
}

const predictiveMaintenancePrompt = ai.definePrompt({
  name: 'predictiveMaintenancePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  prompt: `Anda adalah asisten AI yang berspesialisasi dalam pemeliharaan prediktif untuk infrastruktur menara.

  Analisis data yang diberikan untuk menara dengan ID {{{towerId}}} untuk memprediksi potensi masalah pemeliharaan dan merekomendasikan tindakan.

  Data Menara: {{{notes}}}

  Berdasarkan informasi ini, apa prediksi masalah pemeliharaan dan rekomendasi tindakan yang perlu dilakukan?
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
