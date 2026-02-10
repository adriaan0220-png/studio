import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 flex-1 flex flex-col items-center justify-center bg-primary text-primary-foreground">
        <div className="flex flex-col items-center justify-center text-center mb-6 py-2">
          <div className="mb-4">
            <Image
                src="/logo sin fondo.png"
                alt="Logotip de Ttiko Trans"
                width={240}
                height={53}
                priority
              />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold font-headline">Benvingut a Ttiko Trans</h1>
          <p className="mt-2 text-md text-primary-foreground/80">Líders en transport de cisternes amb màxima seguretat.</p>
        </div>
      <div className="p-4 rounded-lg bg-black/20 text-center max-w-xl">
        <p>Aquí pots trobar un resum de la teva activitat i accessos directes a les funcions principals.</p>
      </div>
    </div>
  );
}
