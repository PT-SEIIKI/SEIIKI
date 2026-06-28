import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem, Target, Quote } from "lucide-react";
import { Metadata } from 'next';
import Script from 'next/script';
import { generateMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Visi, Misi & Moto',
  description: 'Visi, Misi, dan Moto PT. Solusi Energi Kelistrikan Indonesia (SEIIKI). Menjadi lembaga jasa inspeksi teknik terpercaya di Indonesia yang berperan aktif dalam mewujudkan sistem ketenagalistrikan yang aman, andal, efisien, dan berstandar nasional maupun internasional.',
  keywords: ['Visi SEIIKI', 'Misi SEIIKI', 'Moto SEIIKI', 'Profil Perusahaan', 'Tentang SEIIKI', 'Visi Misi Perusahaan Listrik'],
  canonical: '/profil/visi-misi',
});

export default function VisionMissionPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'Profil', url: '/profil' },
    { name: 'Visi, Misi & Moto', url: '/profil/visi-misi' },
  ]);
  const missionItems = [
    "Memberikan layanan inspeksi dan pengujian yang independen, akurat, dan berintegritas tinggi, sesuai dengan ketentuan Direktorat Jenderal Ketenagalistrikan Republik Indonesia.",
    "Menjamin keselamatan dan keandalan instalasi listrik melalui proses pemeriksaan yang profesional dan berstandar tinggi.",
    "Mengembangkan kompetensi sumber daya manusia di bidang teknik ketenagalistrikan agar mampu menghadapi tantangan dan perkembangan teknologi energi terbaru.",
    "Mendukung kebijakan pemerintah dalam peningkatan mutu dan keselamatan instalasi ketenagalistrikan di seluruh Indonesia.",
    "Membangun kepercayaan pelanggan melalui pelayanan yang tepat waktu, transparan, dan berorientasi pada hasil terbaik."
  ];

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <div className="bg-secondary">
        <div className="container mx-auto p-4 md:p-8">
          <header className="py-8 text-center">
            <h1 className="text-4xl font-bold font-headline text-primary">Visi, Misi &amp; Moto</h1>
            <p className="mt-2 text-lg text-muted-foreground">SEIIKI (PT. SOLUSI ENERGI KELISTRIKAN INDONESIA)</p>
          </header>
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <Gem className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4 text-3xl font-headline">Visi Perusahaan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg text-muted-foreground leading-relaxed">
                  Menjadi lembaga jasa inspeksi teknik terpercaya di Indonesia yang berperan aktif dalam mewujudkan sistem ketenagalistrikan yang aman, andal, efisien, dan berstandar nasional maupun internasional.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4 text-3xl font-headline">Misi Perusahaan</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 text-muted-foreground">
                  {missionItems.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">{index + 1}.</span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <Quote className="h-12 w-12 mx-auto text-primary" />
                <CardTitle className="mt-4 text-3xl font-headline">Moto Perusahaan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="text-center text-xl font-semibold text-primary italic border-l-4 border-primary pl-4 py-2">
                  "Keselamatan, Keandalan, dan Kepastian Operasi — Prioritas Kami."
                </blockquote>
                <p className="text-center text-base text-muted-foreground leading-relaxed">
                  Moto ini mencerminkan komitmen PT. Solusi Energi Kelistrikan Indonesia untuk memastikan setiap instalasi listrik di Indonesia beroperasi dengan aman, efisien, dan sesuai regulasi melalui proses inspeksi yang profesional dan terpercaya.
                </p>
              </CardContent>
            </Card>
        </main>
      </div>
    </div>
    </>
  );
}
