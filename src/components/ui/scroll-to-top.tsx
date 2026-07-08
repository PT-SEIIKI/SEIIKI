'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      aria-label="Kembali ke atas"
      className={cn(
        'fixed bottom-24 right-6 z-40 p-3 rounded-full',
        'bg-primary/90 hover:bg-primary text-white shadow-lg hover:shadow-xl',
        'transition-all duration-300 hover:scale-110 hover:-translate-y-1',
        'scroll-to-top-enter'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
