'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/app/components/page-header';
import { useToast } from '@/hooks/use-toast';

export default function NewOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const deliveryLocation = searchParams.get('deliveryLocation');
  const productType = searchParams.get('productType');
  const quantity = searchParams.get('quantity');
  const estimatedCost = searchParams.get('estimatedCost');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí normalmente enviarías los datos a tu backend
    toast({
      title: '¡Pedido Realizado!',
      description: 'Su pedido ha sido enviado con éxito. Nos pondremos en contacto con usted en breve.',
    });
    router.push('/orders');
  };

  return (
    <div className="p-8 flex-1 bg-gray-50">
      <PageHeader
        title="Confirme Su Pedido"
        description="Por favor, revise su solicitud de transporte y proporcione la información de contacto."
      />
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
            <CardDescription>Detalles de su envío.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Producto</span>
              <span className="font-medium text-right">{productType || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cantidad</span>
              <span className="font-medium text-right">{quantity ? `${Number(quantity).toLocaleString()} Litros` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Lugar de Entrega</span>
              <span className="font-medium text-right">{deliveryLocation || 'N/A'}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Costo Estimado</span>
              <span className="font-bold text-primary">€{estimatedCost ? Number(estimatedCost).toLocaleString() : 'N/A'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Usaremos esto para ponernos en contacto sobre su pedido.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" placeholder="Juan Pérez" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Dirección de Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="juan.perez@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Nombre de la Empresa (Opcional)</Label>
                <Input id="company" placeholder="Industrias Pérez" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Confirmar Pedido</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
