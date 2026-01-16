import Link from 'next/link';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { BRAND_NAME, PHONE_NUMBER, WHATSAPP_NUMBER } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-luxury-gray border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-luxury-dark mb-4">{BRAND_NAME}</h3>
            <p className="text-gray-600">
              Sapanca'da korunaklı ve özel konsept lüks villa deneyimi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-dark mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-whatsapp transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/villa/villa-1" className="text-gray-600 hover:text-whatsapp transition-colors">
                  Villalar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-600 hover:text-whatsapp transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-dark mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-whatsapp transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-luxury-dark transition-colors"
                >
                  <Phone size={18} />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin size={18} className="mt-1" />
                <span>Sapanca, Sakarya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
