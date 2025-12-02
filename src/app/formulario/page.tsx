
'use client';

import { PageHeader } from '@/app/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function FormularioPage() {

  return (
    <div className="p-8 flex-1 bg-pink-50">
      <PageHeader
        title="Formulario de Contacto"
        description="Rellene el siguiente formulario para enviarnos un mensaje."
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
            <form action="https://formspree.io/f/mvgerbja" method="POST">
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
                    <Button type="submit" className="w-full">Enviar Mensaje</Button>
                </CardFooter>
            </form>
        </Card>
      </div>
    </div>
  );
}
