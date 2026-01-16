import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE } from './constants';

/**
 * WhatsApp URL oluşturur
 * @param message - Gönderilecek mesaj (opsiyonel, varsayılan mesaj kullanılır)
 * @returns WhatsApp web URL'i
 */
export function getWhatsAppUrl(message?: string): string {
  const text = message || DEFAULT_WHATSAPP_MESSAGE;
  const encodedMessage = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * WhatsApp'ı yeni sekmede açar
 * @param message - Gönderilecek mesaj (opsiyonel)
 */
export function openWhatsApp(message?: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank');
}

/**
 * Form verilerinden WhatsApp mesajı oluşturur
 */
export function createWhatsAppMessageFromForm(data: {
  dates?: string;
  guests?: string;
  message?: string;
}): string {
  let message = 'Merhaba, The Bellus Sapanca villanız hakkında bilgi almak istiyorum.\n\n';
  
  if (data.dates) {
    message += `Konaklama tarihleri: ${data.dates}\n`;
  } else {
    message += 'Konaklama tarihleri:\n';
  }
  
  if (data.guests) {
    message += `Kişi sayısı: ${data.guests}\n`;
  } else {
    message += 'Kişi sayısı:\n';
  }
  
  if (data.message) {
    message += `\n${data.message}\n`;
  }
  
  message += '\nUygunluk ve fiyat bilgisi alabilir miyim?';
  
  return message;
}
