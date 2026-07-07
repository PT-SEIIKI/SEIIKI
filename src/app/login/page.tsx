'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Zap, ShieldCheck, Award } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();

  if (user) {
    if (user.role === 'ADMIN_KONSULTASI') { router.push('/dashboard/konsultasi'); return null; }
    if (user.role === 'ADMIN_INTEK') { router.push('/dashboard/intek'); return null; }
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      const role = data?.user?.role;
      if (role === 'ADMIN_KONSULTASI') { router.push('/dashboard/konsultasi'); return; }
      if (role === 'ADMIN_INTEK') { router.push('/dashboard/intek'); return; }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ── Left Panel: Brand ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-[#facb01]/20 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-[#09bce4]/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center text-center px-12 max-w-md">
          {/* Logo */}
          <div className="bg-white rounded-2xl p-4 shadow-2xl mb-8">
            <Logo className="h-16 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            PT. Solusi Energi<br />Kelistrikan Indonesia
          </h1>
          <p className="text-blue-200 text-base mb-10 leading-relaxed">
            Pusat Layanan Sertifikat Laik Operasi Instalasi Tenaga Listrik yang terpercaya dan terakreditasi.
          </p>

          {/* Feature pills */}
          <div className="space-y-3 w-full">
            {[
              { icon: <ShieldCheck className="h-5 w-5 text-[#facb01]" />, text: 'Lembaga Inspeksi Terakreditasi KAN' },
              { icon: <Award className="h-5 w-5 text-[#facb01]" />, text: 'Terverifikasi Kementerian ESDM' },
              { icon: <Zap className="h-5 w-5 text-[#facb01]" />, text: 'Layanan SLO Tegangan Rendah & Menengah' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-left">
                <div className="shrink-0">{icon}</div>
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="absolute bottom-6 text-blue-300/60 text-xs">© 2025 SEIIKI — Aman Terpercaya</p>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-gray-50 px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Logo className="h-14 w-auto mx-auto" />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat datang</h2>
            <p className="text-gray-500 text-sm">Masuk ke panel administrasi SEIIKI</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@contoh.com"
                required
                className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-md shadow-primary/20 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memverifikasi...</>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Sistem ini hanya untuk pengguna terdaftar SEIIKI.
          </p>
        </div>
      </div>
    </div>
  );
}
