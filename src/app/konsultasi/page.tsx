'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MapPin, Navigation, CheckCircle, LogIn, UserPlus, X, ShieldCheck } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  alamatLokasi: string;
}

// ─── Modal Harus Login ─────────────────────────────────────────────────────────
function AuthRequiredModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
          animation: 'modalIn 0.25s ease-out',
        }}
      >
        {/* Header gradient */}
        <div
          className="px-6 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Login Diperlukan</h2>
          <p className="text-blue-100 text-sm mt-1">
            Untuk mengirim permintaan konsultasi, Anda perlu masuk ke akun Anda terlebih dahulu.
          </p>
        </div>

        {/* Info box */}
        <div className="px-6 pt-5 pb-2">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700 text-center">
            ✅ Data formulir Anda <strong>sudah tersimpan</strong> — tidak akan hilang setelah login.
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-5 space-y-3">
          <Button
            id="btn-login-from-modal"
            className="w-full h-11 text-base font-semibold"
            style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}
            onClick={() => router.push('/login?redirect=/konsultasi')}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Masuk ke Akun
          </Button>

          <Button
            id="btn-register-from-modal"
            variant="outline"
            className="w-full h-11 text-base font-semibold border-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => router.push('/register?redirect=/konsultasi')}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Daftar Akun Baru
          </Button>

          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
          >
            Batal, kembali ke formulir
          </button>
        </div>

        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Halaman Utama ─────────────────────────────────────────────────────────────
export default function KonsultasiPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [form, setForm] = useState({ nama: '', noWhatsapp: '' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Restore form data dari sessionStorage setelah kembali dari login
  useEffect(() => {
    const saved = sessionStorage.getItem('konsultasi_form_draft');
    if (saved) {
      try {
        const { form: savedForm, location: savedLoc } = JSON.parse(saved);
        if (savedForm) setForm(savedForm);
        if (savedLoc) {
          setLocation(savedLoc);
          updateMapUrl(savedLoc.latitude, savedLoc.longitude);
        }
      } catch {
        // ignore corrupt data
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMapUrl = useCallback((lat: number, lon: number) => {
    const delta = 0.01;
    const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
    setMapUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
    );
  }, []);

  const getLocation = useCallback(() => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Browser Anda tidak mendukung GPS. Silakan izinkan akses lokasi.');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let alamatLokasi = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept-Language': 'id' } }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.display_name) alamatLokasi = data.display_name;
          }
        } catch {
          // silently fall back to coordinates
        }

        setLocation({ latitude, longitude, alamatLokasi });
        updateMapUrl(latitude, longitude);
        setIsGettingLocation(false);
      },
      (err) => {
        const messages: Record<number, string> = {
          1: 'Akses lokasi ditolak. Silakan izinkan akses GPS di pengaturan browser.',
          2: 'Lokasi tidak tersedia saat ini. Coba lagi.',
          3: 'Waktu habis saat mengambil lokasi. Coba lagi.',
        };
        setLocationError(messages[err.code] || 'Gagal mendapatkan lokasi.');
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [updateMapUrl]);

  // Cek apakah user sudah login
  const checkAuth = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/me');
      return res.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      setError('Silakan ambil lokasi GPS terlebih dahulu.');
      return;
    }

    setIsCheckingAuth(true);
    const isLoggedIn = await checkAuth();
    setIsCheckingAuth(false);

    if (!isLoggedIn) {
      // Simpan data form ke sessionStorage sebelum redirect
      sessionStorage.setItem(
        'konsultasi_form_draft',
        JSON.stringify({ form, location })
      );
      setShowAuthModal(true);
      return;
    }

    // Sudah login → lanjutkan submit
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/konsultasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...location }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal mengirim data');
      }

      const data = await res.json();
      sessionStorage.removeItem('konsultasi_form_draft');
      router.push(`/konsultasi/pembayaran?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Konsultasi</h1>
            <p className="text-muted-foreground mt-2">
              Isi formulir berikut untuk memulai konsultasi dengan tim SEIIKI
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Formulir Konsultasi
              </CardTitle>
              <CardDescription>
                Lengkapi data diri dan lokasi Anda saat ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap <span className="text-red-500">*</span></Label>
                  <Input
                    id="nama"
                    placeholder="Masukkan nama lengkap Anda"
                    value={form.nama}
                    onChange={(e) => setForm(f => ({ ...f, nama: e.target.value }))}
                    required
                  />
                </div>

                {/* No WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="noWhatsapp">Nomor WhatsApp <span className="text-red-500">*</span></Label>
                  <Input
                    id="noWhatsapp"
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={form.noWhatsapp}
                    onChange={(e) => setForm(f => ({ ...f, noWhatsapp: e.target.value }))}
                    required
                  />
                </div>

                {/* Lokasi GPS */}
                <div className="space-y-2">
                  <Label>Lokasi Saat Ini <span className="text-red-500">*</span></Label>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={getLocation}
                    disabled={isGettingLocation}
                  >
                    {isGettingLocation ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengambil lokasi GPS...</>
                    ) : location ? (
                      <><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Perbarui Lokasi GPS</>
                    ) : (
                      <><Navigation className="mr-2 h-4 w-4" /> Ambil Lokasi GPS Saya</>
                    )}
                  </Button>

                  {locationError && (
                    <Alert variant="destructive">
                      <AlertDescription>{locationError}</AlertDescription>
                    </Alert>
                  )}

                  {location && (
                    <div className="space-y-3 mt-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <div className="text-sm">
                            <p className="font-medium text-green-800">Lokasi berhasil diambil</p>
                            <p className="text-green-700 mt-1">{location.alamatLokasi}</p>
                            <p className="text-green-600 text-xs mt-1">
                              Koordinat: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {mapUrl && (
                        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                          <iframe
                            src={mapUrl}
                            width="100%"
                            height="280"
                            style={{ border: 0 }}
                            loading="lazy"
                            title="Peta Lokasi Anda"
                            sandbox="allow-scripts allow-same-origin"
                          />
                          <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Peta powered by OpenStreetMap
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  id="btn-submit-konsultasi"
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting || isCheckingAuth || !location}
                >
                  {isSubmitting || isCheckingAuth ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isCheckingAuth ? 'Memeriksa sesi...' : 'Mengirim...'}</>
                  ) : (
                    'Kirim & Lanjutkan ke Pembayaran'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
