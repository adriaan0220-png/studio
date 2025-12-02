import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <>
      <PageHeader
        title="Blog"
        description="Noticias, artículos y actualizaciones de la industria del transporte."
      />
      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Card key={post.title}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
