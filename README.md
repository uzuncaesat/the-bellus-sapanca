# The Bellus Sapanca Villa Website

Modern, lüks ve responsive villa showcase websitesi. Next.js App Router, TypeScript, Tailwind CSS ve Framer Motion kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- ✅ 3 villa için dinamik detay sayfaları
- ✅ Responsive tasarım (mobile-first)
- ✅ WhatsApp Business entegrasyonu
- ✅ SEO optimizasyonu
- ✅ Modern animasyonlar (Framer Motion)
- ✅ Görsel galeri (lightbox özellikli)
- ✅ İletişim formu (WhatsApp'a yönlendirme)
- ✅ Türkçe dil desteği

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn

## 🛠️ Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
/
├── app/                    # Next.js App Router sayfaları
│   ├── layout.tsx         # Root layout ve SEO metadata
│   ├── page.tsx           # Ana sayfa
│   ├── villa/[id]/        # Villa detay sayfaları
│   ├── iletisim/          # İletişim sayfası
│   └── globals.css         # Global stiller
├── components/             # React bileşenleri
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WhatsAppFloatingButton.tsx
│   ├── CTAButtons.tsx
│   ├── FeatureGrid.tsx
│   ├── ImageGallery.tsx
│   ├── InfoBox.tsx
│   └── VillaCard.tsx
├── lib/                    # Yardımcı fonksiyonlar ve veriler
│   ├── constants.ts        # Sabitler (WhatsApp numarası, vb.)
│   ├── whatsapp.ts         # WhatsApp helper fonksiyonları
│   └── villa-data.ts       # Villa verileri
└── public/
    └── images/             # Görseller
        ├── villa1/
        ├── villa2/
        ├── villa3/
        └── decoration/
```

## ⚙️ Yapılandırma

### WhatsApp Numarasını Değiştirme

`lib/constants.ts` dosyasını düzenleyin:

```typescript
export const WHATSAPP_NUMBER = '905374939257'; // Yeni numarayı buraya yazın
export const PHONE_NUMBER = '+905374939257';   // Yeni numarayı buraya yazın
```

### Villa İçeriğini Düzenleme

`lib/villa-data.ts` dosyasını düzenleyin. Her villa için:

- `name`: Villa adı
- `description`: Detaylı açıklama
- `shortDescription`: Kısa açıklama (kartlarda kullanılır)
- `features`: Özellikler listesi
- `rules`: Kurallar listesi
- `images`: Görsel dosya yolları
- `capacity`: Kapasite
- `bedrooms`: Yatak odası sayısı

### Görselleri Değiştirme

1. Yeni görselleri `public/images/` altındaki ilgili klasörlere ekleyin:
   - `villa1/` → Villa 1 görselleri
   - `villa2/` → Villa 2 görselleri
   - `villa3/` → Villa 3 görselleri
   - `decoration/` → Hero/background görselleri

2. `lib/villa-data.ts` dosyasındaki `getVilla1Images()`, `getVilla2Images()`, `getVilla3Images()` fonksiyonlarını güncelleyin ve yeni görsel dosya yollarını ekleyin.

**Örnek:**
```typescript
const getVilla1Images = (): string[] => {
  return [
    '/images/villa1/yeni-gorsel-1.jpeg',
    '/images/villa1/yeni-gorsel-2.jpeg',
    // ...
  ];
};
```

### Renkleri Özelleştirme

`tailwind.config.ts` dosyasındaki renk paletini düzenleyebilirsiniz:

```typescript
colors: {
  beige: {
    50: '#FEFDFB',
    100: '#F5F5DC',
    200: '#E8E8D3',
  },
  luxury: {
    gray: '#F7F7F7',
    dark: '#333333',
  },
  whatsapp: {
    DEFAULT: '#25D366',
    hover: '#20BA5A',
  },
}
```

## 🚢 Deploy

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Otomatik deploy başlayacaktır

### Netlify

1. [Netlify](https://netlify.com) hesabı oluşturun
2. Repository'nizi bağlayın
3. Build komutu: `npm run build`
4. Publish directory: `.next`

### Manuel Build

```bash
npm run build
npm start
```

## 📝 Notlar

- Site sadece promosyon amaçlıdır, online rezervasyon sistemi yoktur
- Tüm rezervasyon talepleri WhatsApp ve telefon üzerinden yapılmaktadır
- Görseller Next.js Image component'i ile optimize edilir
- SEO için her sayfa özel metadata içerir

## 🐛 Sorun Giderme

### Görseller görünmüyor
- Dosya yollarının doğru olduğundan emin olun
- `public/images/` klasörü altında olduklarını kontrol edin
- Dosya isimlerindeki özel karakterleri kontrol edin

### WhatsApp butonu çalışmıyor
- `lib/constants.ts` dosyasındaki numaranın doğru olduğundan emin olun
- Numara formatı: `905374939257` (ülke kodu + numara, başında + olmadan)

### Build hatası
- `npm install` komutunu tekrar çalıştırın
- Node.js versiyonunuzun 18+ olduğundan emin olun

## 📄 Lisans

Bu proje özel bir projedir.

## 📞 İletişim

Sorularınız için: +905374939257 (WhatsApp)
