'use client';

import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, createWhatsAppMessageForBooking } from '@/lib/whatsapp';
import { buildAirbnbBookingUrl, formatDateTr } from '@/lib/calendar-utils';

interface BookingChoiceProps {
  villaName: string;
  listingUrl: string | null;
  checkIn: string | null;
  checkOut: string | null;
  nights: number;
  onClear: () => void;
}

export default function BookingChoice({
  villaName,
  listingUrl,
  checkIn,
  checkOut,
  nights,
  onClear,
}: BookingChoiceProps) {
  const hasRange = Boolean(checkIn && checkOut);

  const whatsappUrl = getWhatsAppUrl(
    createWhatsAppMessageForBooking({
      villaName,
      checkIn: checkIn ? formatDateTr(checkIn) : undefined,
      checkOut: checkOut ? formatDateTr(checkOut) : undefined,
      nights: hasRange ? nights : undefined,
    })
  );

  const airbnbUrl =
    listingUrl && hasRange && checkIn && checkOut
      ? buildAirbnbBookingUrl(listingUrl, checkIn, checkOut)
      : listingUrl;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      {hasRange ? (
        <div className="flex items-center justify-between mb-4 bg-luxury-gray rounded-lg p-3">
          <div className="text-sm">
            <p className="font-semibold text-luxury-dark">
              {formatDateTr(checkIn!)} - {formatDateTr(checkOut!)}
            </p>
            <p className="text-gray-500">{nights} gece</p>
          </div>
          <button
            onClick={onClear}
            aria-label="Seçimi temizle"
            className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-luxury-dark transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Giriş ve çıkış tarihlerini seçerek rezervasyon seçeneklerini görüntüleyin.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {airbnbUrl && (
          <motion.a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl font-semibold bg-[#FF385C] hover:bg-[#E0314F] text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            Airbnb'de Rezervasyon Yap
          </motion.a>
        )}

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl font-semibold bg-whatsapp hover:bg-whatsapp-hover text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          <MessageCircle size={20} />
          WhatsApp'tan Bilgi Al
        </motion.a>
      </div>
    </div>
  );
}
