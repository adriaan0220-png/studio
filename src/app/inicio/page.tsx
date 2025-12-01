import { PageHeader } from '@/app/components/page-header';

export default function InicioPage() {
  return (
    <>
      <PageHeader
        title="Bienvenido a EB Trans Ibérica"
        description="Líderes en transporte de cisternas con máxima seguridad."
      />
      <div className="p-4">
        <p>Aquí puedes encontrar un resumen de tu actividad y accesos directos a las principales funciones.</p>
      </div>
    </>
  );
}
