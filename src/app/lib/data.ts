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
    name: 'Olive Oil',
    type: 'Food Grade',
    origin: 'Andalusia, Spain',
    specs: 'Extra Virgin, Cold Pressed, for culinary use.',
    image: findImage('product-oil'),
  },
  {
    id: 2,
    name: 'Industrial Ethanol',
    type: 'Chemical',
    origin: 'Rotterdam, Netherlands',
    specs: '99.8% Purity, Denatured, for industrial applications.',
    image: findImage('product-chemical'),
  },
  {
    id: 3,
    name: 'Bordeaux Red Wine',
    type: 'Beverage',
    origin: 'Bordeaux, France',
    specs: 'Bulk, Vintage 2022, perfect for bottling.',
    image: findImage('product-wine'),
  },
  {
    id: 4,
    name: 'Fresh Cow Milk',
    type: 'Food Grade',
    origin: 'Normandy, France',
    specs: 'Raw, Unpasteurized, sourced from local farms.',
    image: findImage('product-milk'),
  },
];

export const trucks = [
  {
    id: 1,
    name: 'MAN TGX Tanker',
    capacity: '30,000 Liters',
    status: 'Available',
    specs: 'ADR certified, 3 compartments',
    image: findImage('truck-standard'),
  },
  {
    id: 2,
    name: 'Volvo FH Liquid+',
    capacity: '35,000 Liters',
    status: 'In Transit',
    specs: 'GPS Tracked, Insulated Tank',
    image: findImage('truck-large'),
  },
  {
    id: 3,
name: 'Scania R-Series Chemo',
    capacity: '28,000 Liters',
    status: 'Available',
    specs: 'Stainless Steel Tank, High-Pressure Pump',
    image: findImage('truck-specialized'),
  },
    {
    id: 4,
    name: 'DAF XF Tanker',
    capacity: '32,000 Liters',
    status: 'Maintenance',
    specs: 'Food Grade Certified, 4 compartments',
    image: findImage('truck-standard'),
  },
];

export const orders = [
  {
    id: 'ORD-001',
    product: 'Olive Oil',
    destination: 'Berlin, Germany',
    status: 'Delivered',
    cost: 4500,
    date: '2024-05-15',
  },
  {
    id: 'ORD-002',
    product: 'Industrial Ethanol',
    destination: 'Lyon, France',
    status: 'In Transit',
    cost: 2800,
    date: '2024-05-28',
  },
  {
    id: 'ORD-003',
    product: 'Fresh Cow Milk',
    destination: 'Barcelona, Spain',
    status: 'Pending',
    cost: 1500,
    date: '2024-06-05',
  },
  {
    id: 'ORD-004',
    product: 'Bordeaux Red Wine',
    destination: 'Rome, Italy',
    status: 'In Transit',
    cost: 6200,
    date: '2024-05-30',
  },
  {
    id: 'ORD-005',
    product: 'Olive Oil',
    destination: 'Munich, Germany',
    status: 'Delivered',
    cost: 4800,
    date: '2024-05-10',
  },
];
