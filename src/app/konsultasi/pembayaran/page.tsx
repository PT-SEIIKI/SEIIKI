'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  useEffect(() => {
    router.replace(id ? `/layanan/pembayaran?id=${id}` : '/layanan');
  }, [router, id]);
  return null;
}

export default function PembayaranRedirect() {
  return (
    <Suspense fallback={null}>
      <RedirectContent />
    </Suspense>
  );
}
