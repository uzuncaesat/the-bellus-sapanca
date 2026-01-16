'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { openWhatsApp, getWhatsAppUrl } from '@/lib/whatsapp';
import { PHONE_NUMBER } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTAButtonsProps {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function CTAButtons({ variant = 'default', size = 'md' }: CTAButtonsProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    default: {
      whatsapp: 'bg-whatsapp hover:bg-whatsapp-hover text-white',
      phone: 'bg-luxury-dark hover:bg-gray-700 text-white',
    },
    outline: {
      whatsapp: 'border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white',
      phone: 'border-2 border-luxury-dark text-luxury-dark hover:bg-luxury-dark hover:text-white',
    },
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.button
        onClick={() => openWhatsApp()}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${sizeClasses[size]} ${variantClasses[variant].whatsapp} rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden group`}
      >
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        <MessageCircle size={20} className="relative z-10" />
        <span className="relative z-10">WhatsApp'tan Bilgi Al</span>
      </motion.button>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={`tel:${PHONE_NUMBER}`}
          className={`${sizeClasses[size]} ${variantClasses[variant].phone} rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-center relative overflow-hidden group`}
        >
          <motion.span
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <Phone size={20} className="relative z-10" />
          <span className="relative z-10">Hemen Ara</span>
        </Link>
      </motion.div>
    </div>
  );
}
