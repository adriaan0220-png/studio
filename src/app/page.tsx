import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 flex-1 flex flex-col items-center justify-center bg-primary text-primary-foreground">
        <div className="flex flex-col items-center justify-center text-center mb-6 py-2">
          <div className="mb-4">
            <Image
                src="/logo sin fondo.png"
                alt="Ttiko Trans Logo"
                width={360}
                height={80}
                priority
              />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline">Bienvenido a Ttiko Trans</h1>
          <p className="mt-2 text-md text-primary-foreground/80">Líderes en transporte de cisternas con máxima seguridad.</p>
        </div>
      <div className="p-4 rounded-lg bg-black/20 text-center max-w-xl">
        <p>Aquí puedes encontrar un resumen de tu actividad y accesos directos a las principales funciones.</p>
      </div>
    </div>
  );
}
