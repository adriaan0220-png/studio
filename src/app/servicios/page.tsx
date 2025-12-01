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
  idealFor,
  imageId,
}: {
  title: string;
  description: string;
  features: string[];
  idealFor: string;
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
          <h4 className="font-semibold mb-2 text-card-foreground">Ideal para:</h4>
          <p className="text-muted-foreground">{idealFor}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ServiciosPage() {
  const servicios = [
    {
      title: 'Transporte Alimentario',
      description:
        'Transporte seguro de líquidos de consumo mediante cisternas aptas para alimentación, con limpieza certificada y control de temperatura cuando se requiere.',
      features: [
        'Acero inoxidable AISI 316',
        'Capacidades entre 28.000 – 32.000 L',
        'Limpiezas CIP certificadas',
        'Rutas nacionales e internacionales',
        'Temperatura controlada (OPCIONAL)',
      ],
      idealFor: 'Aceites, vinos, leche, jarabes, glucosas.',
      imageId: 'food-grade-tanker',
    },
  ];

  return (
    <>
      <PageHeader
        title="Nuestros Servicios"
        description="Descubra la gama de servicios de transporte especializado que ofrecemos."
      />
      <div className="space-y-8">
        {servicios.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </>
  );
}
