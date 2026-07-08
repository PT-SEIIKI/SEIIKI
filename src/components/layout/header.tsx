'use client';
import Link from 'next/link';
import { MainNav, profileComponents, sloComponents, legalitasComponents } from './main-nav';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import {
  Menu, Home, Folder, ShieldCheck, Briefcase, Mail, Scale,
  MessageSquareText, ClipboardList, LogIn, UserCircle, LogOut, Package,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const defaultAccordion = React.useMemo(() => {
    if (pathname.startsWith('/profil')) return 'profil';
    if (pathname.startsWith('/slo')) return 'slo';
    if (pathname.startsWith('/legalitas')) return 'legalitas';
    return undefined;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        // not logged in
      }
    };
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch {
      // ignore
    }
  };

  const isDashboard = pathname.startsWith('/dashboard');
  if (isDashboard) return null;

  // Transparan hanya di homepage saat belum di-scroll — halaman lain selalu solid
  const isHomePage = pathname === '/';
  const transparent = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10 mr-6 flex items-center shrink-0">
            <Logo className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 min-w-0">
            <MainNav transparent={transparent} />
          </div>

          {/* Desktop auth */}
          <div className="relative z-10 flex items-center justify-end gap-2 ml-auto">
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(transparent && 'text-white hover:text-white hover:bg-white/15')}
                  >
                    <Link href={['ADMIN', 'EDITOR', 'ADMIN_KONSULTASI', 'ADMIN_INTEK'].includes(user.role) ? '/dashboard' : '/profil'}>
                      <UserCircle className="h-4 w-4 mr-1" />
                      {user.name || 'Profil'}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className={cn(transparent && 'border-white/60 text-white hover:bg-white/15 hover:text-white')}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Keluar
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className={cn(
                    'font-semibold px-5 transition-all duration-300',
                    transparent
                      ? 'bg-white text-primary hover:bg-white/90 shadow-md'
                      : 'bg-primary hover:bg-primary/90 text-white'
                  )}
                >
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-1.5" />
                    Masuk
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile hamburger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(transparent && 'text-white hover:text-white hover:bg-white/15')}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Buka Menu</span>
                </Button>
              </SheetTrigger>

              {/* ─── MOBILE DRAWER ─── */}
              <SheetContent side="left" className="w-full sm:max-w-sm p-0 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-4 border-b bg-primary/5">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                    <Logo className="h-12 w-auto" />
                    <div className="leading-tight">
                      <p className="font-bold text-xs text-foreground">PT. SOLUSI ENERGI</p>
                      <p className="font-bold text-xs text-foreground">KELISTRIKAN INDONESIA</p>
                      <p className="text-[10px] text-muted-foreground">SEIIKI</p>
                    </div>
                  </Link>
                </div>

                {/* Scrollable nav */}
                <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      pathname === '/'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    )}
                  >
                    <Home className="h-4 w-4 shrink-0" /> Home
                  </Link>

                  {/* Accordions: Profil, SLO, Legalitas */}
                  <Accordion type="single" collapsible className="w-full" defaultValue={defaultAccordion}>
                    {[
                      { value: 'profil', icon: <Folder className="h-4 w-4 shrink-0" />, label: 'Profil', items: profileComponents, external: false },
                      { value: 'slo', icon: <ShieldCheck className="h-4 w-4 shrink-0" />, label: 'SLO', items: sloComponents, external: false },
                      { value: 'legalitas', icon: <Scale className="h-4 w-4 shrink-0" />, label: 'Legalitas Kami', items: legalitasComponents, external: true },
                    ].map(({ value, icon, label, items, external }) => (
                      <AccordionItem key={value} value={value} className="border-none">
                        <AccordionTrigger
                          className={cn(
                            'text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary hover:no-underline transition-colors',
                            (pathname.startsWith(`/${value}`) || (value === 'slo' && pathname.startsWith('/slo')))
                              ? 'text-primary'
                              : 'text-foreground'
                          )}
                        >
                          <span className="flex items-center gap-3">{icon} {label}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                          <ul className="pl-4 space-y-0.5 border-l-2 border-primary/20 ml-3">
                            {items.map((item: any) =>
                              external || item.href.startsWith('http') ? (
                                <li key={item.href}>
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                  >
                                    {item.icon && <span className="text-primary">{item.icon}</span>}
                                    {item.title}
                                  </a>
                                </li>
                              ) : (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                      pathname === item.href
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                                    )}
                                  >
                                    {item.icon && <span>{item.icon}</span>}
                                    {item.title}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {/* Flat links — semua halaman utama */}
                  {[
                    { href: '/layanan', icon: <MessageSquareText className="h-4 w-4 shrink-0" />, label: 'Layanan', match: '/layanan' },
                    { href: '/intek', icon: <ClipboardList className="h-4 w-4 shrink-0" />, label: 'INTEK', match: '/intek' },
                    { href: '/produk', icon: <Package className="h-4 w-4 shrink-0" />, label: 'Produk', match: '/produk' },
                    { href: '/karir', icon: <Briefcase className="h-4 w-4 shrink-0" />, label: 'Karir', match: '/karir' },
                    { href: '/kontak', icon: <Mail className="h-4 w-4 shrink-0" />, label: 'Kontak Kami', match: '/kontak' },
                  ].map(({ href, icon, label, match }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        pathname.startsWith(match)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-primary/10 hover:text-primary'
                      )}
                    >
                      {icon} {label}
                    </Link>
                  ))}
                </nav>

                {/* Footer buttons */}
                <div className="p-4 border-t space-y-2 bg-background">
                  {user ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                        <Link href={['ADMIN', 'EDITOR', 'ADMIN_KONSULTASI', 'ADMIN_INTEK'].includes(user.role) ? '/dashboard' : '/profil'}>
                          <UserCircle className="h-4 w-4 mr-1" />{user.name || 'Profil'}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                      >
                        <LogOut className="h-4 w-4 mr-1" />Keluar
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white" size="sm" onClick={() => setIsOpen(false)}>
                      <Link href="/login"><LogIn className="h-4 w-4 mr-1.5" />Masuk</Link>
                    </Button>
                  )}
                  <Button asChild className="w-full" variant="secondary" size="sm">
                    <a href="https://siujang.esdm.go.id/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                      Daftar SLO
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
