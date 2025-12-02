import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const blogPosts = [
  {
    title: 'Tendencias en el transporte de cisternas 2025',
    content: 'El sector evoluciona hacia vehículos más eficientes, sistemas de seguimiento avanzados y normativas más estrictas para garantizar la seguridad en el transporte de líquidos.'
  },
  {
    title: 'La importancia de las cisternas certificadas en el transporte ADR',
    content: 'Un repaso a los requisitos y estándares que deben cumplir los vehículos para transportar sustancias químicas peligrosas.'
  }
];

export default function BlogPage() {
  return (
    <div className="relative py-8 px-4 md:px-6 -m-4 lg:-m-8">
      <Image
        src="https://images.unsplash.com/photo-1583327497931-72f1a911a34a?q=80&w=2070&auto=format&fit=crop"
        alt="Revista abierta"
        fill
        className="object-cover absolute inset-0 z-0"
        data-ai-hint="open magazine"
      />
      <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-20">
        <PageHeader
          title="Blog"
          description="Noticias, artículos y actualizaciones de la industria del transporte."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card key={post.title} className="shadow-lg bg-card/80">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
