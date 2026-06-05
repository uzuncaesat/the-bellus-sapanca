import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Bed, Users, MapPin } from 'lucide-react';
import { getVillaById } from '@/lib/villa-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import ImageGallery from '@/components/ImageGallery';
import InfoBox from '@/components/InfoBox';
import CTAButtons from '@/components/CTAButtons';
import FeatureGrid from '@/components/FeatureGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import BackToTop from '@/components/BackToTop';
import GoogleMap from '@/components/GoogleMap';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import { BRAND_NAME } from '@/lib/constants';

interface VillaDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: VillaDetailPageProps) {
  const villa = getVillaById(params.id);

  if (!villa) {
    return {
      title: 'Villa Bulunamadı',
    };
  }

  return {
    title: `${villa.name} | ${BRAND_NAME}`,
    description: villa.shortDescription,
    openGraph: {
      title: `${villa.name} | ${BRAND_NAME}`,
      description: villa.shortDescription,
      images: villa.images[0] ? [villa.images[0]] : [],
    },
  };
}

export default function VillaDetailPage({ params }: VillaDetailPageProps) {
  const villa = getVillaById(params.id);

  if (!villa) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumbs */}
        <section className="py-4 bg-luxury-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Villalar', href: '/villa/villa-1' },
                { label: villa.name },
              ]}
            />
          </div>
        </section>

        {/* Hero Gallery */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageGallery images={villa.images} villaName={villa.name} />
          </div>
        </section>

        {/* Villa Info */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-luxury-dark mb-6">
                  {villa.name}
                </h1>
                
                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bed size={20} className="text-whatsapp" />
                    <span className="font-semibold">{villa.bedrooms} Yatak Odası</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={20} className="text-whatsapp" />
                    <span className="font-semibold">{villa.capacity} Kişi</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={20} className="text-whatsapp" />
                    <span className="font-semibold">Sapanca, Sakarya</span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  {villa.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-luxury-dark mb-6">Özellikler</h2>
                  <FeatureGrid features={villa.features} />
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-luxury-dark mb-6">Müsaitlik</h2>
                  <AvailabilityCalendar villaId={villa.id} villaName={villa.name} />
                </div>

                {/* Location */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-luxury-dark mb-6">Konum</h2>
                  <div className="bg-luxury-gray rounded-lg p-6 mb-4">
                    <p className="text-gray-700 mb-4">
                      The Bellus, Sapanca'nın merkezi noktalarına ve sahile oldukça yakın bir konumda yer alır. 
                      Lüks restoranlar, popüler kafeler ve yürüyüş rotaları sadece dakikalar uzaklıktadır.
                    </p>
                    <GoogleMap 
                      address="Kırkpınar Tepebaşı, Barış 2. Sk. No:14 Sapanca, Sakarya, Turkey"
                      latitude={40.69062475521868}
                      longitude={30.20866731355949}
                      height="400px"
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <InfoBox checkIn={villa.checkIn} checkOut={villa.checkOut} rules={villa.rules} />
                  
                  <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-luxury-dark mb-4">
                      Rezervasyon İçin
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Detaylı bilgi ve rezervasyon için bizimle iletişime geçin.
                    </p>
                    <CTAButtons />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky CTA (Mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30">
          <CTAButtons size="sm" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <BackToTop />
    </>
  );
}
