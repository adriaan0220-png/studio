
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
          title: '¡Mensaje Enviado!',
          description: 'Gracias por contactarnos. Nos pondremos en contacto con usted en breve.',
        });
        (event.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
            const errorMessage = data["errors"].map((error: any) => error["message"]).join(", ");
            throw new Error(errorMessage);
        } else {
            throw new Error('Hubo un problema al enviar el formulario.');
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: 'Error al enviar',
        description: error.message || 'No se pudo enviar el mensaje. Por favor, inténtelo de nuevo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-8 flex-1 bg-form-background">
      <PageHeader
        title={<span className="text-form-foreground">Formulario de Contacto</span>}
        description={<span className="text-form-foreground/80">Rellene el siguiente formulario para enviarnos un mensaje.</span>}
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Envíenos un mensaje</CardTitle>
                    <CardDescription>
                    Complete los campos a continuación y nos pondremos en contacto con usted lo antes posible.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" placeholder="Su nombre" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input id="email" type="email" name="email" placeholder="su@email.com" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Asunto</Label>
                        <Input id="subject" name="subject" placeholder="Asunto de su mensaje" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea id="message" name="message" placeholder="Escriba su mensaje aquí..." required rows={5} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
      </div>
    </div>
  );
}
