# SEO Improvements untuk Website SEIIKI

## Ringkasan Perubahan

Website SEIIKI telah dioptimalkan untuk meningkatkan SEO (Search Engine Optimization) agar tampil lebih baik di hasil pencarian Google dan search engine lainnya.

## Masalah yang Diperbaiki

**Sebelum:**
- Search engine menampilkan teks generik seperti "Logo. PT. SOLUSI ENERGI KELISTRIKAN INDONESIA. Email address. Password. Sign in."
- Meta description tidak optimal
- Structured data (Schema.org) tidak lengkap
- Robots.txt tidak ter-generate otomatis

**Sesudah:**
- Meta description yang informatif dan menarik
- Structured data lengkap (Organization, BreadcrumbList, Service, ContactPage, WebSite)
- Robots.txt ter-generate otomatis dengan konfigurasi optimal
- Canonical URLs untuk mencegah duplicate content
- Open Graph tags untuk social media sharing

## Perubahan Detail

### 1. SEO Utility Functions (`src/lib/seo.ts`)

Dibuat file utility untuk mengelola SEO secara konsisten:

**Fitur:**
- `generateMetadata()` - Generate metadata lengkap untuk setiap halaman
- `generateOrganizationSchema()` - Schema untuk informasi perusahaan
- `generateBreadcrumbSchema()` - Schema untuk breadcrumb navigation
- `generateServiceSchema()` - Schema untuk layanan
- `generateFAQSchema()` - Schema untuk FAQ (siap digunakan)
- `siteConfig` - Konfigurasi website terpusat

### 2. Metadata Improvements

Setiap halaman sekarang memiliki metadata lengkap:

#### Halaman Utama (/)
- Title: "SEIIKI - PT. Solusi Energi Kelistrikan Indonesia | Sertifikat Laik Operasi"
- Description: Deskripsi lengkap tentang layanan SLO
- Keywords: 10+ kata kunci relevan
- Structured data: Organization, Website, Breadcrumb

#### Halaman Profil
- **Tentang Kami** (`/profil/tentang-kami`)
- **Visi Misi** (`/profil/visi-misi`)

#### Halaman SLO
- **Informasi SLO** (`/slo/informasi`)
  - Service schema untuk layanan SLO
  - Breadcrumb schema

#### Halaman Lainnya
- **Kontak** (`/kontak`) - ContactPage schema
- **Karir** (`/karir`)
- **Kantor Area** (`/kantor-area`)

### 3. Structured Data (JSON-LD)

Setiap halaman dilengkapi dengan structured data yang sesuai:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PT. Solusi Energi Kelistrikan Indonesia",
  "alternateName": "SEIIKI",
  "url": "https://seiiki.com",
  ...
}
```

**Manfaat:**
- Rich snippets di Google Search
- Better visibility di search results
- Enhanced social media sharing

### 4. Robots.txt & Sitemap

**Next-sitemap Configuration:**
- Auto-generate robots.txt saat build
- Sitemap dengan prioritas halaman yang disesuaikan
- Exclude admin/dashboard dari indexing
- Support untuk multiple search engine bots (Googlebot, Bingbot)

**Priority Mapping:**
- Homepage: 1.0 (highest)
- Profil & SLO: 0.9
- Kontak: 0.8
- Karir & Kantor Area: 0.7
- Lainnya: 0.5-0.6

### 5. Open Graph & Twitter Cards

Setiap halaman memiliki:
- Open Graph tags untuk Facebook, LinkedIn
- Twitter Card tags untuk Twitter
- Custom images (1200x630px recommended)
- Locale: id_ID untuk Indonesia

## Cara Menggunakan

### Menambah Metadata ke Halaman Baru

```typescript
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Judul Halaman',
  description: 'Deskripsi halaman yang menarik dan informatif',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  canonical: '/path/to/page',
});
```

### Menambah Breadcrumb Schema

```typescript
import { generateBreadcrumbSchema } from '@/lib/seo';

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Profil', url: '/profil' },
  { name: 'Tentang Kami', url: '/profil/tentang-kami' },
]);

// Dalam component:
<Script
  id="breadcrumb-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
```

## Rekomendasi Lanjutan

### 1. Buat Open Graph Image

Buat gambar khusus untuk social sharing (1200x630px):
- Logo SEIIKI
- Tagline: "Sertifikat Laik Operasi Terpercaya"
- Background profesional
- Simpan sebagai `/public/og-image.png`

### 2. Google Search Console

1. Daftarkan website di [Google Search Console](https://search.google.com/search-console)
2. Verifikasi kepemilikan (sudah ada meta tag: `Rv9QZvwHuzyTgfaQJxQ8OHVGWQASV_jlFAVey7XWymY`)
3. Submit sitemap: `https://seiiki.com/sitemap.xml`
4. Monitor performance dan fix issues

### 3. Google Business Profile

Daftarkan perusahaan di Google Business Profile untuk:
- Muncul di Google Maps
- Local SEO
- Customer reviews
- Business information

### 4. Content Optimization

**Best Practices:**
- Gunakan H1 tag untuk judul utama (sudah diterapkan)
- Gunakan H2-H6 untuk sub-heading
- Alt text untuk semua gambar
- Internal linking antar halaman
- Content minimal 300 kata per halaman

### 5. Performance Optimization

- Optimize images (WebP format)
- Enable caching
- Minify CSS/JS (sudah otomatis di Next.js)
- Use CDN untuk static assets

### 6. Mobile Optimization

- Responsive design (sudah diterapkan)
- Mobile-friendly navigation
- Fast loading time
- Touch-friendly buttons

### 7. Analytics

Install Google Analytics 4:
```typescript
// Di layout.tsx atau _app.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

## Testing SEO

### Tools untuk Testing:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test structured data

2. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Test performance & SEO

3. **Meta Tags Checker**
   - URL: https://metatags.io/
   - Preview social media cards

4. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Validate JSON-LD

## Build & Deploy

Setelah perubahan, jalankan:

```bash
# Build website
npm run build

# Ini akan otomatis generate:
# - /public/sitemap.xml
# - /public/robots.txt
```

## Monitoring

**Metrics to Track:**
- Organic traffic (Google Analytics)
- Search rankings (Google Search Console)
- Click-through rate (CTR)
- Bounce rate
- Page load speed
- Mobile usability

## Checklist SEO

- ✅ Meta titles (50-60 karakter)
- ✅ Meta descriptions (150-160 karakter)
- ✅ Keywords research & implementation
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)
- ✅ Robots.txt
- ✅ Sitemap.xml
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Mobile responsive
- ✅ Fast loading
- ⚠️ Open Graph image (perlu dibuat)
- ⚠️ Google Search Console (perlu setup)
- ⚠️ Google Analytics (perlu install)
- ⚠️ Google Business Profile (perlu daftar)

## Support

Untuk pertanyaan atau bantuan lebih lanjut tentang SEO, hubungi tim development.

---

**Last Updated:** 2025-01-24
**Version:** 1.0
