'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isDashboard = pathname.startsWith('/dashboard');
  if (isDashboard) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
      return;
    }
    // In a real app, you'd call an API here
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 4000);
  };

  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Company Info */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block group">
              <Logo className="h-22 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              PT. SOLUSI ENERGI KELISTRIKAN INDONESIA. Lembaga Inspeksi Teknik Terakreditasi untuk Sertifikat Laik Operasi (SLO) Instalasi Tenaga Listrik.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Jl. Kepodang Gg. Asri No. 10, Langkapura, Bandar Lampung</span>
              </div>
              <a href="tel:08117970227" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>08117970227</span>
              </a>
              <a href="mailto:info@seiiki.co.id" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@seiiki.co.id</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 bg-background/50 rounded-lg hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Profil Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Profil
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary" />
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/profil/tentang-kami', label: 'Tentang Kami' },
                { href: '/profil/visi-misi', label: 'Visi & Misi' },
                { href: '/profil/struktur-organisasi', label: 'Struktur Organisasi' },
                { href: '/profil/dokumen-perijinan', label: 'Dokumen Perijinan' },
                { href: '/profil/daftar-pjt-tt', label: 'Daftar PJT-TT' },
                { href: '/profil/alamat-kantor', label: 'Alamat Kantor' },
                { href: '/profil/peralatan', label: 'Peralatan' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all text-sm"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SLO & Layanan Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Layanan
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary" />
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/slo/informasi', label: 'Informasi SLO' },
                { href: 'https://siujang.esdm.go.id/', label: 'Pendaftaran SLO', external: true },
                { href: 'https://siujang.esdm.go.id/Cek-Validalitas-Sertifikat', label: 'Verifikasi SLO', external: true },
                { href: '/layanan', label: 'Konsultasi' },
                { href: '/intek', label: 'INTEK' },
                { href: '/karir', label: 'Karir' },
                { href: '/kontak', label: 'Kontak Kami' },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all text-sm"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all text-sm"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legalitas Kami */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Legalitas Kami
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary" />
            </h3>
            <ul className="space-y-3">
              {[
                { href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx', label: 'PLTD' },
                { href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=1', label: 'PLTS' },
                { href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=2', label: 'IPTL Tegangan Menengah' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all text-sm"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary" />
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dapatkan berita terbaru, pembaruan layanan, dan tips kelistrikan langsung ke inbox Anda.
            </p>

            {subscribeStatus === 'success' ? (
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Terima kasih! Anda berhasil berlangganan newsletter kami.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="pl-10 bg-background h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {subscribeStatus === 'error' && (
                  <p className="text-xs text-destructive">Masukkan alamat email yang valid.</p>
                )}
                <Button variant="default" type="submit" className="w-full h-11 font-medium group">
                  Berlangganan Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
            <p className="text-xs text-muted-foreground">
              Dengan berlangganan, Anda menyetujui kebijakan privasi kami.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} PT. Solusi Energi Kelistrikan Indonesia. Semua Hak Cipta Dilindungi.</p>
            <div className="flex gap-6">
              <Link href="/kebijakan-privasi" className="hover:text-primary transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat-ketentuan" className="hover:text-primary transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
