import { PageHeader } from '@/app/components/page-header';

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Noticias, artículos y actualizaciones de la industria del transporte."
      />
      <div className="flex items-center justify-center h-full min-h-[400px] border-dashed border-2 rounded-lg">
        <div className="text-center text-muted-foreground">
          <h2 className="text-2xl font-semibold">Próximamente</h2>
          <p>Nuestro blog se lanzará pronto. ¡Vuelve a consultar las últimas noticias!</p>
        </div>
      </div>
    </>
  );
}
