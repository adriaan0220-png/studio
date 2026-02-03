
'use client';

import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const ServiceCard = ({
  title,
  description,
  features,
  logistics,
  imageId,
}: {
  title: string;
  description: string;
  features: string[];
  logistics: string[];
  imageId: string;
}) => {
  const image = PlaceHolderImages.find((img) => img.id === imageId);

  return (
    <Card className="overflow-hidden shadow-lg">
      {image && (
        <div className="relative h-64 w-full">
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2 text-card-foreground">Características técnicas:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-card-foreground">Operativa logística:</h4>
           <ul className="space-y-2">
            {logistics.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ServiciosPage() {
  const servicios = [
    {
      title: 'Cisternas Alimentarias Inox AISI-316L (REF: TET-ALM/316-1)',
      description:
        'Servicio de transporte en cisterna de productos líquidos alimentarios a granel, con cumplimiento Reglamento (CE) 852/2004 y protocolos de limpieza CIP certificado.',
      features: [
        'Material: Acero inoxidable sanitario AISI 316L (resistente a ácidos alimentarios).',
        'Capacidad: Entre 28.500 y 32.000 litros.',
        'Divisiones: 1–3 compartimentos herméticos.',
        'Sistema de sellado: Válvulas DN80 y DN100 certificadas.',
        'Control temperatura: +5ºC / +65ºC (según producto).',
        'Certificaciones: ATP, ISO 22000, HACCP.',
      ],
      logistics: [
        'Limpieza CIP documental (certificado descargable PDF).',
        'Trazabilidad lote / cisterna / cliente.',
        'Gestión POD digital y seguimiento GPS 24/7.',
      ],
      imageId: 'stainless-tanker-new',
    },
  ];

  return (
    <div className="p-8 flex-1">
      <PageHeader
        title={<span className="text-secondary">Nuestros Servicios</span>}
        description="Descubra la gama de servicios de transporte especializado que ofrecemos."
      />
      <div className="space-y-8">
        {servicios.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
