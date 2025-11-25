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
  deliveryLocation: z.string().min(3, 'Por favor, ingrese una ubicación válida (mín. 3 caracteres)'),
  productType: z.string().min(1, 'Por favor, seleccione un tipo de producto'),
  quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(100, 'La cantidad mínima es de 100 litros')
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
      toast({ variant: 'destructive', title: 'Error de Estimación', description: result.error });
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
        truckType: "Cisterna Estándar", // Un valor por defecto, podría ser otro campo de formulario
        currentCost: optimizationParams.currentCost,
    });
    
    if (result.error) {
        toast({ variant: 'destructive', title: 'Error de Optimización', description: result.error });
    } else if (result.data) {
        setOptimizations(result.data);
    }
    setIsOptimizing(false);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Estimador de Costos de Transporte</CardTitle>
          <CardDescription>Complete los detalles para obtener una cotización instantánea.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="deliveryLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lugar de Entrega</FormLabel>
                    <FormControl>
                      <Input placeholder="ej., París, Francia" {...field} />
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
                    <FormLabel>Tipo de Producto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un producto" />
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
                    <FormLabel>Cantidad (en Litros)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ej., 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Calculando...' : 'Estimar Costo'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        {!estimate && !isLoading && (
            <Card className="flex items-center justify-center h-full min-h-[300px] border-dashed">
                <div className="text-center text-muted-foreground p-8">
                    <p className="font-semibold">Su estimación aparecerá aquí.</p>
                    <p className="text-sm">Complete el formulario para ver sus costos de envío.</p>
                </div>
            </Card>
        )}
        {isLoading && (
          <Card className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center text-muted-foreground p-8">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 font-semibold">Nuestra IA está calculando los números...</p>
              <p className="text-sm">Esto puede tomar un momento.</p>
            </div>
          </Card>
        )}
        
        {estimate && (
          <Card className="animate-in fade-in-50">
            <CardHeader>
              <CardTitle>Su Estimación</CardTitle>
              <CardDescription>Basado en los detalles proporcionados para su envío.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 border rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Costo Estimado</p>
                <p className="text-5xl font-bold font-headline text-primary">€{estimate.estimatedCost.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Desglose de Costos</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{estimate.breakdown}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2">
              <Button onClick={handleGetOptimizations} disabled={isOptimizing}>
                {isOptimizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                {isOptimizing ? 'Optimizando...' : 'Sugerir Optimizaciones'}
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
                <Button variant="outline" className="w-full">Proceder al Pedido</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
        {optimizations && (
            <Card className="animate-in fade-in-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/>Sugerencias de IA</CardTitle>
                    <CardDescription>Aquí hay algunas formas en que podría reducir sus costos.</CardDescription>
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
