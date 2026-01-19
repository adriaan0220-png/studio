import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShieldCheck, Thermometer, Droplets, Anchor, Route, Zap, FileText } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const tankerTypes = [
  {
    title: 'Alimentarias AISI 316L',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.thmWS8Km2_zlZimGhClpvgHaFL?pid=Api&P=0&h=180',
    imageHint: 'stainless tanker',
    icons: [
      { icon: Thermometer, label: 'Control de Temperatura' },
      { icon: Droplets, label: 'Certificado CIP' },
    ],
  },
  {
    title: 'ADR Químicas Clase 3 y 8',
    imageUrl: 'https://www.cisternashnosfajardo.com/wp-content/uploads/2018/11/SLIDE-1-800x400.jpg',
    imageHint: 'ADR truck',
    icons: [
      { icon: ShieldCheck, label: 'ADR' },
      { icon: Zap, label: 'Clase 3 y 8' },
    ],
  },
  {
    title: 'Multimodales Isotank',
    imageUrl: 'https://eng.spectransgarant.ru/services/tank-containers-02.jpg',
    imageHint: 'isotank container',
    icons: [
      { icon: Anchor, label: 'Marítimo' },
      { icon: Route, label: 'Carretera' },
    ],
  },
];

const securityFeatures = [
    'Trazabilidad GPS 24/7',
    'Sellado documental CIP',
    'Control de temperatura',
    'Conductores con certificación ADR Cisternas',
    'Planes de emergencia y derrames',
];

const certifications = [
    { name: 'ISO 22000', description: 'Seguridad alimentaria' },
    { name: 'ADR', description: 'Transporte de mercancías peligrosas' },
    { name: 'HACCP', description: 'Gestión sanitaria' },
    { name: 'ATP', description: 'Mercancías perecederas' },
]

export default function NuestraFlotaPage() {
  return (
    <div className="p-8 flex-1 bg-red-50">
      <PageHeader
        title={<span className="text-secondary">Nuestra Flota</span>}
        description="Moderna y especializada para el transporte seguro de líquidos."
      />
      <div className="container mx-auto px-0 space-y-12">
        
        <p className="text-lg text-muted-foreground max-w-4xl">
          Disponemos de una flota moderna y especializada para el transporte seguro de líquidos alimentarios, químicos y mercancías peligrosas ADR. Todas nuestras cisternas cuentan con mantenimiento periódico, calibraciones vigentes y sistemas de trazabilidad.
        </p>
        
        {/* Datos técnicos */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">62</CardTitle>
                <CardDescription>Unidades Operativas</CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">1,8M</CardTitle>
                <CardDescription>Litros de Capacidad Total</CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">2024</CardTitle>
                <CardDescription>Última Renovación de Flota</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Tipos de Cisternas */}
        <section>
          <h2 className="text-3xl font-bold font-headline mb-6">Tipos de Cisternas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tankerTypes.map((tanker) => {
              const image = tanker.imageUrl ? { imageUrl: tanker.imageUrl, imageHint: tanker.imageHint } : PlaceHolderImages.find(img => img.id === (tanker as any).imageId);
              return (
                <Card key={tanker.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                   {image && (
                    <div className="relative h-56 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={tanker.title}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tanker.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {tanker.icons.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-muted-foreground">
                          <item.icon className="h-5 w-5 text-primary" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">Solicitar Información</Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-12">
            {/* Sistemas de Seguridad */}
            <section>
                <h2 className="text-3xl font-bold font-headline mb-6">Sistemas de Seguridad</h2>
                <Card>
                    <CardContent className="pt-6">
                        <ul className="space-y-4">
                            {securityFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-card-foreground">{feature}</span>
                            </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {/* Certificaciones */}
            <section>
                <h2 className="text-3xl font-bold font-headline mb-6">Certificaciones</h2>
                 <Card>
                    <CardContent className="pt-6">
                        <ul className="space-y-4">
                            {certifications.map((cert, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-card-foreground">{cert.name}</p>
                                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </div>

      </div>
    </div>
  );
}
