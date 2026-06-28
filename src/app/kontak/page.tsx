import Image from 'next/image';
import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import { Metadata } from 'next';
import { generateMetadata, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Hubungi Kami',
  description: 'Hubungi PT. Solusi Energi Kelistrikan Indonesia (SEIIKI) untuk informasi layanan Sertifikat Laik Operasi. Kantor pusat kami di Bandar Lampung melayani seluruh Indonesia dengan 25 kantor wilayah.',
  keywords: ['Kontak SEIIKI', 'Alamat SEIIKI', 'Email SEIIKI', 'Telepon SEIIKI', 'Hubungi SEIIKI', 'Kantor SEIIKI Bandar Lampung', 'Customer Service SLO'],
  canonical: '/kontak',
});

export default function ContactPage() {
  const contactImage = placeholderImages.find(p => p.id === 'contact-hero');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'Hubungi Kami', url: '/kontak' },
  ]);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.fullName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        addressRegion: siteConfig.contact.address.region,
        addressCountry: siteConfig.contact.address.countryCode,
      },
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
    }
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div>
       <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        {contactImage && (
          <Image
            src={contactImage.imageUrl}
            alt={contactImage.description}
            fill
            className="object-cover"
            data-ai-hint={contactImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-headline font-bold">Hubungi Kami</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Kami siap membantu menjawab pertanyaan Anda dan memberikan solusi terbaik.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-headline">Informasi Kontak</h2>
              <p className="mt-2 text-muted-foreground">Hubungi kami melalui detail di bawah ini atau isi formulir di samping.</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Alamat Kantor Pusat</h3>
                    <p className="text-muted-foreground">Jl. Kepodang Gg. Asri No. 10, Gunung Agung, Langkapura, Kota Bandar Lampung, Provinsi Lampung</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Nomor Kantor</h3>
                    <p className="text-muted-foreground">08117970227</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">No. HP</h3>
                    <p className="text-muted-foreground">08117970227</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">No. Fax</h3>
                    <p className="text-muted-foreground">08117970227</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">pt.seyiki@gmail.com</p>
                    <p className="text-sm text-muted-foreground mt-1">Email Lainnya</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Peta Lokasi Kantor</p>
            </div>
          </div>
          <div>
            <Card className="p-6 md:p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl md:text-3xl font-bold font-headline">Kirim Pesan</h2>
                <form className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Nama Anda" />
                    <Input type="email" placeholder="Email Anda" />
                  </div>
                  <Input placeholder="Subjek" />
                  <Textarea placeholder="Pesan Anda" rows={6} />
                  <Button type="submit" className="w-full" size="lg">Kirim Pesan</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
