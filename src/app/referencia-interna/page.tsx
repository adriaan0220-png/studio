import { PageHeader } from '@/app/components/page-header';

export default function ReferenciaInternaPage() {
  return (
    <div className="bg-gray-100 -m-8 p-8 flex-1">
      <PageHeader
        title="Referencia Interna"
        description="Códigos y referencias para uso interno."
      />
      <div className="p-4">
        <p>
          Esta sección contiene información y referencias internas para la
          gestión de la empresa.
        </p>
      </div>
    </div>
  );
}
