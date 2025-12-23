import { Mail, MapPin, Phone } from 'lucide-react';
import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactoPage() {
  return (
    <div className="p-8 flex-1 bg-purple-50">
      <PageHeader
        title="Contacto"
        description="Póngase en contacto con nosotros para cualquier consulta."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-card-foreground">Correo Electrónico</h3>
                <p className="text-muted-foreground">
                  Para consultas generales, presupuestos o soporte, no dude en
                  enviarnos un correo.
                </p>
                <a
                  href="mailto:info@logitrans.cat"
                  className="text-primary font-medium hover:underline"
                >
                  info@logitrans.cat
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-card-foreground">Teléfono</h3>
                <p className="text-muted-foreground">
                  Llámenos para una atención más directa.
                </p>
                <a
                  href="tel:+34647000000"
                  className="text-primary font-medium hover:underline"
                >
                  +34 647 000 000
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-card-foreground">Dirección física</h3>
                <address className="text-muted-foreground not-italic">
                  Logitrans<br />
                  Polígono Industrial Logístic Sud<br />
                  C/ de la Indústria, Nave 14<br />
                  43006 Tarragona
                </address>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.469445105202!2d1.2185258766155554!3d41.14571941198201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a3f9556e077559%3A0x6e3443c5b5523b4!2sCarrer%20de%20la%20Ind%C3%BAstria%2C%2014%2C%2043006%20Tarragona%2C%20Spain!5e0!3m2!1sen!2sus!4v1720547842602!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
