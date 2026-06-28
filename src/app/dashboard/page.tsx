'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (user.role === 'ADMIN_INTEK') {
      router.replace('/dashboard/intek');
    } else {
      router.replace('/dashboard/konsultasi');
    }
  }, [user, router]);

  return null;
}
