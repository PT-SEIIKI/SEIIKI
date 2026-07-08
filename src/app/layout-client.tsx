'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isAdmin = pathname.startsWith('/admin');
  const isLogin = pathname.startsWith('/login');

  if (isDashboard || isAdmin || isLogin) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
      <Toaster />
    </>
  );
}
