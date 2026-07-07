'use client';
import Link from 'next/link';
import { MainNav, profileComponents, sloComponents, legalitasComponents } from './main-nav';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Menu, Home, Folder, ShieldCheck, Briefcase, Mail, Scale, MessageSquareText, ClipboardList, LogIn, UserCircle, LogOut } from 'lucide-react';
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
  const pathname = usePathname();
  const router = useRouter();

  const defaultAccordion = React.useMemo(() => {
    if (pathname.startsWith('/profil')) return 'profil';
    if (pathname.startsWith('/slo')) return 'slo';
    if (pathname.startsWith('/legalitas')) return 'legalitas';
    return undefined;
  }, [pathname]);

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
  }, [pathname]);

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
  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo — relative + z-index agar selalu di atas */}
          <Link href="/" className="relative z-10 mr-6 flex items-center shrink-0">
            <Logo className="h-14 md:h-16 w-auto" />
          </Link>

          <div className="hidden md:flex flex-1 min-w-0">
            <MainNav />
          </div>

          {/* Desktop auth buttons — relative + z-index */}
          <div className="relative z-10 flex items-center justify-end gap-2 ml-auto">
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
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold px-5">
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
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Buka Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 px-4 py-4 border-b bg-background">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                      <Logo className="h-12 w-auto" />
                      <span className="font-semibold text-sm leading-tight">PT. SOLUSI ENERGI<br />KELISTRIKAN INDONESIA</span>
                    </Link>
                  </div>

                  <nav className="mt-4 flex-1 overflow-y-auto px-2 space-y-1">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors',
                        pathname === '/' && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                      )}
                    >
                      <Home className="h-4 w-4" /> Home
                    </Link>

                    <Accordion type="single" collapsible className="w-full" defaultValue={defaultAccordion}>
                      {[
                        { value: 'profil', icon: <Folder className="h-4 w-4" />, label: 'Profil', items: profileComponents },
                        { value: 'slo', icon: <ShieldCheck className="h-4 w-4" />, label: 'SLO', items: sloComponents },
                        { value: 'legalitas', icon: <Scale className="h-4 w-4" />, label: 'Legalitas Kami', items: legalitasComponents, external: true },
                      ].map(({ value, icon, label, items, external }) => (
                        <AccordionItem key={value} value={value} className="border-none">
                          <AccordionTrigger className="text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary hover:no-underline">
                            <span className="flex items-center gap-3">{icon} {label}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-1">
                            <ul className="pl-3 space-y-0.5">
                              {items.map((item: any) =>
                                external ? (
                                  <li key={item.href}>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                      onClick={() => setIsOpen(false)}>{item.title}</a>
                                  </li>
                                ) : (
                                  <li key={item.href}>
                                    <Link href={item.href}
                                      className={cn(
                                        'block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors',
                                        pathname === item.href && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                                      )}
                                      onClick={() => setIsOpen(false)}>{item.title}</Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {[
                      { href: '/layanan', icon: <MessageSquareText className="h-4 w-4" />, label: 'Konsultasi', match: '/layanan' },
                      { href: '/intek', icon: <ClipboardList className="h-4 w-4" />, label: 'INTEK', match: '/intek' },
                      { href: '/karir', icon: <Briefcase className="h-4 w-4" />, label: 'Karir', match: '/karir' },
                      { href: '/kontak', icon: <Mail className="h-4 w-4" />, label: 'Kontak Kami', match: '/kontak' },
                    ].map(({ href, icon, label, match }) => (
                      <Link key={href} href={href} onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors',
                          pathname.startsWith(match) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                        )}
                      >
                        {icon} {label}
                      </Link>
                    ))}
                  </nav>

                  <div className="p-4 border-t space-y-2">
                    {user ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Button asChild variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                          <Link href={['ADMIN', 'EDITOR', 'ADMIN_KONSULTASI', 'ADMIN_INTEK'].includes(user.role) ? '/dashboard' : '/profil'}>
                            <UserCircle className="h-4 w-4 mr-1" />{user.name || 'Profil'}
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => { handleLogout(); setIsOpen(false); }}>
                          <LogOut className="h-4 w-4 mr-1" />Keluar
                        </Button>
                      </div>
                    ) : (
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white" size="sm" onClick={() => setIsOpen(false)}>
                        <Link href="/login"><LogIn className="h-4 w-4 mr-1.5" />Masuk</Link>
                      </Button>
                    )}
                    <Button asChild className="w-full" variant="secondary" size="sm">
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
