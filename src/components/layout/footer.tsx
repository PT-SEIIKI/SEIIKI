import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };
  
  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Company Info - Wider Column */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block group">
              <Logo className="h-22 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              PT. SOLUSI ENERGI KELISTRIKAN INDONESIA. Lembaga Inspeksi Teknik Terakreditasi untuk Sertifikat Laik Operasi (SLO) Instalasi Tenaga Listrik.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Bandar Lampung, Lampung, Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>08117970227</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>info@seiiki.co.id</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <Link 
                href="#" 
                aria-label="Facebook"
                className="p-2.5 bg-background/50 rounded-lg hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                aria-label="Twitter"
                className="p-2.5 bg-background/50 rounded-lg hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                aria-label="Instagram"
                className="p-2.5 bg-background/50 rounded-lg hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                aria-label="LinkedIn"
                className="p-2.5 bg-background/50 rounded-lg hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Profil Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Profil
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/profil/tentang-kami', label: 'Tentang Kami' },
                { href: '/profil/visi-misi', label: 'Visi & Misi' },
                { href: '/profil/struktur-organisasi', label: 'Struktur Organisasi' },
                { href: '/profil/dokumen-perijinan', label: 'Dokumen Perijinan' },
                { href: '/profil/daftar-pjt-tt', label: 'Daftar PJT-TT' },
                { href: '/profil/alamat-kantor', label: 'Alamat Kantor' },
                { href: '/profil/peralatan', label: 'Peralatan' }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
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
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/slo/informasi', label: 'Informasi SLO' },
                { href: 'https://siujang.esdm.go.id/', label: 'Pendaftaran SLO', external: true },
                { href: 'https://siujang.esdm.go.id/Cek-Validalitas-Sertifikat', label: 'Verifikasi SLO', external: true },
                { href: '/karir', label: 'Karir' },
                { href: '/kontak', label: 'Kontak Kami' },
                { href: '/survei/tr', label: 'Survey TR' },
                { href: '/survei/non-tr', label: 'Survey Non-TR' }
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all"
                    >
                      <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all"
                    >
                      <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legalitas Kami Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Legalitas Kami
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx', label: 'PLTD' },
                { href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=1', label: 'PLTS' },
                { href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=2', label: 'IPTL Tegangan Menengah' }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-all"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-semibold font-headline text-lg mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Dapatkan berita terbaru, pembaruan layanan, dan tips kelistrikan langsung ke inbox Anda.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="pl-11 bg-background h-12"
                />
              </div>
              <Button 
                onClick={handleSubscribe}
                variant="default"
                className="w-full h-12 font-medium group"
              >
                Berlangganan Sekarang
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Dengan berlangganan, Anda menyetujui kebijakan privasi kami.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SEIIKI. Semua Hak Cipta Dilindungi.</p>
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