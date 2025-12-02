import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const blogPosts = [
  {
    title: 'Tendencias en el transporte de cisternas 2025',
    content: 'El sector evoluciona hacia vehículos más eficientes, sistemas de seguimiento avanzados y normativas más estrictas para garantizar la seguridad en el transporte de líquidos.',
    imageUrl: 'https://lexlatin.com/sites/default/files/2023-08/boletin_gestion_290823-2.jpg',
    imageHint: 'tanker truck technology'
  },
  {
    title: 'La importancia de las cisternas certificadas en el transporte ADR',
    content: 'Un repaso a los requisitos y estándares que deben cumplir los vehículos para transportar sustancias químicas peligrosas.',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.M1SpenjNXWE-GmxfsS9u6wHaGy?pid=Api&P=0&h=180',
    imageHint: 'ADR certified tanker'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-purple-100 -m-8 p-8 flex-1">
      <div className="relative py-8 px-4 md:px-6">
        <Image
          src="https://www.cisternashnosfajardo.com/wp-content/uploads/2018/11/SLIDE-1-800x400.jpg"
          alt="Camión cisterna en carretera"
          fill
          className="object-cover absolute inset-0 z-0"
          data-ai-hint="tanker truck road"
        />
        <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm" />
        <div className="relative z-20">
          <PageHeader
            title="Blog"
            description="Noticias, artículos y actualizaciones de la industria del transporte."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.title} className="shadow-lg bg-card/80 overflow-hidden">
                {post.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                )}
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
    </div>
  );
}
