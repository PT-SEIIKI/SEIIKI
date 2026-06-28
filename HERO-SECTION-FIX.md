# Solusi Masalah Hero Section Gambar Tidak Muncul di VPS

## Masalah
Gambar hero section tidak muncul saat di-deploy di VPS, hanya menampilkan latar abu-abu. Namun berjalan normal di localhost.

## Penyebab Utama
1. **Static files tidak tercopy dengan benar** saat build untuk production
2. **Path gambar tidak sesuai** antara development dan production
3. **Next.js standalone build** memperlakukan static files berbeda

## Solusi yang Telah Diimplementasikan

### 1. Konfigurasi Next.js (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // Untuk VPS deployment
  images: {
    unoptimized: true,
    domains: ['localhost'],
    // ... remotePatterns tetap sama
  },
  // ... konfigurasi lainnya
};
```

### 2. Error Handling & Debugging di Hero Section
- Added `getImageUrl()` function untuk fix path issues
- Added `handleImageError()` untuk fallback ke default image
- Added console logging untuk debugging
- Hidden img elements untuk detect image loading errors

### 3. Path Fixing Logic
```typescript
const getImageUrl = (slide: HeroSlide) => {
  let imageUrl = slide.imageUrl;
  
  // Fix common path issues in production
  if (imageUrl.startsWith('/public/')) {
    imageUrl = imageUrl.replace('/public/', '/');
  }
  
  // Ensure image starts with /
  if (!imageUrl.startsWith('/')) {
    imageUrl = '/' + imageUrl;
  }
  
  return imageUrl;
};
```

## Cara Deployment di VPS

### Option 1: Menggunakan Script Deployment
```bash
# 1. Run deployment script
chmod +x deploy.sh
./deploy.sh

# 2. Start server
node start-server.js
```

### Option 2: Manual Deployment
```bash
# 1. Build aplikasi
npm run build

# 2. Copy public folder ke build output
cp -r public .next/

# 3. Start production server
npm start
```

## Verifikasi

### 1. Check Image Files
```bash
node scripts/check-images.js
```

### 2. Check Browser Console
Buka website di VPS dan lihat console untuk:
- "Fetching data from API..."
- "Hero slides response status: 200"
- "Using image URL: /header-1.jpg"
- Error messages jika gambar gagal load

### 3. Network Tab
Check Network tab di browser:
- Pastikan request ke `/header-1.jpg` (atau gambar lain) status 200
- Jika 404, berarti file tidak ditemukan di server

## Troubleshooting

### Jika Gambar Masih Tidak Muncul:
1. **Check file permissions**: `chmod 644 public/*.jpg`
2. **Verify build output**: `ls -la .next/public/`
3. **Check server logs**: Error messages di console
4. **Test direct access**: `http://your-vps-ip:3000/header-1.jpg`

### Jika API Error:
1. **Check database connection**: Pastikan Prisma terkoneksi
2. **Verify API endpoint**: `curl http://your-vps-ip:3000/api/admin/hero-slides`
3. **Check environment variables**: Database URL, dll.

## Best Practices untuk VPS Deployment

1. **Always use `output: 'standalone'`** untuk VPS
2. **Copy public folder manually** setelah build
3. **Use environment variables** untuk production config
4. **Enable error logging** untuk debugging
5. **Test build locally** sebelum deploy ke VPS

## Catatan Penting
- Pastikan semua gambar ada di folder `public/` sebelum build
- Check size file gambar (terlalu besar bisa menyebabkan timeout)
- Gunakan `unoptimized: true` jika tidak perlu image optimization
- Monitor console logs di production untuk error tracking
