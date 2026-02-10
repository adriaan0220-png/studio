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
    name: 'Cisternes Alimentàries Inox AISI-316L',
    type: 'Alimentari',
    origin: 'Ttiko Trans',
    specs: 'Servei de transport en cisterna de productes líquids alimentaris a granel, amb compliment del Reglament (CE) 852/2004 i protocols de neteja CIP certificat. Material: Acer inoxidable sanitari AISI 316L. Capacitat: 28.500-32.000L. Divisions: 1–3 compartiments. Vàlvules DN80 i DN100. Control de temperatura: +5ºC/+65ºC. Certificacions: ATP, ISO 22000, HACCP. Neteja CIP, Traçabilitat i seguiment GPS 24/7.',
    image: findImage('stainless-tanker-new'),
  },
  {
    id: 2,
    name: 'Transport ADR de Líquids Químics',
    type: 'Químic',
    origin: 'Ttiko Trans',
    specs: 'Servei especialitzat en mercaderies perilloses líquides (ADR). Cisterna L4BH/LGBF amb capacitat de 26.000-34.000L. Equipament ADR complet. Compleix amb ADR 2025, REACH i UNE-EN 14025. Ideal per a líquids corrosius (Classe 8), inflamables (Classe 3) i substàncies tòxiques (Classe 6.1).',
    image: findImage('product-adr-chemical'),
  },
  {
    id: 3,
    name: 'Logística Multimodal Internacional',
    type: 'Internacional',
    origin: 'Ttiko Trans',
    specs: 'Gestió completa de transport a la UE combinant carretera, ferrocarril i marítim. Modalitats: Road Tanker | Isotanc | Flexitanc. Temps mitjà de trànsit a la UE: ES → FR: 24–36 h, ES → DE / BE / NL: 48–72 h. Rutes freqüents: Lió, Marsella, Bordeus, Rotterdam, Anvers, Frankfurt. Documentació: DUA | EUR.1 | T1 | Packing list. Incoterms: DAP, CPT, FCA, DDP. Sistemes digitals: POD electrònic | Tracking API | Telemàtica 3.0.',
    image: findImage('product-multimodal'),
  },
];

export const trucks = [
  {
    id: 1,
    name: 'Cisterna MAN TGX',
    capacity: '30,000 Litres',
    status: 'Disponible',
    specs: 'Certificat ADR, 3 compartiments',
    image: findImage('truck-standard'),
  },
  {
    id: 2,
    name: 'Volvo FH Liquid+',
    capacity: '35,000 Litres',
    status: 'En Trànsit',
    specs: 'Rastreig GPS, Tanc aïllat',
    image: findImage('truck-large'),
  },
  {
    id: 3,
    name: 'Scania R-Series Chemo',
    capacity: '28,000 Litres',
    status: 'Disponible',
    specs: "Tanc d'acer inoxidable, Bomba d'alta pressió",
    image: findImage('truck-specialized'),
  },
    {
    id: 4,
    name: 'Cisterna DAF XF',
    capacity: '32,000 Litres',
    status: 'Manteniment',
    specs: 'Certificat de grau alimentari, 4 compartiments',
    image: findImage('truck-standard'),
  },
];

export const orders = [
];
