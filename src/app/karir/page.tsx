import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Briefcase, Clock, ArrowRight, Heart, TrendingUp, Users, GraduationCap, Zap, Coffee, Shield, Star } from 'lucide-react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Karir',
  description: 'Bergabunglah dengan tim SEIIKI. Kami mencari individu berbakat untuk tumbuh bersama dalam misi menjamin keamanan listrik nasional.',
  keywords: ['Karir SEIIKI', 'Lowongan Kerja SEIIKI', 'Inspektur Teknik Listrik', 'Lowongan Kerja Listrik'],
  canonical: '/karir',
});

const jobOpenings = [
  {
    title: 'Inspektur Teknik Listrik (Tegangan Rendah)',
    location: 'Bandar Lampung & Wilayah Lampung',
    type: 'Penuh Waktu',
    level: 'Junior – Senior',
    badge: 'Urgently Hiring',
    badgeColor: 'bg-red-100 text-red-700',
    description: 'Melakukan pemeriksaan dan pengujian instalasi listrik tegangan rendah (rumah tangga, perkantoran, komersial) untuk penerbitan Sertifikat Laik Operasi (SLO).',
    requirements: [
      'D3/S1 Teknik Elektro atau bidang terkait',
      'Memiliki Sertifikat Kompetensi Teknik Ketenagalistrikan (Level 3 ke atas)',
      'Berpengalaman min. 1 tahun di bidang instalasi listrik (fresh graduate welcome untuk posisi junior)',
      'Bersedia melakukan perjalanan dinas ke seluruh wilayah kerja',
      'Memiliki SIM A/C aktif',
    ],
  },
  {
    title: 'Inspektur Teknik Listrik (Tegangan Menengah)',
    location: 'Bandar Lampung & Jabodetabek',
    type: 'Penuh Waktu',
    level: 'Senior',
    badge: 'Hot Position',
    badgeColor: 'bg-orange-100 text-orange-700',
    description: 'Melakukan pemeriksaan dan pengujian instalasi tegangan menengah (industri, gardu distribusi, PLTD, PLTS) untuk penerbitan SLO sesuai regulasi Kementerian ESDM.',
    requirements: [
      'S1 Teknik Elektro / Elektroteknik',
      'Sertifikat Kompetensi Level 5 (Asisten Manajer) bidang TM',
      'Pengalaman min. 3 tahun di bidang inspeksi atau operasi sistem ketenagalistrikan TM',
      'Familiar dengan peralatan uji: Megohmmeter, Hipot Tester, Relay Test Set',
      'Memahami PUIL 2011, SPLN, dan standar IEC terkait',
    ],
  },
  {
    title: 'Koordinator Lapangan & Administrasi SLO',
    location: 'Bandar Lampung (HQ)',
    type: 'Penuh Waktu',
    level: 'Middle',
    badge: 'New Opening',
    badgeColor: 'bg-blue-100 text-blue-700',
    description: 'Mengkoordinasikan jadwal inspeksi lapangan, mengelola dokumen sertifikasi SLO, dan menjadi penghubung antara tim teknis, klien, dan portal SI UJANG GATRIK.',
    requirements: [
      'D3/S1 semua jurusan (diutamakan Administrasi Bisnis, Manajemen, atau Teknik)',
      'Pengalaman min. 1 tahun di administrasi perkantoran',
      'Terampil mengoperasikan MS Office, Google Workspace',
      'Komunikatif, teliti, dan mampu bekerja dalam tekanan deadline',
      'Memahami alur perizinan usaha menjadi nilai tambah',
    ],
  },
  {
    title: 'Staf Pemasaran & Business Development',
    location: 'Bandar Lampung / Remote (Sumatera)',
    type: 'Penuh Waktu',
    level: 'Junior – Middle',
    badge: 'Open',
    badgeColor: 'bg-green-100 text-green-700',
    description: 'Mengembangkan jaringan klien baru (kontraktor listrik, developer properti, pabrik), mempresentasikan layanan SEIIKI, dan mendukung target pertumbuhan bisnis perusahaan.',
    requirements: [
      'D3/S1 Manajemen, Pemasaran, atau bidang terkait',
      'Pengalaman di bidang sales B2B menjadi nilai tambah',
      'Kemampuan komunikasi dan negosiasi yang kuat',
      'Memiliki jaringan di industri konstruksi / ketenagalistrikan menjadi nilai tambah',
      'Target-oriented dengan kemampuan kerja mandiri',
    ],
  },
  {
    title: 'IT Support & Web Developer',
    location: 'Bandar Lampung / Remote',
    type: 'Penuh Waktu',
    level: 'Junior – Middle',
    badge: 'Open',
    badgeColor: 'bg-green-100 text-green-700',
    description: 'Memelihara sistem IT perusahaan, mengembangkan fitur platform digital SEIIKI, dan mendukung integrasi dengan portal SI UJANG GATRIK.',
    requirements: [
      'D3/S1 Teknik Informatika, Sistem Informasi, atau bidang terkait',
      'Menguasai minimal satu bahasa pemrograman web (JavaScript/TypeScript/PHP)',
      'Familiar dengan Next.js, React, atau framework modern lainnya',
      'Pengalaman dengan database PostgreSQL/MySQL',
      'Proaktif, senang belajar teknologi baru',
    ],
  },
  {
    title: 'Magang — Teknik Elektro / IT (6 Bulan)',
    location: 'Bandar Lampung (HQ) / Remote',
    type: 'Magang',
    level: 'Mahasiswa/Fresh Graduate',
    badge: 'Internship',
    badgeColor: 'bg-purple-100 text-purple-700',
    description: 'Program magang intensif 6 bulan di bidang teknik ketenagalistrikan atau pengembangan sistem informasi. Dapatkan pengalaman nyata inspeksi lapangan dan pengembangan platform digital.',
    requirements: [
      'Mahasiswa D3/S1 Teknik Elektro atau Teknik Informatika (semester 5 ke atas)',
      'IPK minimal 3.00 dari skala 4.00',
      'Antusias, disiplin, dan mau belajar',
      'Tersedia surat pengantar dari kampus',
      'Dapat bekerja min. 3 hari/minggu (full-time lebih diutamakan)',
    ],
  },
];

const benefits = [
  { icon: <TrendingUp className="h-6 w-6" />, title: 'Karir Berkembang', desc: 'Jenjang karir yang jelas dengan sistem promosi berbasis kompetensi. Peluang naik jabatan terbuka setiap tahun berdasarkan penilaian kinerja.' },
  { icon: <GraduationCap className="h-6 w-6" />, title: 'Pelatihan & Sertifikasi', desc: 'Perusahaan menanggung biaya pelatihan dan ujian sertifikasi kompetensi ketenagalistrikan (Kemenaker/ESDM) untuk seluruh tenaga teknik.' },
  { icon: <Shield className="h-6 w-6" />, title: 'BPJS Lengkap', desc: 'BPJS Kesehatan dan BPJS Ketenagakerjaan (JHT, JP, JKK, JKM) ditanggung penuh oleh perusahaan sejak hari pertama bekerja.' },
  { icon: <Heart className="h-6 w-6" />, title: 'Asuransi Jiwa & Kecelakaan', desc: 'Perlindungan asuransi jiwa dan kecelakaan kerja tambahan di atas BPJS untuk seluruh karyawan lapangan.' },
  { icon: <Coffee className="h-6 w-6" />, title: 'Lingkungan Kerja Positif', desc: 'Budaya kerja terbuka, kolaboratif, dan profesional. Tim yang supportif dengan manajemen yang transparan.' },
  { icon: <Users className="h-6 w-6" />, title: 'Tim Kompak & Solid', desc: 'Bergabung dengan tim inspektur berpengalaman dan profesional muda yang penuh semangat dalam misi yang sama.' },
  { icon: <Star className="h-6 w-6" />, title: 'Tunjangan Lapangan', desc: 'Tunjangan transportasi, uang makan, dan insentif perjalanan dinas yang kompetitif bagi tenaga teknik lapangan.' },
  { icon: <Zap className="h-6 w-6" />, title: 'Dampak Nyata', desc: 'Pekerjaan Anda langsung berkontribusi pada keselamatan instalasi listrik jutaan warga Indonesia.' },
];

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#facb01]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-5">
            <Briefcase className="h-3.5 w-3.5" />
            Bergabung Bersama Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl">
            Bangun Karir Bermakna<br />di Industri Kelistrikan
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed mb-8">
            SEIIKI membuka kesempatan bagi individu berbakat dan bersemangat untuk bergabung dalam misi mulia: menjamin keselamatan instalasi listrik seluruh Indonesia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#lowongan" className="inline-flex items-center gap-2 bg-[#facb01] hover:bg-[#facb01]/90 text-gray-900 font-bold px-6 py-3 rounded-full transition-colors">
              Lihat Lowongan <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:karir@seiiki.co.id" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors border border-white/20">
              Kirim CV Langsung
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '25+', label: 'Kantor Area', sub: 'Seluruh Indonesia' },
            { value: '50+', label: 'Karyawan Aktif', sub: 'Profesional bersertifikat' },
            { value: '2024', label: 'Berdiri', sub: 'Terakreditasi KAN' },
            { value: '3', label: 'Bidang Sertifikasi', sub: 'TR, PLTD, PLTS' },
          ].map(({ value, label, sub }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
              <p className="text-2xl font-bold text-[#09bce4]">{value}</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Mengapa Bergabung dengan SEIIKI?</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Kami percaya karyawan yang bahagia menghasilkan pekerjaan terbaik. Inilah yang kami tawarkan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="group p-5 rounded-2xl border border-gray-100 hover:border-[#09bce4]/30 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#09bce4]/10 flex items-center justify-center text-[#09bce4] mb-4 group-hover:bg-[#09bce4] group-hover:text-white transition-colors duration-200">
                  {b.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="lowongan" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Lowongan Tersedia</h2>
          <p className="text-gray-500 mt-3">Temukan posisi yang sesuai dengan keahlian dan passion Anda.</p>
        </div>

        <div className="space-y-5 max-w-4xl mx-auto">
          {jobOpenings.map((job, i) => (
            <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{job.title}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${job.badgeColor}`}>{job.badge}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#09bce4]" />{job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-[#09bce4]" />{job.type}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#09bce4]" />{job.level}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{job.description}</p>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Persyaratan</p>
                    <ul className="space-y-1">
                      {job.requirements.map((req, ri) => (
                        <li key={ri} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#09bce4] mt-1.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex justify-end">
                  <a
                    href={`mailto:karir@seiiki.co.id?subject=Lamaran: ${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center gap-2 bg-[#09bce4] hover:bg-[#09bce4]/90 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                  >
                    Lamar Sekarang <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#0a2a4a] to-[#09bce4] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Tidak menemukan posisi yang cocok?</h2>
          <p className="text-blue-100/80 mb-6 max-w-md mx-auto">Kirim CV dan portofolio Anda. Kami selalu senang bertemu dengan talenta baru yang bersemangat.</p>
          <a
            href="mailto:karir@seiiki.co.id"
            className="inline-flex items-center gap-2 bg-[#facb01] hover:bg-[#facb01]/90 text-gray-900 font-bold px-8 py-4 rounded-full transition-colors text-base"
          >
            Kirim ke karir@seiiki.co.id <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
