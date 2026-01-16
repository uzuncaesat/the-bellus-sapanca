'use client';

import { Waves, Flame, Home, Sparkles, ChefHat, Car } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Pool: Waves,
  Flame,
  Home,
  Campfire: Sparkles,
  ChefHat,
  Car,
};

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const IconComponent = iconMap[feature.icon] || Home;
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-beige-100 p-3 rounded-lg">
                <IconComponent size={24} className="text-whatsapp" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-dark">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
