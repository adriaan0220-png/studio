
'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function OrderFormComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const deliveryLocation = searchParams.get('deliveryLocation');
  const productType = searchParams.get('productType');
  const quantity = searchParams.get('quantity');
  const estimatedCost = searchParams.get('estimatedCost');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: 'Comanda Realitzada!',
      description: 'La seva comanda s\'ha enviat amb èxit. Ens posarem en contacte amb vós ben aviat.',
    });
    router.push('/orders');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Resum de la Comanda</CardTitle>
          <CardDescription>Detalls del seu enviament.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Producte</span>
            <span className="font-medium text-right">{productType || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Quantitat</span>
            <span className="font-medium text-right">{quantity ? `${Number(quantity).toLocaleString()} Litres` : 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Lloc d'Entrega</span>
            <span className="font-medium text-right">{deliveryLocation || 'N/A'}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Cost Estimat</span>
            <span className="font-bold text-primary">€{estimatedCost ? Number(estimatedCost).toLocaleString() : 'N/A'}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Informació de Contacte</CardTitle>
          <CardDescription>Farem servir això per posar-nos en contacte sobre la seva comanda.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom Complet</Label>
              <Input id="name" placeholder="Joan Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adreça de Correu Electrònic</Label>
              <Input id="email" type="email" placeholder="joan.perez@exemple.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Nom de l'Empresa (Opcional)</Label>
              <Input id="company" placeholder="Indústries Pérez" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Confirmar Comanda</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
