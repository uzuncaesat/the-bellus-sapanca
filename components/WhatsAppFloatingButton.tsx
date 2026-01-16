'use client';

import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

export default function WhatsAppFloatingButton() {
  return (
    <button
      onClick={() => openWhatsApp()}
      className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle size={28} />
    </button>
  );
}
