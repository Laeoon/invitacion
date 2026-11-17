export interface EventLocation {
  title: string;
  time: string;
  place: string;
  address: string;
  googleMapsUrl: string;
  wazeUrl: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export const EVENT_CONFIG = {
  celebrantName: 'Arianna Angulo',
  initials: 'AA',
  editionLabel: 'Mis XV Años',
  dateLabel: '5 de diciembre',
  // ISO target for the live countdown timer
  eventIsoDate: '2026-12-05T19:00:00',
  heroSubtitle: 'Con la bendición de Dios y mis padres, te invito a celebrar una noche inolvidable.',
  locations: [
    {
      title: 'Ceremonia y Recepción',
      time: '(hora)',
      place: '(lugar)',
      address: '(dirección)',
      googleMapsUrl: 'https://maps.google.com/?q=(lugar)',
      wazeUrl: 'https://waze.com/ul?q=(lugar)',
    },
  ] satisfies EventLocation[],
  itinerary: [
    {
      time: '(hora)',
      title: 'Recepción',
      description: '(detalle)',
    },
    {
      time: '(hora)',
      title: 'Vals',
      description: '(detalle)',
    },
    {
      time: '(hora)',
      title: 'Brindis',
      description: '(detalle)',
    },
    {
      time: '(hora)',
      title: 'Fiesta',
      description: '(detalle)',
    },
  ] satisfies ItineraryItem[],
  dressCode: {
    label: 'Opcional · Recomendaciones',
    note: 'Estas tonalidades son solo una guía opcional para acompañarnos en armonía.',
    suggestedColors: [
      { name: 'Beige', hex: '#E8DCC4' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Negro', hex: '#1F1A1B' },
      { name: 'Borgoña', hex: '#6D1322' },
      { name: 'Azul Marino', hex: '#162647' },
    ] satisfies ColorSwatch[],
    reservedColors: [
      { name: 'Dorado', hex: '#D4AF37' },
      { name: 'Rojo', hex: '#9B1B30' },
    ] satisfies ColorSwatch[],
  },
  gifts: {
    headline: 'Lluvia de Sobres',
    description: 'Tu presencia es mi mejor regalo. Si deseas tener un detalle adicional, contaremos con lluvia de sobres o puedes usar los siguientes datos:',
    bankDetails: [
      { label: 'Banco / Pago Móvil', value: '(datos bancarios)' },
      { label: 'Titular / Cédula / RIF', value: '(titular y documento)' },
    ],
  },
};
