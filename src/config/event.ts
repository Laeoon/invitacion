export interface EventLocation {
  title: string;
  time: string;
  place: string;
  address: string;
  googleMapsUrl: string;
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
  // ISO target for the live countdown timer (9:00 PM VET)
  eventIsoDate: '2026-12-05T21:00:00-04:00',
  // Set to true on the day of the event to open the Polaroid album
  albumEnabled: false,
  heroSubtitle: 'Con la bendición de Dios y mis padres, te invito a celebrar una noche inolvidable.',
  locations: [
    {
      title: 'Ceremonia y Recepción',
      time: '9:00 PM',
      place: 'La Chapa, Calle Sucre, Casa N° 26',
      address: 'La Chapa, Calle Sucre, Casa N° 26',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Chapa+Calle+Sucre+Casa+26',
    },
  ] satisfies EventLocation[],
  itinerary: [
    {
      time: '9:00 PM',
      title: 'Llegada y Recepción',
      description: 'Bienvenida a los invitados.',
    },
    {
      time: '11:00 PM',
      title: 'Entrada de la Quinceañera',
      description: 'Salida especial de Arianna.',
    },
    {
      time: '12:00 AM',
      title: 'Brindis y Vals',
      description: 'Brindis, vals y comienzo de la celebración.',
    },
    {
      time: 'A partir de las 12:00 AM',
      title: 'Fiesta',
      description: 'Música y baile hasta el amanecer.',
    },
  ] satisfies ItineraryItem[],
  dressCode: {
    label: 'Opcional · Recomendaciones',
    note: 'Estas tonalidades son solo una guía opcional para acompañarnos en armonía.',
    suggestedColors: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Negro', hex: '#1F1A1B' },
      { name: 'Borgoña', hex: '#6D1322' },
      { name: 'Azul Marino', hex: '#162647' },
    ] satisfies ColorSwatch[],
    reservedColors: [
      { name: 'Dorado', hex: '#D4AF37' },
      { name: 'Rojo', hex: '#9B1B30' },
      { name: 'Beige', hex: '#E8DCC4' },
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
