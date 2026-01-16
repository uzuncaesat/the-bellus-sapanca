'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND_TAGLINE } from '@/lib/constants';
import CTAButtons from './CTAButtons';
import ScrollIndicator from './ScrollIndicator';

interface HeroSectionProps {
  heroImage: string;
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroImage}
          alt="The Bellus Sapanca Villa"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Geliştirilmiş gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </motion.div>
      
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          {BRAND_TAGLINE}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl lg:text-3xl mb-10 text-gray-100 font-light"
        >
          Doğayla iç içe, tamamen izole ve lüks bir konaklama deneyimi
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CTAButtons size="lg" />
        </motion.div>
      </motion.div>
      
      <ScrollIndicator />
    </section>
  );
}
