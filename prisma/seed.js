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

  // Seed produk elektronik
  const produkCount = await prisma.produk.count();
  if (produkCount === 0) {
    await prisma.produk.createMany({
      data: [
        // --- KABEL ---
        {
          nama: 'Kabel NYM 3x2.5 mm² (Per Meter)',
          harga: 12500,
          deskripsi: 'Kabel listrik NYM 3 inti ukuran 2,5 mm² untuk instalasi daya dalam gedung. Isolasi PVC, tahan terhadap lembab, cocok untuk pemasangan dalam tembok maupun permukaan. Standar SNI.',
          kategori: 'Kabel',
          imageUrl: null,
          isActive: true,
          order: 1,
        },
        {
          nama: 'Kabel NYM 3x4 mm² (Per Meter)',
          harga: 18500,
          deskripsi: 'Kabel listrik NYM 3 inti ukuran 4 mm² untuk instalasi daya beban lebih besar. Isolasi PVC dobel, cocok untuk dapur, AC, dan mesin-mesin listrik rumah tangga. Standar SNI.',
          kategori: 'Kabel',
          imageUrl: null,
          isActive: true,
          order: 2,
        },
        {
          nama: 'Kabel NYY 4x10 mm² (Per Meter)',
          harga: 52000,
          deskripsi: 'Kabel tanah NYY 4 inti 10 mm² untuk instalasi daya bawah tanah maupun udara. Isolasi dan selubung PVC, tahan terhadap kelembaban dan benturan ringan. Cocok untuk distribusi daya industri.',
          kategori: 'Kabel',
          imageUrl: null,
          isActive: true,
          order: 3,
        },
        {
          nama: 'Kabel NYYHY 3x1.5 mm² (Per Meter)',
          harga: 9800,
          deskripsi: 'Kabel fleksibel NYYHY 3 inti 1,5 mm² untuk peralatan rumah tangga, ekstensi, dan instalasi yang memerlukan fleksibilitas tinggi. Isolasi PVC, mudah dibengkokkan.',
          kategori: 'Kabel',
          imageUrl: null,
          isActive: true,
          order: 4,
        },
        {
          nama: 'Kabel BC (Bare Conductor) 50 mm² (Per Meter)',
          harga: 38000,
          deskripsi: 'Kabel tembaga telanjang (Bare Copper) 50 mm² untuk sistem grounding/pembumian instalasi listrik. Konduktivitas tinggi, tahan korosi, sesuai standar PUIL 2011.',
          kategori: 'Kabel',
          imageUrl: null,
          isActive: true,
          order: 5,
        },
        // --- MCB & PROTEKSI ---
        {
          nama: 'MCB 1 Phase 6A – 32A (Schneider / Panasonic)',
          harga: 45000,
          deskripsi: 'Miniature Circuit Breaker (MCB) 1 fasa kapasitas 6A hingga 32A untuk proteksi sirkuit instalasi listrik rumah tinggal dan komersial. Memutus arus otomatis saat terjadi overload atau short circuit.',
          kategori: 'MCB & Proteksi',
          imageUrl: null,
          isActive: true,
          order: 6,
        },
        {
          nama: 'MCB 3 Phase 16A – 63A',
          harga: 185000,
          deskripsi: 'MCB 3 fasa kapasitas 16A–63A untuk panel distribusi industri dan komersial. Proteksi terhadap beban lebih (overload) dan hubung singkat (short circuit) pada sistem 3 fasa.',
          kategori: 'MCB & Proteksi',
          imageUrl: null,
          isActive: true,
          order: 7,
        },
        {
          nama: 'ELCB / RCCB 25A 30mA (Earth Leakage Circuit Breaker)',
          harga: 195000,
          deskripsi: 'Earth Leakage Circuit Breaker (ELCB) / RCCB 25A sensitifitas 30mA untuk proteksi kebocoran arus ke tanah. Wajib dipasang pada instalasi kamar mandi, dapur basah, dan area outdoor.',
          kategori: 'MCB & Proteksi',
          imageUrl: null,
          isActive: true,
          order: 8,
        },
        {
          nama: 'MCCB 3 Phase 100A – 250A',
          harga: 1250000,
          deskripsi: 'Moulded Case Circuit Breaker (MCCB) 3 fasa kapasitas 100A–250A untuk panel utama gedung dan industri. Kapasitas pemutusan arus tinggi, cocok untuk beban besar dan sistem distribusi tegangan menengah.',
          kategori: 'MCB & Proteksi',
          imageUrl: null,
          isActive: true,
          order: 9,
        },
        {
          nama: 'Lightning Arrester / Penangkal Petir',
          harga: 850000,
          deskripsi: 'Surge Arrester untuk proteksi instalasi listrik dari lonjakan tegangan akibat petir. Dipasang pada panel utama atau titik masuk PLN. Kapasitas perlindungan hingga 20kA, standar IEC 61643.',
          kategori: 'MCB & Proteksi',
          imageUrl: null,
          isActive: true,
          order: 10,
        },
        // --- PANEL & AKSESORI ---
        {
          nama: 'Box Panel Listrik (Enclosure) 40x50 cm',
          harga: 320000,
          deskripsi: 'Box panel listrik (electrical enclosure) ukuran 40x50 cm dari bahan plat besi anti karat. Dilengkapi pintu kaca, dudukan DIN rail, dan slot kabel. Cocok untuk panel distribusi rumah dan gedung.',
          kategori: 'Panel & Aksesori',
          imageUrl: null,
          isActive: true,
          order: 11,
        },
        {
          nama: 'Stop Kontak Dinding Grounding (Broco / Panasonic)',
          harga: 32000,
          deskripsi: 'Stop kontak dinding 2P+E dengan grounding untuk keamanan peralatan elektronik sensitif. Arus nominal 16A, tegangan 250V. Tersedia berbagai merek pilihan (Broco, Panasonic, Schneider).',
          kategori: 'Panel & Aksesori',
          imageUrl: null,
          isActive: true,
          order: 12,
        },
        {
          nama: 'Saklar Tunggal / Ganda (Broco / Panasonic)',
          harga: 22000,
          deskripsi: 'Saklar listrik dinding tunggal atau ganda untuk kontrol pencahayaan ruangan. Arus nominal 10A, tegangan 250V AC. Desain modern, mudah dipasang, tersedia dalam berbagai pilihan merek.',
          kategori: 'Panel & Aksesori',
          imageUrl: null,
          isActive: true,
          order: 13,
        },
        {
          nama: 'Klem Kabel / Cable Clamp (Isi 100 pcs)',
          harga: 18000,
          deskripsi: 'Klem/penjepit kabel plastik untuk pemasangan rapi kabel di dinding, plafon, atau permukaan lainnya. Tahan UV dan panas, tersedia ukuran 8mm, 10mm, 16mm. Isi 100 buah per pak.',
          kategori: 'Panel & Aksesori',
          imageUrl: null,
          isActive: true,
          order: 14,
        },
        // --- LAMPU & PENCAHAYAAN ---
        {
          nama: 'Lampu LED Panel 18W (Bulat/Kotak)',
          harga: 65000,
          deskripsi: 'Lampu LED panel 18 Watt untuk pencahayaan plafon gedung, kantor, dan rumah tinggal. Cahaya merata, hemat energi, umur panjang hingga 30.000 jam. Tersedia pilihan cahaya putih (6500K) dan warm white (3000K).',
          kategori: 'Lampu & Pencahayaan',
          imageUrl: null,
          isActive: true,
          order: 15,
        },
        {
          nama: 'Lampu Jalan LED 50W (PJU)',
          harga: 485000,
          deskripsi: 'Lampu Penerangan Jalan Umum (PJU) LED 50 Watt, pengganti lampu sodium/mercury. Efisiensi tinggi 130 lm/W, tahan air IP65, umur panjang hingga 50.000 jam. Cocok untuk jalan perumahan dan area industri.',
          kategori: 'Lampu & Pencahayaan',
          imageUrl: null,
          isActive: true,
          order: 16,
        },
      ],
    });
    console.log('✅ Produk elektronik created');
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
