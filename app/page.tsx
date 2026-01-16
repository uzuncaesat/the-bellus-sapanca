'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Shield, Users, Volume2 } from 'lucide-react';
import { BRAND_TAGLINE } from '@/lib/constants';
import { getAllVillas } from '@/lib/villa-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import CTAButtons from '@/components/CTAButtons';
import FeatureGrid from '@/components/FeatureGrid';
import VillaCard from '@/components/VillaCard';
import HeroSection from '@/components/HeroSection';
import BackToTop from '@/components/BackToTop';
import { motion } from 'framer-motion';

export default function HomePage() {
  const villas = getAllVillas();
  const features = villas[0]?.features || [];

  // Hero için dekorasyon görseli (ilk görseli kullan)
  const heroImage = '/images/decoration/WhatsApp Image 2026-01-15 at 22.32.14.jpeg';

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection heroImage={heroImage} />

        {/* Intro Section */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-block">
                  <span className="text-whatsapp font-semibold text-sm uppercase tracking-wider mb-4 block">
                    The Bellus Sapanca
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-luxury-dark leading-tight">
                  Hoş Geldiniz
                </h2>
                
                <div className="h-1 w-24 bg-gradient-to-r from-whatsapp to-transparent rounded-full"></div>
                
                <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
                  <p>
                    Sapanca'da korunaklı ve özel konseptiyle hizmet veren{' '}
                    <strong className="text-luxury-dark">The Bellus Sapanca</strong>, 
                    tamamen size özel geniş ve korunaklı bahçede konumlanmıştır.
                  </p>
                  <p className="text-gray-600">
                    Gözlerden uzak, doğayla iç içe ve tamamen izole bir konaklama sunar. 2 katlı ve müstakil yapısıyla, 
                    3 yatak odası, ferah bir salon, yüksek tavan mimarisiyle hem şık hem de ev konforundadır.
                  </p>
                </div>
              </motion.div>
              
              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
              >
                <Image
                  src="/images/decoration/WhatsApp Image 2026-01-15 at 22.32.14.jpeg"
                  alt="The Bellus Sapanca Villa - İç Mekan Dekorasyonu"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/40 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/40 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-beige-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-dark mb-4">
                Özellikler
              </h2>
              <p className="text-lg text-gray-600">
                Villamızın sunduğu lüks olanaklar
              </p>
            </motion.div>
            <FeatureGrid features={features} />
          </div>
        </section>

        {/* Villas Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-dark mb-4">
                Villalarımız
              </h2>
              <p className="text-lg text-gray-600">
                Her biri özenle tasarlanmış lüks konaklama seçenekleri
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {villas.map((villa, index) => (
                <VillaCard key={villa.id} villa={villa} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 md:py-24 bg-luxury-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-dark mb-4">
                Neden The Bellus Sapanca?
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center bg-white p-8 rounded-lg shadow-md"
              >
                <div className="bg-beige-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-whatsapp" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-dark mb-2">Ailelere Uygun</h3>
                <p className="text-gray-600">
                  Sadece aileler ve kadın gruplarına hizmet veriyoruz. Güvenli ve huzurlu bir ortam.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center bg-white p-8 rounded-lg shadow-md"
              >
                <div className="bg-beige-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-whatsapp" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-dark mb-2">Alkolsüz Tesis</h3>
                <p className="text-gray-600">
                  Tesiste alkol kullanımı kesinlikle yasaktır. Aile dostu bir ortam.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center bg-white p-8 rounded-lg shadow-md"
              >
                <div className="bg-beige-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 size={32} className="text-whatsapp" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-dark mb-2">Sessiz ve İzole</h3>
                <p className="text-gray-600">
                  Gözlerden uzak, doğayla iç içe ve tamamen izole bir konaklama.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-whatsapp text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Rezervasyon ve Bilgi İçin
              </h2>
              <p className="text-xl mb-8 text-green-50">
                Bizimle iletişime geçin, size özel fiyat teklifi hazırlayalım
              </p>
              <CTAButtons variant="outline" size="lg" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <BackToTop />
    </>
  );
}
