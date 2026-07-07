import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from 'next';
import { generateMetadata, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo';
import { ArrowRight, ShieldCheck, FileText, ClipboardList, DollarSign, Building2, CheckCircle2, ExternalLink, Info } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Informasi SLO',
  description: 'Informasi lengkap mengenai Sertifikat Laik Operasi (SLO), persyaratan dokumen, dan alur penerbitan.',
  keywords: ['Informasi SLO', 'Sertifikat Laik Operasi', 'Persyaratan SLO', 'Cara Mengurus SLO'],
  canonical: '/slo/informasi',
});

const steps = [
  {
    no: '01', icon: <Building2 className="h-5 w-5" />, title: 'Registrasi & Login',
    desc: 'Buat akun di portal SI UJANG GATRIK (siujang.esdm.go.id). Akun dapat berupa badan usaha atau perorangan berlisensi di bidang ketenagalistrikan.',
    color: 'bg-blue-500',
  },
  {
    no: '02', icon: <ClipboardList className="h-5 w-5" />, title: 'Pengajuan Permohonan',
    desc: 'Buka menu Permohonan → Buat Permohonan Baru. Pilih jenis instalasi dan unggah dokumen teknis (gambar instalasi, laporan inspeksi, sertifikat teknisi).',
    color: 'bg-[#09bce4]',
  },
  {
    no: '03', icon: <DollarSign className="h-5 w-5" />, title: 'Pembayaran Tarif',
    desc: 'Lakukan pembayaran tarif resmi sesuai jenis instalasi dan kapasitas daya yang tercantum dalam menu Tarif SLO di portal.',
    color: 'bg-emerald-500',
  },
  {
    no: '04', icon: <ShieldCheck className="h-5 w-5" />, title: 'Inspeksi oleh LIT',
    desc: 'Pemeriksaan dan pengujian lapangan dilakukan oleh Lembaga Inspeksi Teknis (LIT) terakreditasi yang terdaftar di portal, termasuk SEIIKI.',
    color: 'bg-violet-500',
  },
  {
    no: '05', icon: <FileText className="h-5 w-5" />, title: 'Penerbitan Sertifikat',
    desc: 'Jika hasil inspeksi memenuhi persyaratan teknis, sistem menerbitkan Sertifikat Laik Operasi (SLO) secara elektronik yang sah dan tervalidasi.',
    color: 'bg-amber-500',
  },
  {
    no: '06', icon: <CheckCircle2 className="h-5 w-5" />, title: 'Validasi Sertifikat',
    desc: 'Verifikasi keaslian SLO kapan saja melalui menu Validasi Sertifikat di portal menggunakan nomor sertifikat atau scan QR Code.',
    color: 'bg-rose-500',
  },
];

const installationTypes = [
  { type: 'Tegangan Rendah (TR)', desc: 'Instalasi rumah tangga, perkantoran, pertokoan, dan fasilitas komersial dengan daya s/d 197 kVA.' },
  { type: 'Tegangan Menengah (TM)', desc: 'Instalasi industri, pabrik, gedung besar, mall, dan fasilitas publik dengan daya > 197 kVA.' },
  { type: 'Gardu Distribusi', desc: 'Trafo distribusi, gardu portal, gardu cantol, dan jaringan distribusi tegangan menengah.' },
  { type: 'Instalasi Pembangkit', desc: 'Pembangkit listrik PLN, IPP, dan captive power (genset, PLTD, PLTS, PLTSa, dll).' },
  { type: 'Energi Terbarukan', desc: 'Instalasi PLTS rooftop, PLTS ground mounted, PLTMH, dan sistem hybrid on-grid/off-grid.' },
  { type: 'Instalasi Khusus', desc: 'Instalasi elevator/eskalator, sistem penangkal petir, UPS besar, dan instalasi industri khusus.' },
];

const legalBases = [
  { no: '1', reg: 'UU No. 30 Tahun 2009', desc: 'Undang-Undang Ketenagalistrikan — dasar hukum utama penyelenggaraan kelistrikan nasional.' },
  { no: '2', reg: 'PP No. 14 Tahun 2012', desc: 'Peraturan Pemerintah tentang Kegiatan Usaha Penyediaan Tenaga Listrik.' },
  { no: '3', reg: 'Permen ESDM No. 5 Tahun 2021', desc: 'Standar Kegiatan Usaha dan Produk pada Perizinan Berusaha Berbasis Risiko Sektor ESDM.' },
  { no: '4', reg: 'Permen ESDM No. 12 Tahun 2021', desc: 'Klasifikasi, Kualifikasi, Akreditasi dan Sertifikasi Usaha Jasa Penunjang Tenaga Listrik.' },
  { no: '5', reg: 'KEPMEN ESDM No. 49 Tahun 2017', desc: 'Penetapan PT. SEIIKI sebagai Lembaga Inspeksi Teknik Tenaga Listrik (LIT-TR).' },
];

export default function SloInfoPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'SLO', url: '/slo' },
    { name: 'Informasi SLO', url: '/slo/informasi' },
  ]);
  const serviceSchema = generateServiceSchema({
    name: 'Sertifikat Laik Operasi (SLO)',
    description: 'Sertifikat Laik Operasi (SLO) adalah sertifikat yang dikeluarkan untuk instalasi pemanfaatan tenaga listrik sesuai UU Ketenagalistrikan No. 30 Tahun 2009.',
  });

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="min-h-screen bg-gray-50/50">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#facb01]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="flex items-center gap-2 text-xs text-blue-300/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <ArrowRight className="h-3 w-3" />
              <Link href="/slo/informasi" className="text-white">Informasi SLO</Link>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Panduan Lengkap
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl">
              Sertifikat Laik Operasi (SLO)
            </h1>
            <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed mb-8">
              Panduan lengkap pengajuan SLO melalui portal resmi SI UJANG GATRIK Kementerian ESDM — dari registrasi hingga sertifikat elektronik terbit.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://siujang.esdm.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#facb01] hover:bg-[#facb01]/90 text-gray-900 font-bold px-6 py-3 rounded-full transition-colors text-sm"
              >
                Ajukan SLO di SI UJANG GATRIK <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">

          {/* Pengertian SLO */}
          <section>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 text-blue-600 rounded-xl p-3 shrink-0">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Apa itu SLO?</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    <strong>Sertifikat Laik Operasi (SLO)</strong> adalah bukti resmi bahwa suatu instalasi tenaga listrik telah memenuhi persyaratan teknis keselamatan dan laik untuk dioperasikan. SLO <strong>wajib dimiliki</strong> oleh setiap instalasi listrik sesuai Undang-Undang No. 30 Tahun 2009 tentang Ketenagalistrikan.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Portal <strong>SI UJANG GATRIK</strong> (Sistem Informasi Usaha Jasa Penunjang Tenaga Listrik) adalah sistem resmi Kementerian ESDM untuk pengajuan, validasi, dan manajemen SLO secara digital di seluruh Indonesia.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {['Wajib secara hukum', 'Berlaku 5 tahun', 'Dapat divalidasi secara online', 'Diterbitkan secara elektronik'].map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Alur Penerbitan */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Alur Penerbitan SLO</h2>
              <p className="text-gray-500 mt-2">6 langkah mudah dari pengajuan hingga sertifikat terbit</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((step) => (
                <div key={step.no} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-5xl font-black text-gray-50">{step.no}</div>
                  <div className={`${step.color} text-white rounded-xl p-2.5 w-11 h-11 flex items-center justify-center mb-4`}>
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Jenis Instalasi */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Jenis Instalasi yang Wajib SLO</h2>
              <p className="text-gray-500 mt-2">Semua jenis instalasi tenaga listrik berikut wajib memiliki SLO</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {installationTypes.map((item) => (
                <div key={item.type} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#09bce4] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.type}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tarif */}
          <section>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#09bce4]" />
                Tarif SLO
              </h2>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Tarif SLO diatur oleh Kementerian ESDM dan dapat diakses melalui menu <strong>Tarif SLO</strong> di portal SI UJANG GATRIK. Tarif dihitung berdasarkan:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'Jenis Instalasi', desc: 'TR, TM, Pembangkit, dll' },
                  { label: 'Kapasitas Daya', desc: 'kVA atau MW terpasang' },
                  { label: 'Kompleksitas Sistem', desc: 'Sederhana hingga kompleks' },
                  { label: 'Lokasi Inspeksi', desc: 'Jarak dari kantor LIT terdekat' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-[#09bce4] shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{label}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700">
                <strong>Catatan:</strong> Tarif aktual mengacu pada portal SI UJANG GATRIK dan dapat berubah sesuai regulasi ESDM terbaru. Untuk estimasi biaya spesifik instalasi Anda, silakan hubungi tim SEIIKI.
              </div>
            </div>
          </section>

          {/* Dasar Hukum */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Dasar Hukum</h2>
              <p className="text-gray-500 mt-2">Regulasi yang mendasari kewajiban SLO di Indonesia</p>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {legalBases.map((law, i) => (
                <div key={law.no} className={`flex items-start gap-4 px-6 py-5 ${i < legalBases.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className="w-8 h-8 rounded-full bg-[#09bce4]/10 text-[#09bce4] text-sm font-bold flex items-center justify-center shrink-0">{law.no}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{law.reg}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{law.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#0a2a4a] to-[#09bce4] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Siap Mengurus SLO Anda?</h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto">
              Tim inspektur bersertifikat SEIIKI siap membantu proses inspeksi teknis dan penerbitan SLO instalasi listrik Anda dengan cepat, profesional, dan terpercaya.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://siujang.esdm.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#facb01] hover:bg-[#facb01]/90 text-gray-900 font-bold px-8 py-4 rounded-full transition-colors"
              >
                Ajukan SLO Sekarang <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors border border-white/20"
              >
                Hubungi SEIIKI <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
