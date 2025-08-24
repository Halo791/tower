'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getPrediction } from '@/lib/actions';
import type { Tower } from '@/types';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface PredictiveMaintenanceToolProps {
  towers: Tower[];
}

const formSchema = z.object({
  towerId: z.string().min(1, 'Silakan pilih menara.'),
  notes: z.string().min(10, 'Harap berikan data analisis yang lebih detail.'),
});

const initialState = {
  message: '',
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Dapatkan Prediksi
    </Button>
  );
}

export default function PredictiveMaintenanceTool({ towers }: PredictiveMaintenanceToolProps) {
  const [state, formAction] = useActionState(getPrediction, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      towerId: '',
      notes: 'Inspeksi terakhir 6 bulan lalu, ditemukan korosi ringan di level 3. Konsumsi daya rata-rata stabil. Tidak ada downtime yang dilaporkan dalam 2 tahun terakhir. Sensor getaran menunjukkan peningkatan osilasi sebesar 5% selama seminggu terakhir.',
    },
  });

  React.useEffect(() => {
    if (state?.message && state.message !== 'success') {
       toast({
         variant: 'destructive',
         title: 'Kesalahan Prediksi',
         description: state.message,
       });
    }
  }, [state, toast]);

  return (
    <Card>
      <Form {...form}>
        <form action={formAction}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">AI Pemeliharaan Prediktif</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription className="text-xs">
              Gunakan AI untuk memprediksi masalah menara.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="towerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menara</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih menara" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {towers.map((tower) => (
                        <SelectItem key={tower.id} value={tower.id}>
                          {tower.id} - {tower.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data untuk Analisis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Masukkan data untuk dianalisis..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <SubmitButton />
            {state?.data && (
              <Alert>
                <AlertTitle>Hasil Prediksi AI</AlertTitle>
                <AlertDescription className="space-y-2 whitespace-pre-wrap font-mono text-xs">
                  <div>
                    <p className="font-semibold">Prediksi Masalah:</p>
                    <p>{(state.data as any).predictedIssues}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Rekomendasi Tindakan:</p>
                    <p>{(state.data as any).recommendedActions}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
