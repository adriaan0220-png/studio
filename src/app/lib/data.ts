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
    name: 'Cisternas Alimentarias Inox AISI-316L',
    type: 'Alimentario',
    origin: 'EB Trans',
    specs: 'Servicio de transporte en cisterna de productos líquidos alimentarios a granel, con cumplimiento Reglamento (CE) 852/2004 y protocolos de limpieza CIP certificado. Material: Acero inoxidable sanitario AISI 316L. Capacidad: 28.500-32.000L. Divisiones: 1–3 compartimentos. Válvulas DN80 y DN100. Control temperatura: +5ºC/+65ºC. Certificaciones: ATP, ISO 22000, HACCP. Limpieza CIP, Trazabilidad y seguimiento GPS 24/7.',
    image: findImage('stainless-tanker-new'),
  },
  {
    id: 2,
    name: 'Transporte ADR de Líquidos Químicos',
    type: 'Químico',
    origin: 'EB Trans',
    specs: 'Servicio especializado en mercancías peligrosas líquidas (ADR). Cisterna L4BH/LGBF con capacidad de 26.000-34.000L. Equipamiento ADR completo. Cumple con ADR 2025, REACH y UNE-EN 14025. Ideal para líquidos corrosivos (Clase 8), inflamables (Clase 3) y sustancias tóxicas (Clase 6.1).',
    image: findImage('truck-specialized'),
  },
  {
    id: 3,
    name: 'Logística Multimodal Internacional – Líquidos a Granel',
    type: 'Internacional',
    origin: 'EB Trans',
    specs: 'Gestión completa de transporte en la UE combinando carretera, ferrocarril y marítimo, optimizando tiempos, costes y documentación aduanera.\n\nModalidades: Road Tanker | Isotank | Flexitank\n\nTiempo medio tránsito UE:\nES → FR: 24–36 h\nES → DE / BE / NL: 48–72 h\n\nRutas más frecuentes: Lyon, Marsella, Burdeos, Rotterdam, Amberes, Frankfurt\n\nDocumentos habituales: DUA | EUR.1 | T1 | Packing list | Factura proforma\n\nIncoterms habituales: DAP, CPT, FCA, DDP\n\nSistemas digitales: POD electrónico | Tracking API | Telematics 3.0',
    image: findImage('truck-standard'),
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
];