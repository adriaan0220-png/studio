
import React from 'react';
import { PageHeader } from '@/app/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderFormComponent from './OrderFormComponent';

function OrderFormSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-7 w-20" />
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-full" />
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    </div>
  );
}


export default function NewOrderPage() {
  return (
    <div className="p-8 flex-1">
      <PageHeader
        title="Confirme Su Pedido"
        description="Por favor, revise su solicitud de transporte y proporcione la información de contacto."
      />
      <React.Suspense fallback={<OrderFormSkeleton />}>
        <OrderFormComponent />
      </React.Suspense>
    </div>
  );
}
