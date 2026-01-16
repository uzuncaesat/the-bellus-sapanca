'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Bed, Users } from 'lucide-react';
import { Villa } from '@/lib/villa-data';

interface VillaCardProps {
  villa: Villa;
  index: number;
}

export default function VillaCard({ villa, index }: VillaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      <Link href={`/villa/${villa.id}`} className="block">
        <div className="relative h-64 w-full overflow-hidden">
          {villa.images[0] && (
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={villa.images[0]}
                alt={villa.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              {/* 3D transform effect */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ rotateY: 2, rotateX: -2 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              />
            </motion.div>
          )}
          {/* Floating info badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-luxury-dark px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1">
              <Bed size={14} />
              {villa.bedrooms}
            </span>
            <span className="bg-white/90 backdrop-blur-sm text-luxury-dark px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-1">
              <Users size={14} />
              {villa.capacity}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-luxury-dark mb-3 group-hover:text-whatsapp transition-colors">
            {villa.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {villa.shortDescription}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Bed size={16} className="text-whatsapp" />
                {villa.bedrooms} Oda
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} className="text-whatsapp" />
                {villa.capacity} Kişi
              </span>
            </div>
            <motion.div
              className="flex items-center gap-2 text-whatsapp font-semibold"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>Detaylar</span>
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
