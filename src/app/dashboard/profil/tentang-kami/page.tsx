'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { Save, CheckCircle2, ExternalLink } from 'lucide-react';

export default function DashboardTentangKamiPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    namaPerusahaan: 'PT. Solusi Energi Kelistrikan Indonesia (SEIIKI)',
    tagline: 'Lembaga Inspeksi Teknik Terakreditasi untuk SLO Instalasi Tenaga Listrik',
    deskripsiSingkat: 'SEIIKI adalah perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM melalui Direktorat Jenderal Ketenagalistrikan.',
    deskripsiPanjang: 'PT. Solusi Energi Kelistrikan Indonesia (SEIIKI) adalah perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM melalui Direktorat Jenderal Ketenagalistrikan. Kami berfokus pada pengujian dan pemeriksaan kelayakan operasi instalasi ketenagalistrikan, meliputi PLTD, PLTS, serta instalasi tegangan menengah.\n\nBerkantor pusat di Bandar Lampung, kami hadir sebagai mitra profesional dan independen dalam proses sertifikasi Sertifikat Laik Operasi (SLO). Dengan tenaga ahli bersertifikat, kami berkomitmen memberikan layanan inspeksi yang objektif, akurat, dan terpercaya.',
    tahunBerdiri: '2010',
    jumlahKaryawan: '50+',
    jumlahKantor: '25',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: call API to save changes
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'EDITOR']}>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola "Tentang Kami"</h1>
            <p className="text-muted-foreground mt-1">Edit konten halaman publik Tentang Kami.</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" /> Tersimpan
              </span>
            )}
            <Button asChild variant="outline" size="sm">
              <a href="/profil/tentang-kami" target="_blank" rel="noopener noreferrer" className="gap-2 flex items-center">
                <ExternalLink className="h-3.5 w-3.5" /> Lihat Halaman
              </a>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Umum</CardTitle>
              <CardDescription>Data dasar perusahaan yang tampil di halaman About.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Perusahaan</Label>
                <Input value={form.namaPerusahaan} onChange={(e) => setForm((f) => ({ ...f, namaPerusahaan: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Tagline / Slogan</Label>
                <Input value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Singkat (untuk metadata/SEO)</Label>
                <Textarea rows={2} value={form.deskripsiSingkat} onChange={(e) => setForm((f) => ({ ...f, deskripsiSingkat: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Lengkap</Label>
                <Textarea rows={6} value={form.deskripsiPanjang} onChange={(e) => setForm((f) => ({ ...f, deskripsiPanjang: e.target.value }))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistik Perusahaan</CardTitle>
              <CardDescription>Angka-angka pencapaian yang ditampilkan di halaman About.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Tahun Berdiri</Label>
                <Input value={form.tahunBerdiri} onChange={(e) => setForm((f) => ({ ...f, tahunBerdiri: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Jumlah Karyawan</Label>
                <Input value={form.jumlahKaryawan} onChange={(e) => setForm((f) => ({ ...f, jumlahKaryawan: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Jumlah Kantor</Label>
                <Input value={form.jumlahKantor} onChange={(e) => setForm((f) => ({ ...f, jumlahKantor: e.target.value }))} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" /> Simpan Perubahan
            </Button>
          </div>
        </form>

        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 dark:text-amber-400">
              <strong>Catatan:</strong> Perubahan ini saat ini tersimpan secara lokal. Untuk menghubungkan editor ini ke database, implementasikan endpoint API <code className="text-xs bg-amber-100 dark:bg-amber-900/30 px-1 rounded">/api/settings</code> dengan key bertipe halaman profil.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminAuthGuard>
  );
}
