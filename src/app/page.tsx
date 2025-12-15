import { PageHeader } from '@/app/components/page-header';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="p-8 flex-1 bg-blue-50">
        <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg group mb-8">
           <Image
              src="https://i0.wp.com/cisternascidegainox.com/wp-content/uploads/2019/06/todo-lo-que-debes-saber-sobre-la-conduccion-de-un-camion-cisterna-1920.jpg?fit=1920%2C1080&ssl=1"
              alt="Camión cisterna en la carretera"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              data-ai-hint="tanker highway"
              priority
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-6 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-headline drop-shadow-lg">Bienvenido a Ttiko trans, S.L.</h1>
            <p className="mt-2 text-lg text-white/90 drop-shadow-md">Líderes en transporte de cisternas con máxima seguridad.</p>
          </div>
        </div>
      <div className="p-4">
        <p>Aquí puedes encontrar un resumen de tu actividad y accesos directos a las principales funciones.</p>
      </div>
    </div>
  );
}
