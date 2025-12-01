import { PageHeader } from '@/app/components/page-header';

export default function InicioPage() {
  return (
    <>
      <PageHeader
        title="Página de Inicio"
        description="Bienvenido al panel de Dorado Soluciones de Transporte."
      />
      <div className="p-4">
        <p>Aquí puedes encontrar un resumen de tu actividad y accesos directos a las principales funciones.</p>
      </div>
    </>
  );
}
