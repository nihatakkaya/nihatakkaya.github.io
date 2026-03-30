# Güvenlik Denetimi Raporu

**Proje:** PortfolyoWebsite (Next.js 14 App Router)  
**Tarih:** 01 Mart 2026  
**Denetim Kapsamı:** Tüm kaynak dosyalar (`src/`, `next.config.mjs`, `package.json`, `tailwind.config.ts`)  
**Denetim Türü:** Statik Kod Analizi (White-box)

---

## Özet

| Seviye | Bulgu Sayısı |
|--------|-------------|
| Yüksek | 0 |
| Orta | 4 |
| Düşük | 4 |
| Bilgilendirme | 5 |

---

## [ORTA] Bulgular

### 1. `dangerouslyAllowSVG` Etkin — SVG Tabanlı Saldırı Yüzeyi

**Dosya:** `next.config.mjs:4`

```js
images: {
  dangerouslyAllowSVG: true,
  contentDispositionType: "attachment",
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

**Risk:** Next.js'in Image Optimization API'si üzerinden SVG dosyaları sunulmasına izin verilmiş. SVG dosyaları gömülü JavaScript (`<script>`, `onload`, `onclick` vb.) içerebilir. Her ne kadar `sandbox` ve `script-src 'none'` ile kısıtlama yapılmış olsa da, bu CSP yalnızca optimize edilmiş image endpoint'i (`/_next/image`) için geçerlidir ve tüm tarayıcılarda aynı şekilde uygulanmayabilir.

**Öneri:**
- SVG kullanımı zorunlu değilse `dangerouslyAllowSVG: false` yapılmalı.
- SVG dosyaları React bileşeni olarak import edilmeli veya inline SVG kullanılmalı (zaten `SkillBar.tsx` bileşeninde bu doğru şekilde yapılıyor).

---

### 2. Güvenlik Başlıkları (Security Headers) Eksik

**Dosya:** `next.config.mjs`

Uygulama için hiçbir HTTP güvenlik başlığı tanımlanmamış. Eksik başlıklar:

| Başlık | Açıklama |
|--------|----------|
| `Strict-Transport-Security` | HTTPS zorunluluğu (HSTS) |
| `X-Content-Type-Options` | MIME sniffing koruması |
| `X-Frame-Options` | Clickjacking koruması |
| `Content-Security-Policy` | XSS ve injection koruması (sayfa düzeyinde) |
| `Referrer-Policy` | Referrer bilgisi sızıntı kontrolü |
| `Permissions-Policy` | Tarayıcı API erişim kısıtlaması |
| `X-DNS-Prefetch-Control` | DNS prefetch kontrolü |

**Öneri:** `next.config.mjs` dosyasına `headers()` fonksiyonu eklenmeli:

```js
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.github.com;"
        },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    },
  ];
}
```

---

### 3. GlowButton Bileşeninde `target` ve `rel` Eksikliği

**Dosya:** `src/components/GlowButton.tsx:31-41`

```tsx
const Component = href ? "a" : "button";

return (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  </motion.div>
);
```

**Risk:** `href` verildiğinde bir `<a>` etiketi oluşturuluyor fakat `target="_blank"` ve `rel="noopener noreferrer"` özellikleri eklenmiyor. Bu bileşen `HeroSection.tsx` içinde CV indirme bağlantısı (`/cv.pdf`) için kullanılıyor. Şu an aynı origin'e işaret ettiği için doğrudan bir risk oluşturmuyor ancak ileride dışarıya yönlendirme eklenirse **reverse tabnabbing** açığına yol açabilir.

**Öneri:** Dış bağlantılar için `target="_blank"` ve `rel="noopener noreferrer"` otomatik eklenmeli:

```tsx
<Component
  href={href}
  target={href?.startsWith("http") ? "_blank" : undefined}
  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
  onClick={onClick}
  className={...}
>
```

---

### 4. `.env` Dosyası `.gitignore` Kapsamında Değil

**Dosya:** `.gitignore:29`

```
.env*.local
```

**Risk:** Yalnızca `.env*.local` kalıbı gitignore'da tanımlı. `.env`, `.env.production`, `.env.development` gibi dosyalar git tarafından izlenecek ve commit edilebilir. Eğer bu dosyalara API anahtarı veya gizli bilgi yazılırsa versiyon kontrolüne dahil olur.

**Öneri:**

```gitignore
.env
.env.*
.env*.local
```

---

## [DÜŞÜK] Bulgular

### 5. GitHub API — Kimlik Doğrulamasız İstek ve Rate Limit

**Dosya:** `src/sections/PortfolioSection.tsx:163-164`

```tsx
const res = await fetch(
  "https://api.github.com/users/nihatakkaya/repos?sort=updated&per_page=30"
);
```

**Risk:**
- GitHub API'ye kimlik doğrulamasız (unauthenticated) istek yapılıyor.
- Unauthenticated istekler IP başına saatte 60 istek ile sınırlıdır.
- Yüksek trafikli bir sitede veya aynı IP arkasındaki kullanıcılar (NAT/proxy) için API limitleri hızla tükenebilir.
- Rate limit aşıldığında kullanıcıya hata gösterilir; bu bir **Denial of Service** vektörü olarak kullanılabilir (saldırgan IP'den 60 istek yaparak sayfanın repolar bölümünü devre dışı bırakabilir).

**Öneri:**
- Rate limit aşım durumunu özel olarak ele alın (HTTP 403 + `X-RateLimit-Remaining` header kontrolü).
- Sonuçları tarayıcıda cache'leyin (`localStorage` veya `sessionStorage`).
- Veya Next.js API Route / ISR (Incremental Static Regeneration) ile sunucu tarafında cache yapın.

---

### 6. Dış Kaynaklı Verinin Doğrudan Render Edilmesi

**Dosya:** `src/sections/PortfolioSection.tsx:72-74, 94-99`

```tsx
<h3 className="...">{repo.name}</h3>
```

```tsx
{repo.topics.slice(0, 2).map((topic) => (
  <span key={topic} className="...">{topic}</span>
))}
```

**Risk:** GitHub API'den gelen `name` ve `topics` verileri doğrudan JSX içinde render ediliyor. React, JSX içinde otomatik escaping yaptığı için doğrudan XSS riski düşüktür. Ancak:
- API yanıtı manipüle edilirse (MITM saldırısı, DNS poisoning) beklenmedik içerik gösterilebilir.
- `repo.name` gibi veriler uzun veya özel karakterli olabilir, bu da UI bozulmasına yol açabilir.

**Öneri:**
- Gösterilecek verileri uzunluk ve karakter açısından sanitize edin.
- API yanıtını bir şema ile doğrulayın (örn. Zod ile runtime validation).

---

### 7. Bağımlılık Sürüm Aralıkları — Caret (^) Kullanımı

**Dosya:** `package.json`

```json
"next": "^14.2.35",
"react": "^18",
"framer-motion": "^12.34.3",
"sharp": "^0.34.5"
```

**Risk:** Tüm bağımlılıklar `^` (caret) ile tanımlanmış. Bu, otomatik minor/patch güncellemelerini kabul eder. Bir bağımlılığa enjekte edilen kötü amaçlı kod (`supply chain attack`) otomatik olarak projeye dahil olabilir.

**Öneri:**
- `package-lock.json` dosyasının versiyon kontrolüne dahil edildiğinden emin olun (zaten mevcut).
- Bağımlılıkları düzenli olarak `npm audit` ile kontrol edin.
- CI/CD pipeline'ında `npm ci` kullanarak lock dosyasına bağlı kalın.
- Kritik bağımlılıklar için tam sürüm pinleme düşünülebilir.

---

### 8. Kişisel Bilgi İfşası (Information Disclosure)

**Dosyalar:** Birden fazla dosya

Kaynak kodda aşağıdaki kişisel bilgiler açık metin olarak bulunmaktadır:

| Bilgi | Konum |
|-------|-------|
| Ad-Soyad: `Nihat Akkaya` | `layout.tsx` (meta keywords), `i18n.tsx`, `SkillsVisual.tsx` |
| E-posta: `nihatakky@gmail.com` | `ContactSection.tsx:25` |
| GitHub: `nihatakkaya` | `PortfolioSection.tsx:121`, `ContactSection.tsx:11` |
| LinkedIn: `linkedin.com/in/nihatakkayaa` | `ContactSection.tsx:18` |
| Üniversite ve bölüm bilgisi | `i18n.tsx`, `data.ts` |

**Risk:** Portföy sitesi olduğu için bunlar bilerek paylaşılmış bilgilerdir. Ancak:
- E-posta adresi botlar tarafından taranarak spam listelerine eklenebilir.
- Sosyal mühendislik saldırıları için kullanılabilir.

**Öneri:**
- E-posta adresini obfuscate edin (örn. `mailto:` yerine JavaScript ile oluşturun, veya bir kontakt formu kullanın).
- OSINT farkındalığı: Bu bilgiler birleştirildiğinde hedefli saldırılara zemin hazırlayabilir.

---

## [BİLGİLENDİRME] Bulgular

### 9. Tüm Sayfa Client-Side Render Ediliyor

**Dosya:** `src/app/page.tsx:1`

```tsx
"use client";
```

**Açıklama:** Ana sayfa `"use client"` direktifi ile tamamen istemci tarafında render ediliyor. Bu, Next.js'in sunucu tarafı render (SSR) avantajlarını devre dışı bırakır. SEO meta verileri `layout.tsx` dosyasında sunucu tarafında oluşturulsa da, sayfa içeriğinin indekslenmesi arama motoru botlarına bağlıdır.

**Güvenlik Etkisi:** Doğrudan bir güvenlik riski oluşturmaz ancak sunucu tarafında veri doğrulama veya filtreleme yapılamaması anlamına gelir.

---

### 10. CV Dosyası Erişim Kontrolsüz Sunuluyor

**Dosya:** `src/sections/HeroSection.tsx:97`

```tsx
<GlowButton variant="secondary" href="/cv.pdf">
```

**Açıklama:** CV dosyası `public/cv.pdf` olarak herkese açık sunuluyor. Erişim kontrolü, indirme sayısı takibi veya bot koruması bulunmuyor.

**Öneri:** CV indirmelerini izlemek istiyorsanız, Next.js API Route üzerinden yönlendirme yapıp analytics ekleyebilirsiniz.

---

### 11. Eksik Statik Dosyalar

**Dosyalar:**
- `src/app/fonts/GeistVF.woff` — mevcut değil
- `src/app/fonts/GeistMonoVF.woff` — mevcut değil
- `public/images/profile.png` — mevcut değil
- `public/images/market-otomasyonu.png` — mevcut değil
- `public/images/sehir-tanitimi.png` — mevcut değil
- `public/images/maze-game.png` — mevcut değil
- `public/cv.pdf` — mevcut değil

**Açıklama:** Kaynak kodda referans verilen birçok statik dosya projede bulunmuyor. Bunlar muhtemelen `.gitignore` ile hariç tutulmuş veya henüz eklenmemiş. Build zamanında veya runtime'da hata oluşabilir.

---

### 12. Canvas Particle Sistemi — Performans Tabanlı DoS

**Dosya:** `src/components/AnimatedBackground.tsx:62-75`

```tsx
particles.forEach((p, i) => {
  // ...
  particles.slice(i + 1).forEach((p2) => {
    const dx = p.x - p2.x;
    const dy = p.y - p2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160) { /* draw line */ }
  });
});
```

**Açıklama:** Particle sistemi O(n²) karmaşıklığında çalışıyor (60 parçacık = ~1770 mesafe hesabı/frame). Düşük performanslı cihazlarda (eski telefonlar, tabletler) aşırı CPU kullanımı, pil tüketimi ve UI donmalarına yol açabilir. Bu bir saldırgan tarafından doğrudan exploit edilemez, ancak kullanıcı deneyimini olumsuz etkiler.

**Öneri:**
- `prefers-reduced-motion` medya sorgusuna saygı gösterin.
- Düşük performanslı cihazlarda particle sayısını azaltın veya animasyonu devre dışı bırakın.

---

### 13. `robots.txt` ve `sitemap.xml` Eksik

**Dosya:** `src/app/layout.tsx:39-42`

```tsx
robots: {
  index: true,
  follow: true,
}
```

**Açıklama:** Meta etiketleri ile indeksleme izni verilmiş, ancak `public/robots.txt` ve `sitemap.xml` dosyaları mevcut değil. Hassas URL'lerin (varsa) arama motorlarından gizlenmesi kontrol edilemiyor.

---

## Olumlu Bulgular (Doğru Yapılanlar)

| Uygulama | Konum |
|----------|-------|
| `rel="noopener noreferrer"` dış bağlantılarda kullanılmış | `PortfolioSection.tsx`, `ContactSection.tsx` |
| `dangerouslySetInnerHTML` hiçbir yerde kullanılmamış | Tüm dosyalar |
| Kullanıcıdan girdi alınmıyor (form, input yok) | Tüm dosyalar |
| Cookie, session, authentication mekanizması yok | Tüm dosyalar |
| API anahtarı veya gizli bilgi kaynak kodda yok | Tüm dosyalar |
| SVG logolar inline olarak güvenli şekilde render ediliyor | `SkillBar.tsx` |
| `package-lock.json` mevcut | Kök dizin |
| TypeScript kullanımı tip güvenliği sağlıyor | Tüm `.tsx`/`.ts` dosyaları |
| `.env*.local` gitignore'da | `.gitignore` |
| Canvas `pointer-events-none` ile etkileşime kapalı | `AnimatedBackground.tsx` |

---

## Genel Değerlendirme

Bu proje statik bir portfolyo sitesidir. Sunucu tarafı işlemi, veritabanı bağlantısı, kullanıcı girişi veya kimlik doğrulama mekanizması bulunmamaktadır. Bu nedenle genel saldırı yüzeyi oldukça dardır.

En kritik iyileştirmeler:
1. **HTTP güvenlik başlıklarının eklenmesi** (Bulgu #2)
2. **`dangerouslyAllowSVG` özelliğinin kapatılması** (Bulgu #1)
3. **`.env` dosyasının `.gitignore`'a eklenmesi** (Bulgu #4)
4. **E-posta adresi obfuscation** (Bulgu #8)

Bu dört iyileştirme yapıldığında site, statik bir portfolyo sitesi için makul bir güvenlik seviyesine ulaşmış olacaktır.
