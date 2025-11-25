import Image from "next/image";
import CostEstimator from "@/app/components/cost-estimator";
import { products } from "@/app/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="space-y-8">
      {heroImage && (
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
           <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute top-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white font-headline">Transporte de Líquidos Confiable</h1>
            <p className="mt-2 text-lg text-primary-foreground/90">Obtenga una estimación de costos instantánea para su entrega.</p>
          </div>
        </div>
      )}
      <CostEstimator productTypes={products.map(p => p.name)} />
    </div>
  );
}
