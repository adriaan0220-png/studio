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
    // Here you would typically send the data to your backend
    toast({
      title: 'Order Placed!',
      description: 'Your order has been successfully submitted. We will contact you shortly.',
    });
    router.push('/orders');
  };

  return (
    <>
      <PageHeader
        title="Confirm Your Order"
        description="Please review your transport request and provide contact information."
      />
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Details of your shipment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium text-right">{productType || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium text-right">{quantity ? `${Number(quantity).toLocaleString()} Liters` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Delivery Location</span>
              <span className="font-medium text-right">{deliveryLocation || 'N/A'}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Estimated Cost</span>
              <span className="font-bold text-primary">€{estimatedCost ? Number(estimatedCost).toLocaleString() : 'N/A'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>We'll use this to get in touch about your order.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input id="company" placeholder="Doe Industries" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Confirm Order</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
