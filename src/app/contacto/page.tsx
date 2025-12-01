import { PageHeader } from '@/app/components/page-header';

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        title="Contacto"
        description="Póngase en contacto con nosotros."
      />
      <div className="p-4">
        <p>Aquí puede encontrar nuestra información de contacto.</p>
      </div>
    </>
  );
}
