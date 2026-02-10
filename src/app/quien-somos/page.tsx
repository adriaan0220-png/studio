
import Image from 'next/image';

export default function QuienSomosPage() {
  return (
    <div className="p-8 flex-1 bg-destructive text-destructive-foreground">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Qui som
          </h1>
          <p className="mt-2 text-lg text-destructive-foreground/80">
            Conegui més sobre la nostra empresa, missió i valors.
          </p>
        </div>
      </div>
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
          alt="Equip de Ttiko Trans treballant a l'oficina"
          fill
          className="object-cover"
          data-ai-hint="modern office team"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
          <h2 className="text-3xl font-bold font-headline mb-4">La Nostra Història</h2>
          <p className="max-w-3xl text-lg leading-relaxed">
            Fundada a Tarragona, Ttiko Trans va néixer amb la missió d'oferir solucions de transport de líquids a granel segures, eficients i fiables. Al llarg dels anys, hem crescut fins a convertir-nos en un soci logístic de confiança per a indústries de tot Europa, especialitzant-nos en productes químics i alimentaris. La nostra dedicació a la seguretat i la satisfacció del client continua sent el nucli de les nostres operacions.
          </p>
        </div>
      </div>
    </div>
  );
}
