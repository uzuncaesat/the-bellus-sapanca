# Google Maps Entegrasyonu - Adım Adım Rehber

## ✅ Otomatik Kurulum (Iframe Embed - Önerilen)

**Şu anda site zaten hazır!** Google Maps otomatik olarak iframe embed yöntemiyle eklenmiştir. Bu yöntem:
- ✅ API key gerektirmez
- ✅ Hemen çalışır
- ✅ Ücretsizdir
- ✅ Kolaydır

## 📍 Konumu Özelleştirme

Eğer villa konumunu değiştirmek istersen:

### Villa Detay Sayfası (`app/villa/[id]/page.tsx`)
```tsx
<GoogleMap 
  address="Sapanca, Sakarya, Türkiye"  // Buraya villa adresini yaz
  latitude={40.6919}                     // Enlem koordinatı
  longitude={30.2685}                    // Boylam koordinatı
  height="400px"
/>
```

### İletişim Sayfası (`app/iletisim/page.tsx`)
```tsx
<GoogleMap 
  address="Sapanca, Sakarya, Türkiye"
  latitude={40.6919}
  longitude={30.2685}
  height="500px"
/>
```

## 🗺️ Koordinat Bulma (Enlem/Boylam)

1. **Google Maps'te arama yap:**
   - https://maps.google.com adresine git
   - Villa konumunu ara (örn: "Sapanca Sakarya")

2. **Konumu bul ve sağ tıkla:**
   - Haritada villanın konumuna sağ tıkla
   - "Koordinatları kopyala" seçeneğini tıkla
   - Örnek format: `40.6919, 30.2685`

3. **Kodu güncelle:**
   - `latitude={40.6919}` → Enlem değeri
   - `longitude={30.2685}` → Boylam değeri

## 🎯 İleri Seviye: Google Maps JavaScript API (Opsiyonel)

Eğer daha gelişmiş özellikler istersen (işaretçiler, yol tarifi, vb.):

### Adım 1: Google Cloud Console'da API Key Al

1. **Google Cloud Console'a git:**
   - https://console.cloud.google.com/
   - Giriş yap

2. **Yeni proje oluştur:**
   - "Proje Seç" → "Yeni Proje"
   - Proje adı: "Bellus Sapanca Website"
   - "Oluştur" tıkla

3. **Maps JavaScript API'yi etkinleştir:**
   - Sol menüden "API'ler ve Hizmetler" → "Kütüphane"
   - "Maps JavaScript API" ara
   - "Etkinleştir" tıkla

4. **API Key oluştur:**
   - "API'ler ve Hizmetler" → "Kimlik Bilgileri"
   - "+ KİMLİK BİLGİSİ OLUŞTUR" → "API anahtarı"
   - API key kopyala (örn: `AIzaSy...`)

5. **API Key'i kısıtla (Güvenlik için):**
   - Oluşturulan API key'in yanındaki kalem ikonuna tıkla
   - "Uygulama kısıtlamaları" → "HTTP referrer (web siteleri)"
   - Referrer ekle: `https://yourdomain.com/*` (veya `localhost:3000/*` geliştirme için)
   - "Kaydet"

### Adım 2: Kodu Güncelle

1. **`.env.local` dosyası oluştur:**
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy... (API key'inizi buraya yapıştırın)
```

2. **`components/GoogleMap.tsx` dosyasını güncelle:**
```tsx
'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google Maps script yükle
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.6919, lng: 30.2685 },
          zoom: 13,
        });

        new window.google.maps.Marker({
          position: { lat: 40.6919, lng: 30.2685 },
          map: map,
          title: 'The Bellus Sapanca',
        });
      }
    };

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) script.remove();
    };
  }, []);

  return <div ref={mapRef} className="w-full h-96 rounded-xl" />;
}
```

## 📝 Mevcut Durum

✅ **Iframe Embed yöntemi aktif** - API key gerektirmez, hemen çalışır
- Villa detay sayfalarında harita görünüyor
- İletişim sayfasında harita görünüyor
- Responsive ve modern tasarım

## 🔧 Sorun Giderme

**Harita görünmüyorsa:**
1. Tarayıcı konsolunu kontrol et (F12)
2. Dosya yollarını kontrol et
3. `npm run dev` ile sunucuyu yeniden başlat

**Koordinat bulamıyorsan:**
- https://www.gps-coordinates.net/ sitesini kullan
- Adresi yaz, koordinatları al

**API key ile ilgili sorun:**
- API key'in doğru olduğundan emin ol
- `.env.local` dosyasının root dizinde olduğundan emin ol
- Sunucuyu yeniden başlat (`.env` değişiklikleri için gerekli)

## 💡 İpucu

Şu anki iframe embed yöntemi çoğu durumda yeterlidir. API key sadece daha gelişmiş özellikler (custom marker, route, vb.) için gereklidir.
