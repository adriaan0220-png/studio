
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
          <h4 className="font-semibold mb-2 text-card-foreground">Característiques tècniques:</h4>
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
      title: 'Cisternes Alimentàries Inox AISI-316L (REF: TET-ALM/316-1)',
      description:
        'Servei de transport en cisterna de productes líquids alimentaris a granel, amb compliment del Reglament (CE) 852/2004 i protocols de neteja CIP certificat.',
      features: [
        'Material: Acer inoxidable sanitari AISI 316L (resistent a àcids alimentaris).',
        'Capacitat: Entre 28.500 i 32.000 litres.',
        'Divisions: 1–3 compartiments hermètics.',
        'Sistema de segellat: Vàlvules DN80 i DN100 certificades.',
        'Control de temperatura: +5ºC / +65ºC (segons producte).',
        'Certificacions: ATP, ISO 22000, HACCP.',
      ],
      logistics: [
        'Neteja CIP documental (certificat descarregable en PDF).',
        'Traçabilitat lot / cisterna / client.',
        'Gestió POD digital i seguiment GPS 24/7.',
      ],
      imageId: 'stainless-tanker-new',
    },
  ];

  return (
    <div className="p-8 flex-1 bg-service-background">
      <PageHeader
        title={<span className="text-chart-1">Els Nostres Serveis</span>}
        description="Descobreixi la gamma de serveis de transport especialitzat que oferim."
      />
      <div className="space-y-8">
        {servicios.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
