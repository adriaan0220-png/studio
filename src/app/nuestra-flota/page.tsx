import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trucks } from '@/app/lib/data';
import { PageHeader } from '@/app/components/page-header';
import { cn } from '@/lib/utils';

const statusColors: { [key: string]: string } = {
  'Disponible': 'bg-status-available text-white',
  'En Tránsito': 'bg-status-transit text-white',
  'Mantenimiento': 'bg-status-maintenance text-white',
};

export default function NuestraFlotaPage() {
  return (
    <div className="bg-gray-100 -m-8 p-8 flex-1">
      <PageHeader
        title="Nuestra Flota"
        description="Explore los camiones cisterna disponibles en nuestra flota."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trucks.map((truck) => (
          <Card key={truck.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            {truck.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={truck.image.imageUrl}
                  alt={truck.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={truck.image.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{truck.name}</CardTitle>
                <Badge className={cn(statusColors[truck.status] || 'bg-gray-500 text-white', 'whitespace-nowrap')}>
                  {truck.status}
                </Badge>
              </div>
              <CardDescription>{truck.capacity}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{truck.specs}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
