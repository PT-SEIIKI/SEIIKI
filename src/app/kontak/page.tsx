import Script from 'next/script';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { generateMetadata, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';
import ContactForm from '@/components/sections/contact-form';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Hubungi Kami',
  description: 'Hubungi PT. Solusi Energi Kelistrikan Indonesia (SEIIKI) untuk informasi layanan SLO. Kantor pusat di Bandar Lampung, melayani seluruh Indonesia.',
  keywords: ['Kontak SEIIKI', 'Alamat SEIIKI', 'Email SEIIKI', 'Telepon SEIIKI', 'Hubungi SEIIKI'],
  canonical: '/kontak',
});

const contactItems = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Kantor Pusat',
    lines: [
      'Jl. Kepodang Gg. Asri No. 10',
      'Gunung Agung, Langkapura',
      'Kota Bandar Lampung, Lampung 35151',
    ],
    color: 'text-[#09bce4]',
    bg: 'bg-[#09bce4]/10',
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Telepon / WhatsApp',
    lines: ['08117970227', '(Senin – Jumat, 08.00 – 17.00 WIB)'],
    href: 'tel:08117970227',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    lines: ['pt.seyiki@gmail.com', 'seiiki.official@gmail.com'],
    href: 'mailto:pt.seyiki@gmail.com',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Jam Operasional',
    lines: ['Senin – Jumat: 08.00 – 17.00 WIB', 'Sabtu: 08.00 – 13.00 WIB', 'Minggu & Libur Nasional: Tutup'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const quickContacts = [
  {
    title: 'Informasi Layanan SLO',
    desc: 'Pertanyaan seputar prosedur, biaya, dan jadwal inspeksi SLO.',
    wa: '08117970227',
    waMsg: 'Halo SEIIKI, saya ingin informasi layanan SLO',
  },
  {
    title: 'Konsultasi Teknis',
    desc: 'Diskusi teknis mengenai instalasi, PLTS, PLTD, atau tegangan menengah.',
    wa: '08117970227',
    waMsg: 'Halo SEIIKI, saya ingin konsultasi teknis kelistrikan',
  },
  {
    title: 'Pengaduan & Saran',
    desc: 'Sampaikan pengalaman layanan atau saran untuk perbaikan.',
    email: 'pt.seyiki@gmail.com',
    subject: 'Pengaduan/Saran Layanan SEIIKI',
  },
];

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
    { name: 'Hubungi Kami', url: '/kontak' },
  ]);

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-gray-50/50">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#facb01]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="flex items-center gap-2 text-xs text-blue-300/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <ArrowRight className="h-3 w-3" />
              <span className="text-white">Hubungi Kami</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-5">
              <MessageSquare className="h-3.5 w-3.5" />
              Kami Siap Membantu
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Hubungi Kami
            </h1>
            <p className="text-blue-100/80 text-lg max-w-xl leading-relaxed">
              Punya pertanyaan tentang SLO, inspeksi, atau layanan kami? Tim SEIIKI siap membantu Anda.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Informasi Kontak</h2>

              {contactItems.map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                  <div className={`${item.bg} ${item.color} rounded-xl p-2.5 h-fit shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                    {item.lines.map((line, i) => (
                      item.href && i === 0 ? (
                        <a key={i} href={item.href} className={`block text-sm font-semibold ${item.color} hover:underline`}>{line}</a>
                      ) : (
                        <p key={i} className={`text-sm ${i === 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>{line}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* Quick Contact Buttons */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Hubungi Cepat via WhatsApp</h3>
                <div className="space-y-3">
                  {quickContacts.filter(q => q.wa).map((q) => (
                    <a
                      key={q.title}
                      href={`https://wa.me/62${q.wa?.replace(/^0/, '')}?text=${encodeURIComponent(q.waMsg || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-800 group-hover:underline">{q.title}</p>
                        <p className="text-xs text-green-600">{q.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Map + Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Google Maps Embed */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#09bce4]" />
                    Lokasi Kantor Pusat
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Jl. Kepodang Gg. Asri No. 10, Gunung Agung, Langkapura, Bandar Lampung</p>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0!2d105.2499!3d-5.3971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40da4b3b3b3b3b%3A0x0!2sGunung%20Agung%2C%20Langkapura%2C%20Kota%20Bandar%20Lampung!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor SEIIKI"
                />
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Kirim Pesan</h2>
                <p className="text-sm text-gray-400 mb-6">Isi formulir di bawah dan kami akan merespons dalam 1×24 jam kerja.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
