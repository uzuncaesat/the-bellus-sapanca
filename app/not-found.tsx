import Link from 'next/link';
import { Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-beige-50">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-luxury-dark mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-luxury-dark mb-4">Sayfa Bulunamadı</h2>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <Home size={20} />
            Ana Sayfaya Dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
