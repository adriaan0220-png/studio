import Image from "next/image";
import CostEstimator from "@/app/components/cost-estimator";
import { products } from "@/app/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="space-y-8">
      {heroImage && (
        <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg group">
           <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute top-8 p-6 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-headline drop-shadow-lg">Transporte de Líquidos Confiable</h1>
          </div>
        </div>
      )}
      <CostEstimator productTypes={products.map(p => p.name)} />
    </div>
  );
}
