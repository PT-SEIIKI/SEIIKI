import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from 'next';
import { generateMetadata, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Informasi SLO',
  description: 'Informasi lengkap mengenai Sertifikat Laik Operasi (SLO), persyaratan dokumen, dan alur penerbitan. SLO adalah sertifikat wajib untuk instalasi tenaga listrik sesuai UU Ketenagalistrikan No. 30 Tahun 2009.',
  keywords: ['Informasi SLO', 'Sertifikat Laik Operasi', 'Persyaratan SLO', 'Dokumen SLO', 'Alur Penerbitan SLO', 'UU Ketenagalistrikan', 'Cara Mengurus SLO', 'Biaya SLO'],
  canonical: '/slo/informasi',
});

export default function SloInfoPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'SLO', url: '/slo' },
    { name: 'Informasi SLO', url: '/slo/informasi' },
  ]);

  const serviceSchema = generateServiceSchema({
    name: 'Sertifikat Laik Operasi (SLO)',
    description: 'Sertifikat Laik Operasi (SLO) adalah sertifikat yang dikeluarkan untuk instalasi pemanfaatan tenaga listrik tegangan rendah, menengah, dan tinggi sesuai UU Ketenagalistrikan No. 30 Tahun 2009.',
  });

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="container mx-auto p-4 md:p-8">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Sertifikat Laik Operasi</h1>
        <p className="mt-2 text-lg text-muted-foreground">Informasi lengkap mengenai SLO, persyaratan dokumen, dan alur penerbitan.</p>
      </header>
      <main className="max-w-5xl mx-auto">
        <section className="bg-card p-6 md:p-8 rounded-lg shadow-md space-y-10">
          <div className="text-center">
            <Info className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl md:text-3xl font-semibold">Data dan Informasi Lengkap: Sertifikat Laik Operasi (SLO) dari Portal SI UJANG GATRIK</h2>
            <p className="mt-2 text-muted-foreground">Sumber resmi: <a className="underline text-primary" href="https://siujang.esdm.go.id/" target="_blank" rel="noopener noreferrer">siujang.esdm.go.id</a></p>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h3 className="text-xl font-semibold">1. Pengertian SLO</h3>
            <p>
              Sertifikat Laik Operasi (SLO) adalah bukti resmi bahwa suatu instalasi tenaga listrik telah memenuhi persyaratan teknis dan laik untuk dioperasikan. Sertifikat ini diterbitkan oleh lembaga yang berwenang di bawah pengawasan Kementerian Energi dan Sumber Daya Mineral (ESDM).
            </p>
            <p>
              Portal <strong>SI UJANG GATRIK (Sistem Informasi Usaha Jasa Penunjang Tenaga Listrik)</strong> merupakan sistem resmi untuk pengajuan, validasi, dan manajemen data terkait SLO serta Lembaga Inspeksi Teknis (LIT) di Indonesia.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">2. Layanan SLO di SI UJANG GATRIK</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Tata Cara Permohonan SLO</li>
              <li>Jenis Instalasi yang Dapat Diterbitkan SLO</li>
              <li>Tarif SLO</li>
              <li>Daftar Lembaga Inspeksi Teknis (LIT)</li>
              <li>Validasi Sertifikat</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. Tata Cara Permohonan SLO</h3>
            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong>Registrasi dan Login:</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Pemohon wajib membuat akun di portal SI UJANG GATRIK.</li>
                  <li>Akun dapat berupa badan usaha atau perorangan yang memiliki izin usaha di bidang ketenagalistrikan.</li>
                </ul>
              </li>
              <li>
                <strong>Pengajuan Permohonan:</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Buka menu <em>Permohonan &gt; Buat Permohonan Baru</em>.</li>
                  <li>Pilih <em>Jenis Instalasi</em> yang akan disertifikasi.</li>
                  <li>Unggah dokumen teknis yang dipersyaratkan (gambar instalasi, laporan inspeksi, sertifikat teknisi, dsb.).</li>
                </ul>
              </li>
              <li>
                <strong>Pembayaran Tarif:</strong> Lakukan pembayaran sesuai tarif resmi yang tercantum dalam menu <em>Tarif SLO</em>.
              </li>
              <li>
                <strong>Inspeksi oleh LIT:</strong> Pemeriksaan dilakukan oleh <em>Lembaga Inspeksi Teknis (LIT)</em> yang terdaftar di portal.
              </li>
              <li>
                <strong>Penerbitan Sertifikat:</strong> Jika hasil inspeksi memenuhi persyaratan, sistem akan menerbitkan <em>Sertifikat Laik Operasi (SLO)</em> secara elektronik.
              </li>
              <li>
                <strong>Validasi Sertifikat:</strong> Verifikasi keaslian SLO melalui menu <em>Validasi Sertifikat</em> di situs SI UJANG GATRIK.
              </li>
            </ol>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">4. Jenis Instalasi yang Wajib SLO</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Instalasi tegangan rendah (rumah tangga, perkantoran, komersial)</li>
              <li>Instalasi tegangan menengah (industri, fasilitas publik)</li>
              <li>Gardu distribusi dan jaringan listrik</li>
              <li>Instalasi pembangkit listrik (PLN maupun non-PLN)</li>
              <li>Instalasi sistem tenaga surya dan energi terbarukan lainnya</li>
            </ul>
            <p className="text-muted-foreground">Setiap jenis instalasi memiliki standar teknis dan dokumen pendukung yang berbeda.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">5. Tarif SLO</h3>
            <p className="text-muted-foreground">Tarif diatur oleh Kementerian ESDM dan dapat diakses melalui menu <em>Tarif SLO</em> di portal. Umumnya mempertimbangkan:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Jenis instalasi</li>
              <li>Kapasitas daya (kVA atau MW)</li>
              <li>Kompleksitas sistem</li>
              <li>Lokasi inspeksi</li>
            </ul>
            <p className="text-sm text-muted-foreground">Catatan: tarif aktual mengacu pada portal SI UJANG GATRIK dan dapat berubah mengikuti regulasi ESDM.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">6. Daftar Lembaga Inspeksi Teknis (LIT)</h3>
            <p className="text-muted-foreground">Hanya <strong>LIT terakreditasi</strong> yang dapat melakukan pemeriksaan dan menerbitkan hasil inspeksi untuk SLO. Daftar resmi memuat:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Nama LIT dan nomor registrasi</li>
              <li>Alamat kantor dan wilayah kerja</li>
              <li>Jenis instalasi yang dapat diperiksa</li>
            </ul>
            <p className="text-sm text-muted-foreground">LIT wajib memiliki akreditasi dari <strong>Komite Akreditasi Nasional (KAN)</strong>.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">7. Dasar Hukum</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Undang-Undang Nomor 30 Tahun 2009 tentang Ketenagalistrikan.</li>
              <li>Peraturan Menteri ESDM No. 12 Tahun 2021 tentang Klasifikasi, Sertifikasi, dan Akreditasi UJPTL.</li>
              <li>Peraturan Menteri ESDM No. 5 Tahun 2021 tentang Standar Kegiatan Usaha dan Produk pada Perizinan Berusaha Berbasis Risiko Sektor ESDM.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">8. Validasi dan Pengawasan</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Masuk ke menu <em>Validasi Sertifikat</em>.</li>
              <li>Masukkan <em>Nomor Sertifikat</em> atau <em>Kode QR</em> pada sertifikat.</li>
              <li>Sistem menampilkan status validitas dan data instalasi terkait.</li>
            </ul>
            <p className="text-muted-foreground">Kementerian ESDM melakukan pengawasan berkala terhadap pelaksanaan inspeksi oleh LIT dan penerbitan SLO.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">9. Informasi Tambahan</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Portal resmi: <a className="underline text-primary" href="https://siujang.esdm.go.id/" target="_blank" rel="noopener noreferrer">https://siujang.esdm.go.id/</a></li>
              <li>Email dukungan teknis: <a className="underline" href="mailto:helpdesk@esdm.go.id">helpdesk@esdm.go.id</a></li>
              <li>Panduan lengkap tersedia pada menu <em>Dokumen &gt; Cara Memesan Layanan SLO</em>.</li>
              <li>Tersedia API dan dashboard statistik untuk pelaporan publik.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">10. Kesimpulan</h3>
            <p className="text-muted-foreground">SLO merupakan instrumen penting untuk menjamin keamanan dan kelayakan operasi instalasi listrik. Melalui SI UJANG GATRIK, proses pengajuan hingga validasi dilakukan secara digital sehingga lebih cepat, transparan, dan akuntabel.</p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a href="https://siujang.esdm.go.id/" target="_blank" rel="noopener noreferrer">Ajukan SLO Sekarang</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </section>
      </main>
      </div>
    </>
  );
}
