import { PageHeader } from '@/app/components/page-header';
import Image from 'next/image';

export default function QuienSomosPage() {
  return (
    <div className="p-8 flex-1 bg-indigo-50">
      <PageHeader
        title="Quiénes Somos"
        description="Conozca más sobre nuestra empresa, misión y valores."
      />
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
          alt="Equipo de EB Trans trabajando en la oficina"
          fill
          className="object-cover"
          data-ai-hint="modern office team"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
          <h2 className="text-3xl font-bold font-headline mb-4">Nuestra Historia</h2>
          <p className="max-w-3xl text-lg leading-relaxed">
            Fundada en Tarragona, EB Trans Ibérica nació con la misión de ofrecer soluciones de transporte de líquidos a granel seguras, eficientes y fiables. A lo largo de los años, hemos crecido hasta convertirnos en un socio logístico de confianza para industrias de toda Europa, especializándonos en productos químicos y alimentarios. Nuestra dedicación a la seguridad y la satisfacción del cliente sigue siendo el núcleo de nuestras operaciones.
          </p>
        </div>
      </div>
    </div>
  );
}
