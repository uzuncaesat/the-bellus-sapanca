# Ücretsiz Deploy Rehberi - Kendi Domain'inle

## 🚀 Vercel ile Deploy (Önerilen - En Kolay)

Vercel, Next.js'in yaratıcısı tarafından yapılmış ve ücretsiz planı var. Custom domain desteği de ücretsiz!

### Adım 1: Vercel Hesabı Oluştur

1. **Vercel'e git:**
   - https://vercel.com adresine git
   - "Sign Up" tıkla

2. **GitHub ile giriş yap (önerilen):**
   - GitHub hesabın varsa "Continue with GitHub" tıkla
   - Veya email ile de kayıt olabilirsin

### Adım 2: Projeyi GitHub'a Yükle

1. **GitHub'da yeni repository oluştur:**
   - https://github.com/new adresine git
   - Repository name: `the-bellus-sapanca` (veya istediğin isim)
   - Public veya Private seç (ikisi de çalışır)
   - "Create repository" tıkla

2. **Projeyi GitHub'a push et:**

Terminal'de şu komutları çalıştır:

```bash
# Git başlat (eğer henüz yapmadıysan)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit - The Bellus Sapanca website"

# GitHub repository'ni bağla (YOUR_USERNAME'i değiştir)
git remote add origin https://github.com/YOUR_USERNAME/the-bellus-sapanca.git

# Branch adını main yap
git branch -M main

# GitHub'a yükle
git push -u origin main
```

**Not:** GitHub'a `.env.local`, `node_modules` gibi dosyaları yükleme. `.gitignore` zaten bunları engeller.

### Adım 3: Vercel'e Deploy Et

1. **Vercel dashboard'a git:**
   - https://vercel.com/dashboard
   - "Add New..." → "Project" tıkla

2. **GitHub repository'ni seç:**
   - GitHub repo'ların listelenir
   - "the-bellus-sapanca" (veya oluşturduğun isim) repository'sini bul
   - "Import" tıkla

3. **Proje ayarlarını yap:**
   - **Framework Preset:** Next.js (otomatik algılanır)
   - **Root Directory:** `./` (değiştirme)
   - **Build Command:** `npm run build` (otomatik)
   - **Output Directory:** `.next` (otomatik)
   - **Install Command:** `npm install` (otomatik)

4. **Deploy et:**
   - "Deploy" butonuna tıkla
   - 1-2 dakika bekle
   - ✅ Deploy tamamlandı!

5. **Test et:**
   - Vercel otomatik olarak bir URL verir (örn: `the-bellus-sapanca.vercel.app`)
   - Bu URL'e tıkla, site canlıda!

### Adım 4: Kendi Domain'ini Bağla (ÜCRETSİZ!)

1. **Vercel dashboard'da projeni aç:**
   - Deploy edilen projeye tıkla
   - Üst menüden "Settings" → "Domains" tıkla

2. **Domain ekle:**
   - Domain kutusuna domain'ini yaz (örn: `thebellussapanca.com`)
   - "Add" tıkla

3. **DNS Ayarları:**
   - Vercel sana DNS kayıtlarını gösterir, örneğin:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Domain sağlayıcında DNS ayarlarını yap:**
   
   **Eğer Namecheap, GoDaddy, vb. kullanıyorsan:**
   
   - Domain sağlayıcının DNS ayarlarına git
   - Vercel'in verdiği A ve CNAME kayıtlarını ekle
   - Değişiklikler 5-60 dakika içinde yayılır (DNS propagation)
   
   **Eğer Cloudflare kullanıyorsan (önerilen - ücretsiz):**
   - Cloudflare'e domain'ini ekle
   - Cloudflare DNS'te Vercel'in verdiği kayıtları ekle
   - Daha hızlı yayılır

5. **Bekle ve test et:**
   - DNS yayılması 5-60 dakika sürebilir
   - Vercel otomatik olarak SSL sertifikası verir (HTTPS)
   - Domain hazır olduğunda ✅ yeşil işaret görünür

## 📋 Alternatif: Netlify (Ücretsiz)

Eğer Vercel'i kullanmak istemezsen:

1. **Netlify hesabı oluştur:**
   - https://netlify.com
   - GitHub ile giriş yap

2. **GitHub'dan deploy et:**
   - "Add new site" → "Import an existing project"
   - GitHub repo'yu seç
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - "Deploy site" tıkla

3. **Custom domain ekle:**
   - Site ayarları → Domain management
   - "Add custom domain" tıkla
   - DNS kayıtlarını ekle

## 🔒 SSL/HTTPS Sertifikası

✅ **Otomatik ve ÜCRETSİZ!**
- Vercel ve Netlify otomatik olarak SSL sertifikası verir
- HTTPS zorunlu ve otomatik aktif olur
- Herhangi bir ek işlem gerekmez

## 💡 İpuçları

1. **Her push otomatik deploy:**
   - GitHub'a kod push ettiğinde otomatik deploy olur
   - Production URL otomatik güncellenir

2. **Preview deployments:**
   - Her pull request için preview URL oluşturulur
   - Test edip sonra merge edebilirsin

3. **Environment Variables:**
   - Eğer `.env.local` kullanıyorsan:
   - Vercel → Settings → Environment Variables
   - Orada ekleyebilirsin

4. **Analytics (Opsiyonel):**
   - Vercel Analytics ücretsiz planında sınırlı
   - Google Analytics ekleyebilirsin (opsiyonel)

## 🐛 Sorun Giderme

**Domain yüklenmiyorsa:**
1. DNS kayıtlarının doğru eklendiğinden emin ol
2. DNS propagation kontrol et: https://dnschecker.org
3. 24-48 saat bekle (bazen uzun sürebilir)

**Build hatası:**
1. Vercel build loglarını kontrol et
2. `npm run build` komutunu local'de test et
3. Hataları düzelt ve tekrar push et

**Görseller görünmüyorsa:**
1. `public/images/` klasörünün GitHub'a yüklendiğinden emin ol
2. `.gitignore` dosyasında `public/` engellenmiş olmamalı

## ✅ Sonuç

- ✅ **Ücretsiz hosting** (Vercel/Netlify)
- ✅ **Ücretsiz SSL** (HTTPS)
- ✅ **Kendi domain'in** ile çalışır
- ✅ **Otomatik deploy** (her push'ta)
- ✅ **Hızlı CDN** (dünya çapında hızlı)
- ✅ **Sınırsız bandwidth** (ücretsiz planda bile)

**Tahmini süre:** İlk deploy 5 dakika, domain bağlama 15-30 dakika (DNS propagation dahil)

Herhangi bir adımda takıldığın yerde söyle, yardımcı olayım!
