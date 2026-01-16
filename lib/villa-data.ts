import { VillaId } from './constants';

export interface Villa {
  id: VillaId;
  name: string;
  description: string;
  shortDescription: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  rules: {
    icon: string;
    text: string;
    type: 'prohibition' | 'requirement' | 'info';
  }[];
  images: string[];
  capacity: number;
  bedrooms: number;
  checkIn: string;
  checkOut: string;
  bedLayout: {
    floor: string;
    beds: string;
  }[];
}

const baseDescription = `Sapanca'da korunaklı ve özel konseptiyle hizmet veren The Bellus Sapanca, tamamen size özel geniş ve korunaklı bahçede konumlanmıştır. Gözlerden uzak, doğayla iç içe ve tamamen izole bir konaklama sunar.

2 katlı ve müstakil yapısıyla, 3 yatak odası, ferah bir salon, yüksek tavan mimarisiyle hem şık hem de ev konforundadır. Modern mimarisi ve lüks detaylarıyla unutulmaz bir tatil deneyimi sunar.

Villamızda şömine bulunmaktadır, soğuk Sapanca akşamlarında keyifli ve sıcak bir atmosfer sunar. Isıtmalı havuzumuz dört mevsim konforlu bir şekilde kullanılabilir.

Bahçemizde yer alan barbekü alanı ve ateş çukuru sayesinde akşam saatlerinde keyifli sohbetler eşliğinde sıcak ve huzurlu bir atmosfer sunar. Mutfakta ihtiyacınız olan tüm detaylar düşünülmüştür.

The Bellus, Sapanca'nın merkezi noktalarına ve sahile oldukça yakın bir konumda yer alır. Lüks restoranlar, popüler kafeler ve yürüyüş rotaları sadece dakikalar uzaklıktadır.`;

const baseFeatures = [
  {
    icon: 'Pool',
    title: 'Isıtmalı Havuz',
    description: 'Dört mevsim kullanılabilir özel havuz',
  },
  {
    icon: 'Flame',
    title: 'Şömine',
    description: 'Soğuk akşamlar için sıcak atmosfer',
  },
  {
    icon: 'Home',
    title: 'Müstakil & Korunaklı',
    description: 'Tamamen özel ve korunaklı bahçe',
  },
  {
    icon: 'Campfire',
    title: 'Ateş Çukuru',
    description: 'Akşam saatlerinde keyifli sohbetler',
  },
  {
    icon: 'ChefHat',
    title: 'Barbekü',
    description: 'Bahçede mangal keyfi',
  },
  {
    icon: 'Car',
    title: 'Ücretsiz Otopark',
    description: 'Özel park alanı',
  },
];

const baseRules = [
  {
    icon: 'XCircle',
    text: 'Tek gece rezervasyon kabul edilmemektedir',
    type: 'prohibition' as const,
  },
  {
    icon: 'Users',
    text: 'Sadece aileler ve kadın gruplarına hizmet verilmektedir',
    type: 'requirement' as const,
  },
  {
    icon: 'Wine',
    text: 'Tesiste alkol kullanımı kesinlikle yasaktır',
    type: 'prohibition' as const,
  },
  {
    icon: 'Dog',
    text: 'Evcil hayvan kabul edilmemektedir',
    type: 'prohibition' as const,
  },
];

const baseBedLayout = [
  {
    floor: 'Alt kat',
    beds: '2 adet tek kişilik yatak',
  },
  {
    floor: 'Üst kat',
    beds: '2 ayrı odada birer adet çift kişilik yatak',
  },
  {
    floor: 'Salon',
    beds: 'L koltuk',
  },
];

// Villa 1 için görseller
const getVilla1Images = (): string[] => {
  return [
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.06.jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.08 (1).jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.08.jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.09.jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.10 (1).jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.10.jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.11 (1).jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.11 (2).jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.11.jpeg',
    '/images/villa1/WhatsApp Image 2026-01-17 at 01.08.12.jpeg',
  ];
};

// Villa 2 için görseller
const getVilla2Images = (): string[] => {
  return [
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.14 (1).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.14.jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15 (1).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15 (2).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15 (3).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15 (4).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15 (5).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15 (6).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.15.jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16 (1).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16 (2).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16 (3).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16 (4).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16 (5).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16 (6).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.16.jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.17 (1).jpeg',
    '/images/villa2/WhatsApp Image 2026-01-15 at 22.22.17.jpeg',
  ];
};

// Villa 3 için görseller
const getVilla3Images = (): string[] => {
  return [
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.28 (1).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.28.jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.29 (1).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.29 (2).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.29 (3).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.29 (4).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.29 (5).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.29.jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.30 (1).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.30 (2).jpeg',
    '/images/villa3/WhatsApp Image 2026-01-15 at 22.22.30.jpeg',
  ];
};

export const villas: Villa[] = [
  {
    id: 'villa-1',
    name: 'Villa 1',
    description: baseDescription,
    shortDescription: 'Sapanca\'da korunaklı ve özel konsept lüks villa. 2 katlı, 3 yatak odalı, 6 kişilik kapasiteli.',
    features: baseFeatures,
    rules: baseRules,
    images: getVilla1Images(),
    capacity: 6,
    bedrooms: 3,
    checkIn: '14:00',
    checkOut: '11:00',
    bedLayout: baseBedLayout,
  },
  {
    id: 'villa-2',
    name: 'Villa 2',
    description: baseDescription,
    shortDescription: 'Sapanca\'da korunaklı ve özel konsept lüks villa. 2 katlı, 3 yatak odalı, 6 kişilik kapasiteli.',
    features: baseFeatures,
    rules: baseRules,
    images: getVilla2Images(),
    capacity: 6,
    bedrooms: 3,
    checkIn: '14:00',
    checkOut: '11:00',
    bedLayout: baseBedLayout,
  },
  {
    id: 'villa-3',
    name: 'Villa 3',
    description: baseDescription,
    shortDescription: 'Sapanca\'da korunaklı ve özel konsept lüks villa. 2 katlı, 3 yatak odalı, 6 kişilik kapasiteli.',
    features: baseFeatures,
    rules: baseRules,
    images: getVilla3Images(),
    capacity: 6,
    bedrooms: 3,
    checkIn: '14:00',
    checkOut: '11:00',
    bedLayout: baseBedLayout,
  },
];

export function getVillaById(id: string): Villa | undefined {
  return villas.find(villa => villa.id === id);
}

export function getAllVillas(): Villa[] {
  return villas;
}
