import { PageHeader } from '@/app/components/page-header';

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        title="Nuestros Servicios"
        description="Descubra la gama de servicios que ofrecemos."
      />
      <div className="p-4">
        <p>Aquí puede encontrar información detallada sobre nuestros servicios.</p>
      </div>
    </>
  );
}
