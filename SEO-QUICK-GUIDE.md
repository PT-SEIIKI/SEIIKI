# Panduan Cepat SEO - SEIIKI

## 🎯 Tujuan
Memastikan website SEIIKI muncul dengan baik di hasil pencarian Google dengan meta description yang informatif, bukan teks acak seperti "Logo. Email address. Password."

## ✅ Yang Sudah Diperbaiki

### 1. Meta Tags Lengkap
Setiap halaman sekarang memiliki:
- **Title** - Judul yang menarik dan SEO-friendly
- **Description** - Deskripsi yang menjelaskan isi halaman
- **Keywords** - Kata kunci yang relevan
- **Canonical URL** - URL resmi untuk mencegah duplikasi

### 2. Structured Data (Schema.org)
Data terstruktur yang membantu Google memahami konten:
- Organization schema (info perusahaan)
- Breadcrumb schema (navigasi)
- Service schema (layanan SLO)
- ContactPage schema (halaman kontak)

### 3. Robots.txt & Sitemap
- Robots.txt otomatis ter-generate
- Sitemap dengan prioritas halaman
- Exclude admin area dari search engine

## 🚀 Cara Menambah SEO ke Halaman Baru

### Template Dasar

```typescript
import { Metadata } from 'next';
import { generateMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import Script from 'next/script';

// 1. Export metadata
export const metadata: Metadata = generateMetadata({
  title: 'Judul Halaman Anda',
  description: 'Deskripsi halaman yang menarik (150-160 karakter)',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  canonical: '/path/halaman',
});

// 2. Dalam component
export default function HalamanAnda() {
  // Buat breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'Kategori', url: '/kategori' },
    { name: 'Halaman Ini', url: '/kategori/halaman-ini' },
  ]);

  return (
    <>
      {/* 3. Tambahkan structured data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(breadcrumbSchema) 
        }}
      />
      
      {/* Konten halaman */}
      <div>
        <h1>Judul Halaman</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

## 📝 Best Practices

### Title Tags
- **Panjang:** 50-60 karakter
- **Format:** "Judul Halaman | SEIIKI"
- **Contoh:** "Informasi SLO | SEIIKI"

### Meta Description
- **Panjang:** 150-160 karakter
- **Isi:** Ringkasan menarik tentang halaman
- **Include:** Kata kunci utama
- **Contoh:** "Informasi lengkap mengenai Sertifikat Laik Operasi (SLO), persyaratan dokumen, dan alur penerbitan. Melayani seluruh Indonesia."

### Keywords
- **Jumlah:** 5-10 keywords
- **Relevan:** Sesuai dengan isi halaman
- **Variasi:** Gunakan sinonim dan long-tail keywords
- **Contoh:** ['SLO', 'Sertifikat Laik Operasi', 'Instalasi Listrik']

## 🔍 Testing SEO

### 1. Preview di Google
Gunakan: https://metatags.io/
- Paste URL halaman
- Lihat preview Google Search
- Lihat preview Facebook/Twitter

### 2. Test Structured Data
Gunakan: https://search.google.com/test/rich-results
- Paste URL atau code
- Fix errors jika ada

### 3. Check Performance
Gunakan: https://pagespeed.web.dev/
- Test mobile & desktop
- Target score: 90+

## 📊 Prioritas Halaman

| Halaman | Priority | Changefreq |
|---------|----------|------------|
| Homepage | 1.0 | daily |
| Profil/Tentang | 0.9 | weekly |
| SLO Info | 0.9 | weekly |
| Kontak | 0.8 | weekly |
| Karir | 0.7 | weekly |
| Lainnya | 0.5-0.6 | weekly |

## 🖼️ Open Graph Image

**Rekomendasi:**
- Size: 1200x630px
- Format: PNG atau JPG
- Include: Logo + Tagline
- Lokasi: `/public/og-image.png`

**Update di `src/lib/seo.ts`:**
```typescript
ogImage: '/og-image.png',
```

## 🛠️ Tools yang Digunakan

1. **next-sitemap** - Generate sitemap & robots.txt
2. **Next.js Metadata API** - Built-in SEO support
3. **Schema.org JSON-LD** - Structured data

## 📱 Next Steps

### Segera:
1. ✅ Buat Open Graph image (1200x630px)
2. ✅ Daftar Google Search Console
3. ✅ Submit sitemap.xml
4. ✅ Install Google Analytics

### Jangka Panjang:
1. Content marketing (blog posts)
2. Backlink building
3. Local SEO optimization
4. Regular content updates

## 🆘 Troubleshooting

### "Meta description tidak muncul"
- Tunggu 1-2 minggu untuk Google re-crawl
- Submit URL di Google Search Console
- Request indexing

### "Structured data error"
- Test di https://validator.schema.org/
- Check syntax JSON-LD
- Pastikan semua required fields ada

### "Sitemap tidak ter-generate"
- Run `npm run build`
- Check `/public/sitemap.xml`
- Verify `next-sitemap.config.js`

## 📞 Kontak

Untuk bantuan SEO lebih lanjut, hubungi tim development.

---

**Quick Reference Version 1.0**
