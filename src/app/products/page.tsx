
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/app/lib/data';
import { PageHeader } from '@/app/components/page-header';

export default function ProductsPage() {
  return (
    <div className="p-8 flex-1">
      <PageHeader
        title={<span className="text-secondary">Nuestros Productos Líquidos</span>}
        description="Ofrecemos una variedad de productos líquidos de alta calidad para transporte a granel."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            {product.image && (
              <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={product.image.imageHint}
                  />
              </div>
            )}
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <div className="flex gap-2 pt-1">
                    <Badge variant="secondary">{product.type}</Badge>
                    <Badge variant="outline">{product.origin}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{product.specs}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
