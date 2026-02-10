
'use client';

import { useState } from 'react';
import { PageHeader } from '@/app/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function FormularioPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mvgerbja", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: 'Missatge Enviat!',
          description: 'Gràcies per contactar-nos. Ens posarem en contacte amb vós ben aviat.',
        });
        (event.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
            const errorMessage = data["errors"].map((error: any) => error["message"]).join(", ");
            throw new Error(errorMessage);
        } else {
            throw new Error('Hi ha hagut un problema en enviar el formulari.');
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: 'Error en l\'enviament',
        description: error.message || 'No s\'ha pogut enviar el missatge. Si us plau, intenti-ho de nou més tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-8 flex-1 bg-form-background">
      <PageHeader
        title={<span className="text-form-foreground">Formulari de Contacte</span>}
        description={<span className="text-form-foreground/80">Ompliu el següent formulari per enviar-nos un missatge.</span>}
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Envieu-nos un missatge</CardTitle>
                    <CardDescription>
                    Completeu els camps a continuació i ens posarem en contacte amb vós el més aviat possible.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" name="name" placeholder="El seu nom" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correu electrònic</Label>
                            <Input id="email" type="email" name="email" placeholder="el.seu@correu.com" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Assumpte</Label>
                        <Input id="subject" name="subject" placeholder="Assumpte del seu missatge" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Missatge</Label>
                        <Textarea id="message" name="message" placeholder="Escrigui el seu missatge aquí..." required rows={5} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviant...' : 'Enviar Missatge'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
      </div>
    </div>
  );
}
