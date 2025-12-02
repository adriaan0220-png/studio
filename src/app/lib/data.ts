import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function findImage(id: string): ImagePlaceholder {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    console.warn(`Placeholder image with id "${id}" not found.`);
    return {
      id: 'default',
      description: 'Default placeholder image',
      imageUrl: 'https://picsum.photos/seed/default/600/400',
      imageHint: 'placeholder',
    };
  }
  return image;
}

export const products = [
];

export const trucks = [
  {
    id: 1,
    name: 'Cisterna MAN TGX',
    capacity: '30,000 Litros',
    status: 'Disponible',
    specs: 'Certificado ADR, 3 compartimentos',
    image: findImage('truck-standard'),
  },
  {
    id: 2,
    name: 'Volvo FH Liquid+',
    capacity: '35,000 Litros',
    status: 'En Tránsito',
    specs: 'Rastreo GPS, Tanque aislado',
    image: findImage('truck-large'),
  },
  {
    id: 3,
    name: 'Scania R-Series Chemo',
    capacity: '28,000 Litros',
    status: 'Disponible',
    specs: 'Tanque de acero inoxidable, Bomba de alta presión',
    image: findImage('truck-specialized'),
  },
    {
    id: 4,
    name: 'Cisterna DAF XF',
    capacity: '32,000 Litros',
    status: 'Mantenimiento',
    specs: 'Certificado de grado alimenticio, 4 compartimentos',
    image: findImage('truck-standard'),
  },
];

export const orders = [
  {
    id: 'ORD-004',
    product: 'Vino Tinto de Burdeos',
    destination: 'Roma, Italia',
    status: 'En Tránsito',
    cost: 6200,
    date: '2024-05-30',
  },
];
