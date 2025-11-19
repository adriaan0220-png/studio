import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trucks } from '@/app/lib/data';
import { PageHeader } from '@/app/components/page-header';
import { cn } from '@/lib/utils';

export default function FleetPage() {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-status-available';
      case 'In Transit':
        return 'bg-status-transit';
      case 'Maintenance':
        return 'bg-status-maintenance';
      default:
        return 'bg-muted';
    }
  };

  return (
    <>
      <PageHeader
        title="Our Truck Fleet"
        description="Modern, reliable, and specialized trucks to meet your transport needs."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trucks.map((truck) => (
          <Card key={truck.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={truck.image.imageUrl}
                  alt={truck.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={truck.image.imageHint}
                />
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{truck.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm shrink-0 pt-1">
                        <span className={cn('h-2.5 w-2.5 rounded-full', getStatusClass(truck.status))} />
                        <span>{truck.status}</span>
                    </div>
                </div>
                <CardDescription>{truck.specs}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm font-semibold text-foreground">Capacity: {truck.capacity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
