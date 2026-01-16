'use client';

import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToNext}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white hover:text-whatsapp transition-colors"
      aria-label="Aşağı scroll et"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-sm font-medium">Keşfet</span>
        <ChevronDown size={24} />
      </motion.div>
    </motion.button>
  );
}
