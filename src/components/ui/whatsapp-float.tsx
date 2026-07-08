'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppFloat({ 
  phoneNumber = '6281234567890', 
  message = 'Halo, saya ingin bertanya tentang layanan SEIIKI',
  className 
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [waNumber, setWaNumber] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);

    // Fetch WhatsApp number from public settings API
    fetch('/api/settings/public')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.wa_admin_number) setWaNumber(data.wa_admin_number); })
      .catch(() => { /* fall back to prop default */ });

    return () => clearTimeout(timer);
  }, []);

  const finalPhoneNumber = waNumber || phoneNumber;

  const handleClick = () => {
    const url = `https://wa.me/${finalPhoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      <Button
        onClick={handleClick}
        size="lg"
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 whatsapp-pulse"
        aria-label="Hubungi via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="ml-2 hidden sm:inline">WhatsApp</span>
      </Button>
    </div>
  );
}