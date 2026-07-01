// Prisma seed script for creating admin user and base content
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function run() {
  // Main admin
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@seiiki.co.id';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`✅ Admin user already exists: ${existingAdmin.email}`);
  }

  // Admin Konsultasi
  const adminKonsultasiEmail = 'admin.konsultasi@seiiki.co.id';
  const existingKonsultasiAdmin = await prisma.user.findUnique({ where: { email: adminKonsultasiEmail } });
  if (!existingKonsultasiAdmin) {
    const hashedPassword = await bcrypt.hash('konsultasi123', 12);
    await prisma.user.create({
      data: {
        email: adminKonsultasiEmail,
        password: hashedPassword,
        name: 'Admin Konsultasi',
        role: 'ADMIN_KONSULTASI',
      },
    });
    console.log(`✅ Admin Konsultasi created: ${adminKonsultasiEmail}`);
  } else {
    console.log(`✅ Admin Konsultasi already exists: ${existingKonsultasiAdmin.email}`);
  }

  // Admin INTEK
  const adminIntekEmail = 'admin.intek@seiiki.co.id';
  const existingIntekAdmin = await prisma.user.findUnique({ where: { email: adminIntekEmail } });
  if (!existingIntekAdmin) {
    const hashedPassword = await bcrypt.hash('intek123', 12);
    await prisma.user.create({
      data: {
        email: adminIntekEmail,
        password: hashedPassword,
        name: 'Admin INTEK',
        role: 'ADMIN_INTEK',
      },
    });
    console.log(`✅ Admin INTEK created: ${adminIntekEmail}`);
  } else {
    console.log(`✅ Admin INTEK already exists: ${existingIntekAdmin.email}`);
  }

  // Seed hero slides
  const heroSlideCount = await prisma.heroSlide.count();
  if (heroSlideCount === 0) {
    await prisma.heroSlide.createMany({
      data: [
        {
          title: 'SEIIKI',
          subtitle: 'AMAN TERPERCAYA',
          description: 'Pusat Layanan Sertifikat Laik Operasi Instalasi Tenaga Listrik',
          imageUrl: '/header-1.jpg',
          buttonText: 'TENTANG KAMI',
          buttonUrl: '/profil/tentang-kami',
          order: 1,
          active: true,
        },
        {
          title: 'Layanan Profesional',
          subtitle: 'SLO Tegangan Rendah & Menengah',
          description: 'Sertifikasi instalasi listrik dengan standar keamanan tertinggi',
          imageUrl: '/header-2.jpg',
          buttonText: 'LAYANAN KAMI',
          buttonUrl: '/slo/informasi',
          order: 2,
          active: true,
        },
        {
          title: 'Lembaga Inspeksi Terakreditasi',
          subtitle: 'Terverifikasi Kementerian ESDM',
          description: 'Mitra terpercaya untuk pengujian dan pemeriksaan instalasi ketenagalistrikan',
          imageUrl: '/header-3.jpg',
          buttonText: 'LEGALITAS KAMI',
          buttonUrl: '/profil/dokumen-perijinan',
          order: 3,
          active: true,
        },
      ],
    });
    console.log('✅ Hero slides created');
  }

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: 'Pembangkit Listrik Tenaga Diesel (PLTD)',
          description: 'Legalitas Pembangkit Listrik Tenaga Diesel. Sertifikasi untuk instalasi PLTD dengan standar keamanan dan operasional tertinggi.',
          icon: 'Zap',
          imageUrl: '/Pembangkit Listrik Tenaga Diesel.png',
          featured: true,
          order: 1,
        },
        {
          title: 'Pembangkit Listrik Tenaga Surya (PLTS)',
          description: 'Legalitas Pembangkit Listrik Tenaga Surya. Layanan sertifikasi untuk instalasi PLTS dengan keandalan dan efisiensi terjamin.',
          icon: 'ShieldCheck',
          imageUrl: '/Pembangkit Listrik Tenaga Surya.png',
          featured: true,
          order: 2,
        },
        {
          title: 'Instalasi Penyediaan Tenaga Listrik Tegangan Menengah (IPTL TM)',
          description: 'Legalitas Instalasi Penyediaan Tenaga Listrik Tegangan Menengah. Sertifikasi untuk instalasi industri dan komersial besar.',
          icon: 'FileText',
          imageUrl: '/Instalasi Pemamfaatan Tenaga Listrik Tegangan Menengah.png',
          featured: true,
          order: 3,
        },
      ],
    });
    console.log('✅ Services created');
  }

  const statisticsCount = await prisma.statistics.count();
  if (statisticsCount === 0) {
    await prisma.statistics.createMany({
      data: [
        { label: 'Tahun Pengalaman', value: '10+', order: 1 },
        { label: 'Sertifikat Diterbitkan', value: '15,000+', order: 2 },
        { label: 'Kantor Wilayah', value: '25', order: 3 },
        { label: 'Kepuasan Pelanggan', value: '99%', order: 4 },
      ],
    });
    console.log('✅ Statistics created');
  }

  const contactInfoCount = await prisma.contactInfo.count();
  if (contactInfoCount === 0) {
    await prisma.contactInfo.createMany({
      data: [
        { type: 'PHONE', label: 'Telepon Kantor Pusat', value: '+62 21 1234 5678', icon: 'Phone', order: 1 },
        { type: 'EMAIL', label: 'Email Resmi', value: 'info@seiiki.co.id', icon: 'Mail', order: 2 },
        { type: 'ADDRESS', label: 'Alamat Kantor Pusat', value: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110', icon: 'MapPin', order: 3 },
      ],
    });
    console.log('✅ Contact info created');
  }

  // Seed default payment methods
  const metodePembayaranCount = await prisma.metodePembayaran.count();
  if (metodePembayaranCount === 0) {
    await prisma.metodePembayaran.createMany({
      data: [
        {
          namaBank: 'Bank BCA',
          nomorRekening: '1234567890',
          namaPemilik: 'PT. Solusi Energi Kelistrikan Indonesia',
          deskripsi: 'Transfer ke rekening BCA atas nama SEIIKI',
          isActive: true,
          order: 1,
        },
        {
          namaBank: 'Bank Mandiri',
          nomorRekening: '0987654321',
          namaPemilik: 'PT. Solusi Energi Kelistrikan Indonesia',
          deskripsi: 'Transfer ke rekening Mandiri atas nama SEIIKI',
          isActive: true,
          order: 2,
        },
      ],
    });
    console.log('✅ Metode pembayaran created');
  }

  // Seed produk
  const produkCount = await prisma.produk.count();
  if (produkCount === 0) {
    await prisma.produk.createMany({
      data: [
        {
          nama: 'Paket SLO Tegangan Rendah (TR) Rumah Tinggal',
          harga: 350000,
          deskripsi: 'Layanan Sertifikat Laik Operasi untuk instalasi listrik tegangan rendah pada rumah tinggal daya 450 VA hingga 5.500 VA. Termasuk pemeriksaan, pengujian, dan penerbitan sertifikat resmi yang diakui Kementerian ESDM.',
          kategori: 'SLO Tegangan Rendah',
          imageUrl: null,
          isActive: true,
          order: 1,
        },
        {
          nama: 'Paket SLO Tegangan Rendah (TR) Bisnis & Komersial',
          harga: 750000,
          deskripsi: 'Layanan Sertifikat Laik Operasi untuk instalasi listrik tegangan rendah pada gedung bisnis, ruko, dan bangunan komersial daya 6.600 VA hingga 197 kVA. Proses cepat dengan tenaga teknik bersertifikat.',
          kategori: 'SLO Tegangan Rendah',
          imageUrl: null,
          isActive: true,
          order: 2,
        },
        {
          nama: 'Paket SLO Tegangan Menengah (TM) Industri',
          harga: 5000000,
          deskripsi: 'Layanan Sertifikat Laik Operasi untuk instalasi tenaga listrik tegangan menengah pada kawasan industri, pabrik, dan fasilitas besar di atas 197 kVA. Ditangani oleh tim inspektor berpengalaman dan terakreditasi.',
          kategori: 'SLO Tegangan Menengah',
          imageUrl: '/Instalasi Pemamfaatan Tenaga Listrik Tegangan Menengah.png',
          isActive: true,
          order: 3,
        },
        {
          nama: 'Sertifikasi PLTD (Pembangkit Listrik Tenaga Diesel)',
          harga: 8500000,
          deskripsi: 'Layanan inspeksi dan sertifikasi legalitas Pembangkit Listrik Tenaga Diesel. Mencakup pemeriksaan instalasi, pengujian kelaikan operasi, dan penerbitan sertifikat resmi sesuai standar Kementerian ESDM.',
          kategori: 'Pembangkit',
          imageUrl: '/Pembangkit Listrik Tenaga Diesel.png',
          isActive: true,
          order: 4,
        },
        {
          nama: 'Sertifikasi PLTS (Pembangkit Listrik Tenaga Surya)',
          harga: 6500000,
          deskripsi: 'Layanan inspeksi dan sertifikasi legalitas Pembangkit Listrik Tenaga Surya (solar panel). Meliputi pemeriksaan sistem PV, inverter, instalasi, dan kelaikan operasi sesuai regulasi yang berlaku.',
          kategori: 'Pembangkit',
          imageUrl: '/Pembangkit Listrik Tenaga Surya.png',
          isActive: true,
          order: 5,
        },
        {
          nama: 'Paket Konsultasi Teknik Kelistrikan',
          harga: 500000,
          deskripsi: 'Layanan konsultasi teknik untuk perencanaan instalasi kelistrikan, pemenuhan persyaratan regulasi, dan pendampingan proses perizinan. Ditangani oleh tenaga ahli kelistrikan berpengalaman.',
          kategori: 'Konsultasi',
          imageUrl: null,
          isActive: true,
          order: 6,
        },
        {
          nama: 'Inspeksi & Audit Instalasi Listrik',
          harga: 1200000,
          deskripsi: 'Layanan audit menyeluruh terhadap instalasi listrik existing untuk menilai kelaikan, keamanan, dan kesesuaian dengan standar SNI dan regulasi Kementerian ESDM. Cocok untuk gedung lama yang belum punya SLO.',
          kategori: 'Inspeksi',
          imageUrl: null,
          isActive: true,
          order: 7,
        },
        {
          nama: 'Perpanjangan & Pembaruan SLO',
          harga: 400000,
          deskripsi: 'Layanan perpanjangan Sertifikat Laik Operasi yang telah habis masa berlakunya. Termasuk pemeriksaan kondisi terkini instalasi listrik dan penerbitan sertifikat baru sesuai ketentuan yang berlaku.',
          kategori: 'SLO Tegangan Rendah',
          imageUrl: null,
          isActive: true,
          order: 8,
        },
      ],
    });
    console.log('✅ Produk created');
  }

  console.log('🎉 Database seeded successfully!');
  console.log(`👤 Admin login: ${adminEmail} / ${adminPassword}`);
  console.log(`👤 Admin Konsultasi: ${adminKonsultasiEmail} / konsultasi123`);
  console.log(`👤 Admin INTEK: ${adminIntekEmail} / intek123`);
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
