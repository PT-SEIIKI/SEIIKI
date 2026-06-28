'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MapPin, Navigation, CheckCircle, RefreshCw } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  alamatLokasi: string;
}

export default function LayananPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [locationAttempt, setLocationAttempt] = useState(0);
  const [mapUrl, setMapUrl] = useState('');
  const [form, setForm] = useState({ nama: '', noWhatsapp: '' });

  const updateMapUrl = useCallback((lat: number, lon: number) => {
    const delta = 0.01;
    const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
    setMapUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
    );
  }, []);

  const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        { headers: { 'Accept-Language': 'id' }, signal: AbortSignal.timeout(8000) }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.display_name) return data.display_name;
      }
    } catch {
      // silently fall back to coordinates
    }
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  };

  const getLocation = useCallback(() => {
    setIsGettingLocation(true);
    setLocationError('');
    setLocationAttempt(prev => prev + 1);

    if (!navigator.geolocation) {
      setLocationError('Browser Anda tidak mendukung GPS. Silakan izinkan akses lokasi.');
      setIsGettingLocation(false);
      return;
    }

    const tryGetPosition = (highAccuracy: boolean) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const alamatLokasi = await reverseGeocode(latitude, longitude);
          setLocation({ latitude, longitude, alamatLokasi });
          updateMapUrl(latitude, longitude);
          setIsGettingLocation(false);
        },
        (err) => {
          if (err.code === 3 && highAccuracy) {
            tryGetPosition(false);
          } else {
            const messages: Record<number, string> = {
              1: 'Akses lokasi ditolak. Silakan izinkan akses GPS di pengaturan browser.',
              2: 'Lokasi tidak tersedia saat ini. Coba lagi.',
              3: 'Tidak bisa mendapatkan lokasi. Pastikan GPS aktif lalu coba lagi.',
            };
            setLocationError(messages[err.code] || 'Gagal mendapatkan lokasi.');
            setIsGettingLocation(false);
          }
        },
        {
          enableHighAccuracy: highAccuracy,
          timeout: highAccuracy ? 20000 : 30000,
          maximumAge: highAccuracy ? 0 : 60000,
        }
      );
    };

    tryGetPosition(true);
  }, [updateMapUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      setError('Silakan ambil lokasi GPS terlebih dahulu.');
      return;
    }

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
      router.push(`/layanan/pembayaran?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Layanan Konsultasi</h1>
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
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengambil lokasi GPS... (harap tunggu)
                    </>
                  ) : location ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Perbarui Lokasi GPS
                    </>
                  ) : (
                    <>
                      <Navigation className="mr-2 h-4 w-4" />
                      Ambil Lokasi GPS Saya
                    </>
                  )}
                </Button>

                {isGettingLocation && (
                  <p className="text-xs text-muted-foreground text-center">
                    Sedang mencari sinyal GPS... Pastikan GPS perangkat aktif.
                  </p>
                )}

                {locationError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {locationError}
                      {locationAttempt > 0 && (
                        <button
                          type="button"
                          onClick={getLocation}
                          className="ml-2 underline font-medium"
                        >
                          Coba lagi
                        </button>
                      )}
                    </AlertDescription>
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
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !location}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim & Lanjutkan ke Pembayaran'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
