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
import { Loader2, ClipboardList, CheckCircle, Zap, FileCheck, Users, Award } from 'lucide-react';

const JENIS_PROJECT = [
  'Instalasi Baru',
  'Renovasi / Perluasan',
  'Pemeliharaan Berkala',
  'Inspeksi & Sertifikasi',
  'Pemasangan PLTS',
  'Pemasangan PLTD',
  'Lainnya',
];

const infoCards = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Apa itu INTEK?',
    desc: 'Inspeksi Teknik (INTEK) adalah layanan pemeriksaan dan pengujian instalasi tenaga listrik yang dilakukan oleh tenaga ahli bersertifikat untuk memastikan kelayakan operasi sebelum penerbitan SLO.',
    color: 'text-[#09bce4]',
    bg: 'bg-[#09bce4]/10',
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: 'Dokumen yang Disiapkan',
    desc: 'Single line diagram, gambar instalasi, sertifikat kontraktor (SIJK), laporan hasil uji, dan data teknis peralatan utama (trafo, panel, kabel, dll).',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Siapa yang Mengajukan?',
    desc: 'Pemilik instalasi, kontraktor listrik, pengembang properti, atau pihak industri yang membutuhkan inspeksi teknis untuk keperluan SLO atau pemeliharaan berkala.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Hasil Inspeksi',
    desc: 'Laporan hasil pemeriksaan teknis yang sah, rekomendasi perbaikan (jika ada), dan rekomendasi penerbitan Sertifikat Laik Operasi (SLO) kepada ESDM.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function IntekPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    namaInstalasi: '', dayaTerpasang: '', alamat: '', noHp: '',
    tanggalMulai: '', tenagaTeknikLapangan: '', tenagaTeknikSistem: '', jenisProject: '',
  });

  const handleChange = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

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
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Gagal mengirim data'); }
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
        <Card className="w-full max-w-md shadow-xl border-0 text-center overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-400 to-green-600 py-10 px-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Data Berhasil Dikirim!</h2>
          </div>
          <CardContent className="pt-8 pb-8 space-y-4">
            <p className="text-gray-500">
              Data INTEK Anda telah berhasil dikirimkan ke sistem SEIIKI. Tim inspektur kami akan meninjau data dan menghubungi Anda segera untuk penjadwalan inspeksi.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-1.5">
              <p className="font-bold text-gray-700 mb-2">Langkah Selanjutnya:</p>
              {['Tim SEIIKI akan menghubungi via HP/WA dalam 1×24 jam kerja', 'Siapkan dokumen teknis instalasi untuk proses inspeksi', 'Inspeksi lapangan dijadwalkan sesuai kesepakatan'].map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#09bce4] text-white text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
                  <span className="text-gray-600">{s}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => { setIsSuccess(false); setForm({ namaInstalasi: '', dayaTerpasang: '', alamat: '', noHp: '', tanggalMulai: '', tenagaTeknikLapangan: '', tenagaTeknikSistem: '', jenisProject: '' }); }}>
                Input Data Baru
              </Button>
              <Button className="flex-1 bg-[#09bce4] hover:bg-[#09bce4]/90" onClick={() => router.push('/')}>
                Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-4">
            <ClipboardList className="h-3.5 w-3.5" />
            Inspeksi Teknik Ketenagalistrikan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Layanan INTEK</h1>
          <p className="text-blue-100/80 max-w-xl mx-auto">
            Ajukan inspeksi teknis instalasi tenaga listrik Anda kepada lembaga inspeksi terakreditasi ESDM untuk mendapatkan rekomendasi Sertifikat Laik Operasi (SLO).
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {infoCards.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`${card.bg} ${card.color} rounded-xl p-2.5 w-11 h-11 flex items-center justify-center mb-3`}>
                {card.icon}
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{card.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardList className="h-5 w-5 text-[#09bce4]" />
                Formulir Pengajuan INTEK
              </CardTitle>
              <CardDescription>Isi seluruh data instalasi dengan lengkap dan benar</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="namaInstalasi">Nama Instalasi / Pelanggan <span className="text-red-500">*</span></Label>
                  <Input id="namaInstalasi" placeholder="Contoh: PT. Maju Sejahtera / Rumah Bapak Ahmad" value={form.namaInstalasi} onChange={e => handleChange('namaInstalasi', e.target.value)} required className="h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dayaTerpasang">Daya Terpasang <span className="text-red-500">*</span></Label>
                  <Input id="dayaTerpasang" placeholder="Contoh: 33.000 VA / 200 kVA / 1 MW" value={form.dayaTerpasang} onChange={e => handleChange('dayaTerpasang', e.target.value)} required className="h-11" />
                  <p className="text-xs text-gray-400">Cantumkan satuan (VA, kVA, atau MW)</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="alamat">Alamat Lokasi Instalasi <span className="text-red-500">*</span></Label>
                  <Textarea id="alamat" placeholder="Alamat lengkap lokasi instalasi, termasuk RT/RW, Kelurahan, Kecamatan, Kota, Provinsi" value={form.alamat} onChange={e => handleChange('alamat', e.target.value)} rows={3} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="noHp">No. HP / WhatsApp Penanggung Jawab <span className="text-red-500">*</span></Label>
                  <Input id="noHp" type="tel" placeholder="Contoh: 08123456789" value={form.noHp} onChange={e => handleChange('noHp', e.target.value)} required className="h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tanggalMulai">Tanggal Mulai Instalasi <span className="text-red-500">*</span></Label>
                  <Input id="tanggalMulai" type="date" value={form.tanggalMulai} onChange={e => handleChange('tanggalMulai', e.target.value)} required className="h-11" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="tenagaTeknikLapangan">Tenaga Teknik Lapangan <span className="text-red-500">*</span></Label>
                    <Input id="tenagaTeknikLapangan" placeholder="Nama TT lapangan" value={form.tenagaTeknikLapangan} onChange={e => handleChange('tenagaTeknikLapangan', e.target.value)} required className="h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tenagaTeknikSistem">Tenaga Teknik Sistem <span className="text-red-500">*</span></Label>
                    <Input id="tenagaTeknikSistem" placeholder="Nama TT sistem" value={form.tenagaTeknikSistem} onChange={e => handleChange('tenagaTeknikSistem', e.target.value)} required className="h-11" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Jenis Project <span className="text-red-500">*</span></Label>
                  <Select value={form.jenisProject} onValueChange={v => handleChange('jenisProject', v)} required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Pilih jenis project..." />
                    </SelectTrigger>
                    <SelectContent>
                      {JENIS_PROJECT.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full h-12 bg-[#09bce4] hover:bg-[#09bce4]/90 text-white font-semibold text-base" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengirim Data...</> : 'Kirim Data INTEK'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">⚠ Perhatian</p>
            <ul className="text-xs text-amber-700 space-y-1 leading-relaxed">
              <li>• Data yang diisi harus sesuai dengan kondisi instalasi yang sebenarnya di lapangan.</li>
              <li>• Pengisian data palsu dapat mengakibatkan pembatalan proses inspeksi tanpa pengembalian biaya.</li>
              <li>• Pastikan tenaga teknik lapangan memiliki Sertifikat Kompetensi yang masih berlaku.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
