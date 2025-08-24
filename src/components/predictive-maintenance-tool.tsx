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
  towerId: z.string().min(1, 'Please select a tower.'),
  historicalData: z.string().min(10, 'Please provide more historical data.'),
  realTimeData: z.string().min(10, 'Please provide more real-time data.'),
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
      Get Prediction
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
      historicalData:
        'Last inspection 6 months ago, minor corrosion found on level 3. Average power consumption stable. No downtime reported in the last 2 years.',
      realTimeData:
        'Vibration sensors show a 5% increase in oscillations over the last week. Temperature is within normal range. Power draw has intermittent spikes of 2%.',
    },
  });

  React.useEffect(() => {
    if (state?.message && state.message !== 'success') {
       toast({
         variant: 'destructive',
         title: 'Prediction Error',
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
              <CardTitle className="text-sm font-medium">Predictive Maintenance AI</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription className="text-xs">
              Use AI to predict tower issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="towerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tower</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tower" />
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
              name="historicalData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter historical data..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="realTimeData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Real-time Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter real-time data..." {...field} />
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
                <AlertTitle>AI Prediction Result</AlertTitle>
                <AlertDescription className="space-y-2 whitespace-pre-wrap font-mono text-xs">
                  <div>
                    <p className="font-semibold">Predicted Issues:</p>
                    <p>{(state.data as any).predictedIssues}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Recommended Actions:</p>
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
