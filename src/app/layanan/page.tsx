'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Loader2, MapPin, Navigation, CheckCircle, RefreshCw,
  MessageSquare, Clock, DollarSign, Shield, ChevronRight,
} from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  alamatLokasi: string;
}

const steps = [
  { icon: <MessageSquare className="h-5 w-5" />, title: 'Isi Formulir', desc: 'Lengkapi nama dan nomor WhatsApp aktif Anda, lalu ambil koordinat GPS lokasi instalasi.' },
  { icon: <DollarSign className="h-5 w-5" />, title: 'Konfirmasi & Bayar', desc: 'Lakukan pembayaran biaya konsultasi sesuai nominal yang tertera, lalu upload bukti transfer.' },
  { icon: <Clock className="h-5 w-5" />, title: 'Tim Kami Menghubungi', desc: 'Setelah pembayaran dikonfirmasi, konsultan teknis SEIIKI akan menghubungi Anda via WhatsApp.' },
  { icon: <Shield className="h-5 w-5" />, title: 'Konsultasi Selesai', desc: 'Dapatkan solusi teknis dan rekomendasi untuk proses sertifikasi instalasi listrik Anda.' },
];

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
    setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`);
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
    } catch { /* fall back */ }
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  };

  const getLocation = useCallback(() => {
    setIsGettingLocation(true);
    setLocationError('');
    setLocationAttempt(prev => prev + 1);

    if (!navigator.geolocation) {
      setLocationError('Browser Anda tidak mendukung GPS.');
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
        { enableHighAccuracy: highAccuracy, timeout: highAccuracy ? 20000 : 30000, maximumAge: highAccuracy ? 0 : 60000 }
      );
    };
    tryGetPosition(true);
  }, [updateMapUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) { setError('Silakan ambil lokasi GPS terlebih dahulu.'); return; }
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/konsultasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...location }),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Gagal mengirim data'); }
      const data = await res.json();
      router.push(`/layanan/pembayaran?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-4">
            <MessageSquare className="h-3.5 w-3.5" />
            Konsultasi Teknis
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Layanan Konsultasi SEIIKI</h1>
          <p className="text-blue-100/80 max-w-xl mx-auto">
            Dapatkan panduan teknis dari inspektur bersertifikat kami mengenai persyaratan, prosedur, dan proses sertifikasi instalasi listrik Anda.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative">
              <div className="w-10 h-10 rounded-xl bg-[#09bce4]/10 text-[#09bce4] flex items-center justify-center mb-3">
                {step.icon}
              </div>
              <div className="absolute top-4 right-4 text-2xl font-black text-gray-100">0{i + 1}</div>
              <p className="font-bold text-gray-900 text-sm mb-1">{step.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-[#09bce4]" />
                Formulir Konsultasi
              </CardTitle>
              <CardDescription>Lengkapi data diri dan lokasi instalasi Anda</CardDescription>
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
                  <Input id="nama" placeholder="Masukkan nama lengkap Anda" value={form.nama}
                    onChange={(e) => setForm(f => ({ ...f, nama: e.target.value }))} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noWhatsapp">Nomor WhatsApp <span className="text-red-500">*</span></Label>
                  <Input id="noWhatsapp" type="tel" placeholder="Contoh: 08123456789" value={form.noWhatsapp}
                    onChange={(e) => setForm(f => ({ ...f, noWhatsapp: e.target.value }))} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Lokasi Instalasi <span className="text-red-500">*</span></Label>
                  <p className="text-xs text-gray-400">Aktifkan GPS perangkat Anda lalu klik tombol di bawah untuk menentukan titik lokasi instalasi listrik.</p>
                  <Button type="button" variant="outline" className="w-full h-11" onClick={getLocation} disabled={isGettingLocation}>
                    {isGettingLocation ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengambil lokasi GPS...</>
                    ) : location ? (
                      <><RefreshCw className="mr-2 h-4 w-4" />Perbarui Lokasi GPS</>
                    ) : (
                      <><Navigation className="mr-2 h-4 w-4" />Ambil Lokasi GPS Saya</>
                    )}
                  </Button>
                  {isGettingLocation && (
                    <p className="text-xs text-gray-400 text-center">Sedang mencari sinyal GPS... Pastikan GPS perangkat aktif.</p>
                  )}
                  {locationError && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {locationError}
                        {locationAttempt > 0 && (
                          <button type="button" onClick={getLocation} className="ml-2 underline font-medium">Coba lagi</button>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                  {location && (
                    <div className="space-y-3 mt-3">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <div className="text-sm">
                            <p className="font-medium text-green-800">Lokasi berhasil diambil</p>
                            <p className="text-green-700 mt-1 text-xs">{location.alamatLokasi}</p>
                            <p className="text-green-600 text-xs mt-1">Koordinat: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
                          </div>
                        </div>
                      </div>
                      {mapUrl && (
                        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                          <iframe src={mapUrl} width="100%" height="240" style={{ border: 0 }} loading="lazy" title="Peta Lokasi Anda" sandbox="allow-scripts allow-same-origin" />
                          <div className="bg-gray-50 px-3 py-1.5 text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />Peta powered by OpenStreetMap
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full h-12 bg-[#09bce4] hover:bg-[#09bce4]/90 text-white font-semibold" size="lg" disabled={isSubmitting || !location}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengirim...</>
                  ) : (
                    'Kirim & Lanjutkan ke Pembayaran →'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info note */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Catatan Penting</p>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#09bce4] mt-1.5 shrink-0" />Pastikan nomor WhatsApp yang dimasukkan aktif dan dapat dihubungi.</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#09bce4] mt-1.5 shrink-0" />Lokasi GPS harus sesuai dengan lokasi instalasi listrik yang akan dikonsultasikan.</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#09bce4] mt-1.5 shrink-0" />Setelah pembayaran dikonfirmasi, konsultan akan menghubungi dalam 1×24 jam kerja.</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#09bce4] mt-1.5 shrink-0" />Biaya konsultasi dapat dikompensasi jika melanjutkan ke proses inspeksi SLO penuh.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
