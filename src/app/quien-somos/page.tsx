import { PageHeader } from '@/app/components/page-header';

export default function QuienSomosPage() {
  return (
    <>
      <PageHeader
        title="Quiénes Somos"
        description="Conozca más sobre nuestra empresa."
      />
      <div className="p-4">
        <p>Aquí puede encontrar información sobre nuestra historia, misión y valores.</p>
      </div>
    </>
  );
}
