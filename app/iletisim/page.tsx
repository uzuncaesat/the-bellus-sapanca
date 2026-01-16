'use client';

import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import BackToTop from '@/components/BackToTop';
import FormInput from '@/components/FormInput';
import GoogleMap from '@/components/GoogleMap';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/lib/constants';
import { openWhatsApp, createWhatsAppMessageFromForm } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';

interface FormErrors {
  dates?: string;
  guests?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    dates: '',
    guests: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.dates.trim()) {
      newErrors.dates = 'Konaklama tarihleri gereklidir';
    }

    if (!formData.guests.trim()) {
      newErrors.guests = 'Kişi sayısı gereklidir';
    } else if (!/^\d+/.test(formData.guests)) {
      newErrors.guests = 'Lütfen geçerli bir kişi sayısı girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const message = createWhatsAppMessageFromForm(formData);
    openWhatsApp(message);
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({ dates: '', guests: '', message: '' });
      setTouched({});
      setShowSuccess(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    
    // Validate on blur
    if (touched[name] || formData[name as keyof typeof formData]) {
      validateForm();
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-beige-50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-luxury-dark mb-6"
            >
              İletişim
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Rezervasyon ve bilgi için bizimle iletişime geçin
            </motion.p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-luxury-dark mb-8">İletişim Bilgileri</h2>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-beige-100 p-3 rounded-lg">
                      <MessageCircle size={24} className="text-whatsapp" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-dark mb-1">WhatsApp</h3>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-whatsapp hover:underline"
                      >
                        +{WHATSAPP_NUMBER}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-beige-100 p-3 rounded-lg">
                      <Phone size={24} className="text-whatsapp" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-dark mb-1">Telefon</h3>
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="text-gray-700 hover:text-whatsapp transition-colors"
                      >
                        {PHONE_NUMBER}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-beige-100 p-3 rounded-lg">
                      <MapPin size={24} className="text-whatsapp" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxury-dark mb-1">Adres</h3>
                      <p className="text-gray-700">Sapanca, Sakarya</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 p-6 bg-beige-50 rounded-lg border border-beige-200">
                  <h3 className="font-semibold text-luxury-dark mb-3">Çalışma Saatleri</h3>
                  <p className="text-gray-700 mb-2">Giriş: 14:00</p>
                  <p className="text-gray-700">Çıkış: 11:00</p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-luxury-dark mb-8">Rezervasyon Talebi</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    id="dates"
                    name="dates"
                    label="Konaklama Tarihleri"
                    type="text"
                    value={formData.dates}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dates ? errors.dates : undefined}
                    placeholder="Örn: 15-20 Ocak 2026"
                    required
                  />

                  <FormInput
                    id="guests"
                    name="guests"
                    label="Kişi Sayısı"
                    type="text"
                    value={formData.guests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.guests ? errors.guests : undefined}
                    placeholder="Örn: 4 kişi"
                    required
                  />

                  <FormInput
                    id="message"
                    name="message"
                    label="Mesajınız"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message ? errors.message : undefined}
                    placeholder="Eklemek istediğiniz bilgiler..."
                    rows={4}
                  />

                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl"
                      >
                        ✅ Form başarıyla gönderildi! WhatsApp açılıyor...
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full bg-whatsapp hover:bg-whatsapp-hover text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={20} />
                        WhatsApp ile Gönder
                      </>
                    )}
                  </motion.button>

                  <p className="text-sm text-gray-500 text-center">
                    Formu gönderdiğinizde WhatsApp uygulamanız açılacak ve mesajınız hazır olacaktır.
                  </p>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-luxury-dark mb-8 text-center">Konum</h2>
              <GoogleMap 
                address="Kırkpınar Tepebaşı, Barış 2. Sk. No:14 Sapanca, Sakarya, Turkey"
                latitude={40.69062475521868}
                longitude={30.20866731355949}
                height="500px"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <BackToTop />
    </>
  );
}
