'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ClipboardList, CheckCircle } from 'lucide-react';

const JENIS_PROJECT = [
  'Instalasi Baru',
  'Renovasi / Perluasan',
  'Pemeliharaan Berkala',
  'Inspeksi & Sertifikasi',
  'Pemasangan PLTS',
  'Pemasangan PLTD',
  'Lainnya',
];

export default function IntekPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    namaInstalasi: '',
    dayaTerpasang: '',
    alamat: '',
    noHp: '',
    tanggalMulai: '',
    tenagaTeknikLapangan: '',
    tenagaTeknikSistem: '',
    jenisProject: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/intek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal mengirim data');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg text-center">
          <CardContent className="pt-10 pb-10 space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Data Berhasil Dikirim!</h2>
            <p className="text-muted-foreground">
              Data INTEK Anda telah berhasil dikirimkan. Tim kami akan segera menghubungi Anda.
            </p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => { setIsSuccess(false); setForm({ namaInstalasi:'', dayaTerpasang:'', alamat:'', noHp:'', tanggalMulai:'', tenagaTeknikLapangan:'', tenagaTeknikSistem:'', jenisProject:'' }); }}>
                Input Data Baru
              </Button>
              <Button className="flex-1" onClick={() => router.push('/')}>
                Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Formulir INTEK</h1>
          <p className="text-muted-foreground mt-2">
            Inspeksi Teknik — Lengkapi data instalasi untuk proses sertifikasi
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Data Instalasi
            </CardTitle>
            <CardDescription>Semua field wajib diisi</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama Instalasi */}
              <div className="space-y-2">
                <Label htmlFor="namaInstalasi">Nama Instalasi / Pelanggan <span className="text-red-500">*</span></Label>
                <Input
                  id="namaInstalasi"
                  placeholder="Contoh: PT. Maju Sejahtera"
                  value={form.namaInstalasi}
                  onChange={e => handleChange('namaInstalasi', e.target.value)}
                  required
                />
              </div>

              {/* Daya Terpasang */}
              <div className="space-y-2">
                <Label htmlFor="dayaTerpasang">Daya Terpasang (VA) <span className="text-red-500">*</span></Label>
                <Input
                  id="dayaTerpasang"
                  placeholder="Contoh: 33.000 VA"
                  value={form.dayaTerpasang}
                  onChange={e => handleChange('dayaTerpasang', e.target.value)}
                  required
                />
              </div>

              {/* Alamat */}
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat <span className="text-red-500">*</span></Label>
                <Textarea
                  id="alamat"
                  placeholder="Alamat lengkap lokasi instalasi"
                  value={form.alamat}
                  onChange={e => handleChange('alamat', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* No HP */}
              <div className="space-y-2">
                <Label htmlFor="noHp">No HP <span className="text-red-500">*</span></Label>
                <Input
                  id="noHp"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={form.noHp}
                  onChange={e => handleChange('noHp', e.target.value)}
                  required
                />
              </div>

              {/* Tanggal Mulai */}
              <div className="space-y-2">
                <Label htmlFor="tanggalMulai">Tanggal Mulai <span className="text-red-500">*</span></Label>
                <Input
                  id="tanggalMulai"
                  type="date"
                  value={form.tanggalMulai}
                  onChange={e => handleChange('tanggalMulai', e.target.value)}
                  required
                />
              </div>

              {/* Tenaga Teknik Lapangan */}
              <div className="space-y-2">
                <Label htmlFor="tenagaTeknikLapangan">Tenaga Teknik Lapangan <span className="text-red-500">*</span></Label>
                <Input
                  id="tenagaTeknikLapangan"
                  placeholder="Nama tenaga teknik lapangan"
                  value={form.tenagaTeknikLapangan}
                  onChange={e => handleChange('tenagaTeknikLapangan', e.target.value)}
                  required
                />
              </div>

              {/* Tenaga Teknik Sistem */}
              <div className="space-y-2">
                <Label htmlFor="tenagaTeknikSistem">Tenaga Teknik Sistem <span className="text-red-500">*</span></Label>
                <Input
                  id="tenagaTeknikSistem"
                  placeholder="Nama tenaga teknik sistem"
                  value={form.tenagaTeknikSistem}
                  onChange={e => handleChange('tenagaTeknikSistem', e.target.value)}
                  required
                />
              </div>

              {/* Jenis Project */}
              <div className="space-y-2">
                <Label>Jenis Project <span className="text-red-500">*</span></Label>
                <Select
                  value={form.jenisProject}
                  onValueChange={v => handleChange('jenisProject', v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis project" />
                  </SelectTrigger>
                  <SelectContent>
                    {JENIS_PROJECT.map(j => (
                      <SelectItem key={j} value={j}>{j}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</>
                ) : (
                  'Kirim Data INTEK'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
