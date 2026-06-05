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
    <div className="mt-4 pt-4 border-t border-gray-200">
      {hasRange ? (
        <div className="flex items-center justify-between mb-3 bg-luxury-gray rounded-lg p-2.5">
          <div className="text-xs">
            <p className="font-semibold text-luxury-dark">
              {formatDateTr(checkIn!)} - {formatDateTr(checkOut!)}
            </p>
            <p className="text-gray-500">{nights} gece</p>
          </div>
          <button
            onClick={onClear}
            aria-label="Seçimi temizle"
            className="p-1 rounded-lg hover:bg-white text-gray-400 hover:text-luxury-dark transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-500 mb-3">
          Giriş ve çıkış tarihlerini seçin.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {airbnbUrl && (
          <motion.a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#FF385C] hover:bg-[#E0314F] text-white shadow-sm flex items-center justify-center gap-2 transition-all duration-300"
          >
            Airbnb'de Rezervasyon Yap
          </motion.a>
        )}

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-whatsapp hover:bg-whatsapp-hover text-white shadow-sm flex items-center justify-center gap-2 transition-all duration-300"
        >
          <MessageCircle size={16} />
          WhatsApp'tan Bilgi Al
        </motion.a>
      </div>
    </div>
  );
}
