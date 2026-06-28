import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminEmail = 'admin@seiiki.co.id';
  const adminPassword = 'admin123'; // Change this in production

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin user created:', admin.email);
  } else {
    console.log('✅ Admin user already exists:', existingAdmin.email);
  }

  // Create some sample data
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
        {
          type: 'PHONE',
          label: 'Telepon Kantor Pusat',
          value: '+62 21 1234 5678',
          icon: 'Phone',
          order: 1,
        },
        {
          type: 'EMAIL',
          label: 'Email Resmi',
          value: 'info@seiiki.co.id',
          icon: 'Mail',
          order: 2,
        },
        {
          type: 'ADDRESS',
          label: 'Alamat Kantor Pusat',
          value: 'Jl. Kepodang Gg. Asri No. 10, Gunung Agung, Langkapura, Kota Bandar Lampung, Provinsi Lampung',
          icon: 'MapPin',
          order: 3,
        },
      ],
    });
    console.log('✅ Contact info created');
  }

  console.log('🎉 Database seeded successfully!');
  console.log(`👤 Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });