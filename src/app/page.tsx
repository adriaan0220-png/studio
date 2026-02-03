import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 flex-1">
        <div className="flex flex-col items-center justify-center text-center mb-6 py-8">
          <div className="mb-4">
            <Image
                src="/logo sin fondo.png"
                alt="Ttiko Trans Logo"
                width={360}
                height={80}
                priority
              />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground font-headline">Bienvenido a Ttiko Trans</h1>
          <p className="mt-2 text-md text-muted-foreground">Líderes en transporte de cisternas con máxima seguridad.</p>
        </div>
      <div className="p-4 rounded-lg bg-card text-card-foreground text-center">
        <p>Aquí puedes encontrar un resumen de tu actividad y accesos directos a las principales funciones.</p>
      </div>
    </div>
  );
}
