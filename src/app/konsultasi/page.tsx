'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KonsultasiRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/layanan'); }, [router]);
  return null;
}
