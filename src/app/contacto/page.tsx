import { Mail, MapPin } from 'lucide-react';
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
          <CardContent className="space-y-6">
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
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Dirección física</h3>
                <address className="text-muted-foreground not-italic">
                  EB TRANS IBÉRICA<br />
                  Polígono Industrial Logístic Sud<br />
                  C/ de la Indústria, Nave 14<br />
                  43006 Tarragona
                </address>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
