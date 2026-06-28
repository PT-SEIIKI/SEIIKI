'use client';
import Link from 'next/link';
import { MainNav, profileComponents, sloComponents, legalitasComponents } from './main-nav';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Menu, X, Home, Folder, ShieldCheck, Image as ImageIcon, Briefcase, Mail, Scale, MessageSquareText, ClipboardList, LogIn, UserPlus, UserCircle, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Profil', href: '/profil/tentang-kami' },
  { name: 'SLO', href: '/slo/informasi' },
  { name: 'Karir', href: '/karir' },
  { name: 'Kontak Kami', href: '/kontak' },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  const defaultAccordion = React.useMemo(() => {
    if (pathname.startsWith('/profil')) return 'profil';
    if (pathname.startsWith('/slo')) return 'slo';
    if (pathname.startsWith('/legalitas')) return 'legalitas';
    return undefined;
  }, [pathname]);

  const isHome = pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fetch user auth status
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };
    fetchUser();
  }, [pathname]); // Re-check when pathname changes

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const isDashboard = pathname.startsWith('/dashboard');
  if (isDashboard) {
    return null;
  }

  return (
    <header
      className={cn(
        'sticky z-50 w-full transition-all duration-300',
        // Keep the header flush at the very top initially, add a little offset when scrolled
        scrolled ? 'top-4' : 'top-0',
        isHome && !scrolled ? 'bg-transparent' : ''
      )}
    >
      <div
        className={cn(
          'transition-all duration-300',
          // Initial: full-width transparent container
          isHome && !scrolled
            ? 'container mx-auto px-4'
            : [
                // Scrolled: centered capsule with blur, ring, and shadow
                'mx-auto max-w-sm md:max-w-6xl px-2 sm:px-3',
                'rounded-full bg-background/80 shadow-lg ring-1 ring-black/5',
                'backdrop-blur supports-[backdrop-filter]:bg-background/60'
              ].join(' ')
        )}
      >
        <div className={cn('flex items-center', scrolled ? 'h-34' : 'h-34')}>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className=" h-14 md:h-16 w-auto" />
          </Link>

          <div className="hidden md:flex flex-1">
            <MainNav />
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Desktop Login/Register/User buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={['ADMIN', 'EDITOR', 'ADMIN_KONSULTASI', 'ADMIN_INTEK'].includes(user.role) ? '/dashboard' : '/profil'}>
                      <UserCircle className="h-4 w-4 mr-1" />
                      {user.name || 'Profil'}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">
                      <LogIn className="h-4 w-4 mr-1" />
                      Masuk
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/register">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Daftar
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Buka Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs p-0">
                <div className="flex flex-col h-full">
                  {/* Brand header */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b bg-background/95 backdrop-blur">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                      <Logo className="h-16 md:h-20 w-auto" />
                      <span className="font-semibold">PT. SOLUSI ENERGI KELISTRIKAN INDONESIA</span>
                    </Link>
                  </div>
                  <nav className="mt-6 space-y-2 overflow-y-auto">
                    <div className="px-2 py-2">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary border-b border-border/60',
                          pathname === '/' && 'bg-primary text-primary-foreground'
                        )}
                      >
                        <Home className="h-5 w-5" />
                        Home
                      </Link>
                    </div>

                    <Accordion type="single" collapsible className="w-full" defaultValue={defaultAccordion}>
                      <AccordionItem value="profil">
                        <AccordionTrigger className="text-base px-2 rounded-lg hover:bg-primary/10 hover:text-primary border-b border-border/60">
                          <span className="flex items-center gap-3"><Folder className="h-5 w-5" /> Profil</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="pl-2 space-y-1 divide-y divide-border/50">
                            {profileComponents.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    'block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 border-l-2 border-transparent',
                                    pathname === item.href && 'bg-primary text-primary-foreground hover:text-primary-foreground border-primary'
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="slo">
                        <AccordionTrigger className="text-base px-2 rounded-lg hover:bg-primary/10 hover:text-primary border-b border-border/60">
                          <span className="flex items-center gap-3"><ShieldCheck className="h-5 w-5" /> SLO</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="pl-2 space-y-1 divide-y divide-border/50">
                            {sloComponents.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    'block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 border-l-2 border-transparent',
                                    pathname === item.href && 'bg-primary text-primary-foreground hover:text-primary-foreground border-primary'
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="legalitas">
                        <AccordionTrigger className="text-base px-2 rounded-lg hover:bg-primary/10 hover:text-primary border-b border-border/60">
                          <span className="flex items-center gap-3"><Scale className="h-5 w-5" /> Legalitas Kami</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="pl-2 space-y-1 divide-y divide-border/50">
                            {legalitasComponents.map((item) => (
                              <li key={item.href}>
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 border-l-2 border-transparent"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="px-2 py-2 space-y-2">
                      <Link
                        href="/konsultasi"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary border-b border-border/60',
                          pathname.startsWith('/konsultasi') && 'bg-primary text-primary-foreground'
                        )}
                      >
                        <MessageSquareText className="h-5 w-5" />
                        Konsultasi
                      </Link>
                      <Link
                        href="/intek"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary border-b border-border/60',
                          pathname.startsWith('/intek') && 'bg-primary text-primary-foreground'
                        )}
                      >
                        <ClipboardList className="h-5 w-5" />
                        INTEK
                      </Link>
                      <Link
                        href="/karir"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary border-b border-border/60',
                          pathname === '/karir' && 'bg-primary text-primary-foreground'
                        )}
                      >
                        <Briefcase className="h-5 w-5" />
                        Karir
                      </Link>
                      <Link
                        href="/kontak"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary border-b border-border/60',
                          pathname === '/kontak' && 'bg-primary text-primary-foreground'
                        )}
                      >
                        <Mail className="h-5 w-5" />
                        Kontak Kami
                      </Link>
                    </div>
                  </nav>
                  <div className="mt-auto pt-4 space-y-2 px-2">
                    {user ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                          <Link href={['ADMIN', 'EDITOR', 'ADMIN_KONSULTASI', 'ADMIN_INTEK'].includes(user.role) ? '/dashboard' : '/profil'}>
                            <UserCircle className="h-4 w-4 mr-1" />
                            {user.name || 'Profil'}
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => { handleLogout(); setIsOpen(false); }}>
                          <LogOut className="h-4 w-4 mr-1" />
                          Keluar
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                          <Link href="/login">
                            <LogIn className="h-4 w-4 mr-1" />
                            Masuk
                          </Link>
                        </Button>
                        <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                          <Link href="/register">
                            <UserPlus className="h-4 w-4 mr-1" />
                            Daftar
                          </Link>
                        </Button>
                      </div>
                    )}
                    <Button asChild className="w-full" variant="secondary">
                       <a href="https://siujang.esdm.go.id/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Daftar SLO</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
