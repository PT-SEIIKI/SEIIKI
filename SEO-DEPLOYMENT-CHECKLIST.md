# SEO Deployment Checklist - SEIIKI

## ✅ Pre-Deployment (Sudah Selesai)

- [x] Buat SEO utility functions (`src/lib/seo.ts`)
- [x] Update root layout dengan metadata lengkap
- [x] Tambah metadata ke semua halaman utama:
  - [x] Homepage (/)
  - [x] Tentang Kami (/profil/tentang-kami)
  - [x] Visi Misi (/profil/visi-misi)
  - [x] Informasi SLO (/slo/informasi)
  - [x] Kontak (/kontak)
  - [x] Karir (/karir)
  - [x] Kantor Area (/kantor-area)
- [x] Tambah structured data (JSON-LD):
  - [x] Organization schema
  - [x] Breadcrumb schema
  - [x] Service schema
  - [x] ContactPage schema
  - [x] Website schema
- [x] Update next-sitemap.config.js
- [x] Enable robots.txt generation

## 🚀 Deployment Steps

### 1. Build & Test Locally

```bash
# Install dependencies (jika belum)
npm install

# Build project
npm run build

# Test build locally
npm run start
```

**Verify:**
- [ ] Build berhasil tanpa error
- [ ] Sitemap ter-generate di `/public/sitemap.xml`
- [ ] Robots.txt ter-generate di `/public/robots.txt`
- [ ] Website berjalan normal di localhost

### 2. Test SEO Elements

**Manual Check:**
- [ ] Buka setiap halaman
- [ ] View page source (Ctrl+U)
- [ ] Verify meta tags ada di `<head>`
- [ ] Verify structured data (JSON-LD scripts)

**Automated Testing:**
```bash
# Test dengan tools online:
```
- [ ] https://metatags.io/ - Preview meta tags
- [ ] https://search.google.com/test/rich-results - Test structured data
- [ ] https://validator.schema.org/ - Validate JSON-LD

### 3. Deploy to Production

```bash
# Deploy sesuai platform Anda
# Contoh untuk Vercel:
vercel --prod

# Atau platform lain sesuai setup
```

### 4. Post-Deployment Verification

**Check Live Site:**
- [ ] Visit https://seiiki.com
- [ ] Check https://seiiki.com/sitemap.xml
- [ ] Check https://seiiki.com/robots.txt
- [ ] View source beberapa halaman
- [ ] Test di mobile device

**SEO Tools Testing:**
- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
  - Test URL: https://seiiki.com
  - Verify: Organization schema detected
  - Verify: No errors
  
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
  - Test mobile & desktop
  - Target: Score 90+
  - Fix any critical issues

- [ ] Meta Tags Preview: https://metatags.io/
  - Paste: https://seiiki.com
  - Verify: Title, description, OG image
  - Check: Facebook & Twitter preview

## 📊 Google Search Console Setup

### 1. Verify Ownership

- [ ] Go to: https://search.google.com/search-console
- [ ] Add property: https://seiiki.com
- [ ] Verification method: HTML meta tag
- [ ] Meta tag sudah ada di code: `Rv9QZvwHuzyTgfaQJxQ8OHVGWQASV_jlFAVey7XWymY`
- [ ] Click "Verify"

### 2. Submit Sitemap

- [ ] Di Search Console, pilih "Sitemaps"
- [ ] Submit sitemap URL: `https://seiiki.com/sitemap.xml`
- [ ] Wait for processing (bisa 1-2 hari)

### 3. Request Indexing

- [ ] Di Search Console, pilih "URL Inspection"
- [ ] Test URL: https://seiiki.com
- [ ] Click "Request Indexing"
- [ ] Ulangi untuk halaman penting lainnya

## 📈 Google Analytics Setup (Optional)

### 1. Create GA4 Property

- [ ] Go to: https://analytics.google.com
- [ ] Create new property
- [ ] Get Measurement ID (format: G-XXXXXXXXXX)

### 2. Add to Website

Edit `src/app/layout.tsx`:

```typescript
import Script from 'next/script';

// Di dalam <head> atau setelah <body>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## 🖼️ Create Open Graph Image

### Requirements:
- Size: 1200 x 630 pixels
- Format: PNG or JPG
- Max size: < 1MB

### Content:
- [ ] Logo SEIIKI
- [ ] Tagline: "Sertifikat Laik Operasi Terpercaya"
- [ ] Background profesional
- [ ] High quality

### Save & Update:
- [ ] Save as: `/public/og-image.png`
- [ ] Verify di `src/lib/seo.ts`: `ogImage: '/og-image.png'`
- [ ] Re-build & deploy

## 🔍 Monitoring (Week 1-4)

### Week 1:
- [ ] Check Google Search Console daily
- [ ] Monitor indexing status
- [ ] Fix any crawl errors

### Week 2:
- [ ] Check search appearance
- [ ] Monitor click-through rate (CTR)
- [ ] Verify rich results showing

### Week 3-4:
- [ ] Track organic traffic
- [ ] Monitor keyword rankings
- [ ] Analyze user behavior

## 📱 Social Media Testing

### Facebook:
- [ ] Share link di Facebook
- [ ] Verify preview shows correct:
  - Title
  - Description
  - Image
- [ ] Use debugger: https://developers.facebook.com/tools/debug/

### Twitter:
- [ ] Share link di Twitter
- [ ] Verify Twitter Card shows
- [ ] Use validator: https://cards-dev.twitter.com/validator

### LinkedIn:
- [ ] Share link di LinkedIn
- [ ] Verify preview correct
- [ ] Use inspector: https://www.linkedin.com/post-inspector/

## 🐛 Common Issues & Fixes

### Issue: Meta tags tidak muncul
**Fix:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check view-source
- Wait 24-48 hours for Google

### Issue: Structured data errors
**Fix:**
- Test di https://validator.schema.org/
- Check JSON syntax
- Verify all required fields
- Re-deploy after fix

### Issue: Sitemap tidak ter-generate
**Fix:**
- Check `next-sitemap.config.js`
- Run `npm run build` locally
- Verify `/public/sitemap.xml` exists
- Check build logs for errors

### Issue: Google tidak index halaman
**Fix:**
- Submit di Search Console
- Check robots.txt tidak block
- Verify canonical URLs
- Wait 1-2 weeks

## 📋 Final Checklist

### Technical SEO:
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] Canonical URLs set correctly
- [ ] Structured data valid
- [ ] Sitemap submitted
- [ ] Robots.txt correct
- [ ] Mobile responsive
- [ ] Fast loading (90+ score)

### Content SEO:
- [ ] H1 tags on all pages
- [ ] Proper heading hierarchy (H1-H6)
- [ ] Alt text on images
- [ ] Internal linking
- [ ] Quality content (300+ words)

### Off-Page SEO:
- [ ] Google Search Console verified
- [ ] Google Analytics installed (optional)
- [ ] Google Business Profile created (optional)
- [ ] Social media profiles linked

## 🎯 Success Metrics

**Track these metrics:**
- Organic traffic (Google Analytics)
- Search impressions (Search Console)
- Click-through rate (Search Console)
- Average position (Search Console)
- Page load speed (PageSpeed Insights)
- Mobile usability (Search Console)

**Target (3 months):**
- Organic traffic: +50%
- Average CTR: 3-5%
- Average position: Top 10
- PageSpeed score: 90+

## 📞 Support

Jika ada masalah atau pertanyaan:
1. Check dokumentasi: `SEO-IMPROVEMENTS.md`
2. Check quick guide: `SEO-QUICK-GUIDE.md`
3. Contact tim development

---

**Deployment Checklist Version 1.0**
**Last Updated: 2025-01-24**
