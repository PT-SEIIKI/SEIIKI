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
  const [contactInfo, setContactInfo] = useState<any[]>([]);

  useEffect(() => {
    // Show button after page loads
    const timer = setTimeout(() => setIsVisible(true), 1000);
    
    // Fetch WhatsApp number from contact info
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/admin/contact-info');
        if (response.ok) {
          const data = await response.json();
          setContactInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
      }
    };

    fetchContactInfo();

    return () => clearTimeout(timer);
  }, []);

  // Find WhatsApp number from contact info
  const whatsappContact = contactInfo.find(
    contact => contact.type === 'PHONE' && contact.label.toLowerCase().includes('whatsapp')
  );
  
  const finalPhoneNumber = whatsappContact?.value || phoneNumber;

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
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        aria-label="Hubungi via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="ml-2 hidden sm:inline">WhatsApp</span>
      </Button>
    </div>
  );
}