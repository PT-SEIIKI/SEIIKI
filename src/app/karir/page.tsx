import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Karir',
  description: 'Bergabunglah dengan tim SEIIKI. Kami mencari individu berbakat untuk tumbuh bersama dalam misi menjamin keamanan listrik nasional. Lowongan untuk Inspektur Teknik Listrik, Staf Administrasi, dan posisi lainnya.',
  keywords: ['Karir SEIIKI', 'Lowongan Kerja SEIIKI', 'Bergabung SEIIKI', 'Inspektur Teknik Listrik', 'Lowongan Kerja Listrik', 'Karir Ketenagalistrikan'],
  canonical: '/karir',
});

const jobOpenings = [
  {
    title: 'Inspektur Teknik Listrik',
    location: 'Jakarta, Indonesia',
    type: 'Penuh Waktu',
    description: 'Melakukan inspeksi dan pengujian instalasi listrik tegangan rendah dan menengah untuk memastikan kepatuhan terhadap standar keselamatan.'
  },
  {
    title: 'Staf Administrasi & Pemasaran',
    location: 'Surabaya, Indonesia',
    type: 'Penuh Waktu',
    description: 'Mengelola pendaftaran klien, dokumentasi sertifikasi, dan mendukung kegiatan pemasaran untuk memperluas jangkauan layanan.'
  },
  {
    title: 'Pengembangan Perangkat Lunak (Magang)',
    location: 'Remote',
    type: 'Magang',
    description: 'Bergabung dengan tim teknologi kami untuk mengembangkan dan memelihara platform digital layanan SLO.'
  }
];

export default function CareerPage() {
  return (
    <div>
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Bergabung dengan Tim Kami</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Kami mencari individu berbakat dan bersemangat untuk tumbuh bersama kami dalam misi menjamin keamanan listrik nasional.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-12">Lowongan Tersedia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOpenings.map((job, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">{job.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm mt-2">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Lamar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground">Tidak menemukan posisi yang cocok?</p>
            <p>Kirimkan CV Anda ke <a href="mailto:karir@slocenter.com" className="text-primary font-semibold hover:underline">karir@slocenter.com</a>. Kami selalu mencari talenta baru.</p>
        </div>
      </main>
    </div>
  );
}
