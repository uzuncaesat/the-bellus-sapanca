import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} | Korunaklı Lüks Villa`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: 'Sapanca\'da korunaklı ve özel konsept lüks villa. 2 katlı, 3 yatak odalı, 6 kişilik kapasiteli. Isıtmalı havuz, şömine, barbekü ve daha fazlası.',
  keywords: [
    'Sapanca villa',
    'Sapanca kiralık villa',
    'lüks villa Sapanca',
    'Sapanca tatil evi',
    'Sapanca konaklama',
    'The Bellus Sapanca',
    'Sapanca aile villası',
    'Sapanca ısıtmalı havuzlu villa',
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://thebellussapanca.com',
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | Korunaklı Lüks Villa`,
    description: BRAND_TAGLINE,
    images: [
      {
        url: '/images/decoration/WhatsApp Image 2026-01-15 at 22.32.14.jpeg',
        width: 1200,
        height: 630,
        alt: BRAND_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} | Korunaklı Lüks Villa`,
    description: BRAND_TAGLINE,
    images: ['/images/decoration/WhatsApp Image 2026-01-15 at 22.32.14.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://thebellussapanca.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
