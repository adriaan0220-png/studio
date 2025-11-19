'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { estimateTransportCost, suggestDeliveryOptimizations } from '@/app/lib/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Zap } from 'lucide-react';
import type { EstimateTransportCostOutput } from '@/ai/flows/transport-cost-estimate';
import type { SuggestDeliveryOptimizationsOutput } from '@/ai/flows/suggest-delivery-optimizations';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  deliveryLocation: z.string().min(3, 'Please enter a valid location (min. 3 characters)'),
  productType: z.string().min(1, 'Please select a product type'),
  quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(100, 'Minimum quantity is 100 liters')
  ),
});

type FormValues = z.infer<typeof formSchema>;
type OptimizationParams = FormValues & { currentCost: number };

interface CostEstimatorProps {
  productTypes: string[];
}

export default function CostEstimator({ productTypes }: CostEstimatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [estimate, setEstimate] = useState<EstimateTransportCostOutput | null>(null);
  const [optimizations, setOptimizations] = useState<SuggestDeliveryOptimizationsOutput | null>(null);
  const [optimizationParams, setOptimizationParams] = useState<OptimizationParams | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryLocation: '',
      productType: '',
      quantity: 10000,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setEstimate(null);
    setOptimizations(null);
    setOptimizationParams(null);

    const result = await estimateTransportCost(values);
    if (result.error) {
      toast({ variant: 'destructive', title: 'Estimation Error', description: result.error });
    } else if (result.data) {
      setEstimate(result.data);
      setOptimizationParams({ ...values, currentCost: result.data.estimatedCost });
    }
    setIsLoading(false);
  }

  async function handleGetOptimizations() {
    if (!optimizationParams) return;

    setIsOptimizing(true);
    setOptimizations(null);

    const result = await suggestDeliveryOptimizations({
        deliveryLocation: optimizationParams.deliveryLocation,
        productType: optimizationParams.productType,
        truckType: "Standard Tanker", // A default value, could be another form field
        currentCost: optimizationParams.currentCost,
    });
    
    if (result.error) {
        toast({ variant: 'destructive', title: 'Optimization Error', description: result.error });
    } else if (result.data) {
        setOptimizations(result.data);
    }
    setIsOptimizing(false);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Transport Cost Estimator</CardTitle>
          <CardDescription>Fill in the details to get an instant price quote.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="deliveryLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (in Liters)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Calculating...' : 'Estimate Cost'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        {!estimate && !isLoading && (
            <Card className="flex items-center justify-center h-full min-h-[300px] border-dashed">
                <div className="text-center text-muted-foreground p-8">
                    <p className="font-semibold">Your estimate will appear here.</p>
                    <p className="text-sm">Complete the form to see your delivery costs.</p>
                </div>
            </Card>
        )}
        {isLoading && (
          <Card className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center text-muted-foreground p-8">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 font-semibold">Our AI is crunching the numbers...</p>
              <p className="text-sm">This may take a moment.</p>
            </div>
          </Card>
        )}
        
        {estimate && (
          <Card className="animate-in fade-in-50">
            <CardHeader>
              <CardTitle>Your Estimate</CardTitle>
              <CardDescription>Based on the details provided for your shipment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 border rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Estimated Cost</p>
                <p className="text-5xl font-bold font-headline text-primary">€{estimate.estimatedCost.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cost Breakdown</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{estimate.breakdown}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2">
              <Button onClick={handleGetOptimizations} disabled={isOptimizing}>
                {isOptimizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                {isOptimizing ? 'Optimizing...' : 'Suggest Optimizations'}
              </Button>
              <Link href={{
                pathname: '/order/new',
                query: {
                  deliveryLocation: optimizationParams?.deliveryLocation,
                  productType: optimizationParams?.productType,
                  quantity: optimizationParams?.quantity,
                  estimatedCost: estimate.estimatedCost,
                }
              }} className="w-full">
                <Button variant="outline" className="w-full">Proceed to Order</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
        {optimizations && (
            <Card className="animate-in fade-in-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/>AI-Powered Suggestions</CardTitle>
                    <CardDescription>Here are some ways you might be able to lower your costs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{optimizations.optimizations}</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
