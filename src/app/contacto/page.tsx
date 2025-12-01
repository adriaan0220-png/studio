import { Mail } from 'lucide-react';
import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        title="Contacto"
        description="Póngase en contacto con nosotros para cualquier consulta."
      />
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Correo Electrónico</h3>
                <p className="text-muted-foreground">
                  Para consultas generales, presupuestos o soporte, no dude en
                  enviarnos un correo.
                </p>
                <a
                  href="mailto:EBTRANS@GMAIL.COM"
                  className="text-primary font-medium hover:underline"
                >
                  EBTRANS@GMAIL.COM
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
