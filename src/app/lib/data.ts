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
  {
    id: 1,
    name: 'Alcohol Isopropanol',
    type: 'Químico',
    origin: 'Leverkusen, Alemania',
    specs: '99.9% de pureza, para uso industrial y desinfectante.',
    image: findImage('product-isopropanol'),
  },
  {
    id: 2,
    name: 'Etanol Industrial',
    type: 'Químico',
    origin: 'Róterdam, Países Bajos',
    specs: '99.8% de Pureza, Desnaturalizado, para aplicaciones industriales.',
    image: findImage('product-chemical'),
  },
  {
    id: 3,
    name: 'Vino Tinto de Burdeos',
    type: 'Bebida',
    origin: 'Burdeos, Francia',
    specs: 'A granel, Cosecha 2022, perfecto para embotellar.',
    image: findImage('product-wine'),
  },
  {
    id: 4,
    name: 'Leche Fresca de Vaca',
    type: 'Grado Alimenticio',
    origin: 'Normandía, Francia',
    specs: 'Cruda, sin pasteurizar, de granjas locales.',
    image: findImage('product-milk'),
  },
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
    id: 'ORD-001',
    product: 'Alcohol Isopropanol',
    destination: 'Berlín, Alemania',
    status: 'Entregado',
    cost: 4500,
    date: '2024-05-15',
  },
  {
    id: 'ORD-002',
    product: 'Etanol Industrial',
    destination: 'Lyon, Francia',
    status: 'En Tránsito',
    cost: 2800,
    date: '2024-05-28',
  },
  {
    id: 'ORD-003',
    product: 'Leche Fresca de Vaca',
    destination: 'Barcelona, España',
    status: 'Pendiente',
    cost: 1500,
    date: '2024-06-05',
  },
  {
    id: 'ORD-004',
    product: 'Vino Tinto de Burdeos',
    destination: 'Roma, Italia',
    status: 'En Tránsito',
    cost: 6200,
    date: '2024-05-30',
  },
  {
    id: 'ORD-005',
    product: 'Alcohol Isopropanol',
    destination: 'Múnich, Alemania',
    status: 'Entregado',
    cost: 4800,
    date: '2024-05-10',
  },
];
