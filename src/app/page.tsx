import { PageHeader } from '@/app/components/page-header';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-green-100 -m-8 p-8 flex-1">
        <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg group mb-8">
           <Image
              src="https://images.unsplash.com/photo-1571708343135-c57656a81d13?q=80&w=2070&auto=format&fit=crop"
              alt="Camión cisterna en la carretera"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              data-ai-hint="tanker highway"
              priority
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-6 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-headline drop-shadow-lg">Bienvenido a EB Trans Ibérica</h1>
            <p className="mt-2 text-lg text-white/90 drop-shadow-md">Líderes en transporte de cisternas con máxima seguridad.</p>
          </div>
        </div>
      <div className="p-4">
        <p>Aquí puedes encontrar un resumen de tu actividad y accesos directos a las principales funciones.</p>
      </div>
    </div>
  );
}
