'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';

export default function DashboardVisiMisiPage() {
  const [saved, setSaved] = useState(false);
  const [visi, setVisi] = useState('Menjadi Lembaga Inspeksi Teknik ketenagalistrikan yang terpercaya, profesional, dan terakreditasi di Indonesia, dengan berkontribusi pada keselamatan dan keandalan infrastruktur listrik nasional.');
  const [misi, setMisi] = useState<string[]>([
    'Melaksanakan pemeriksaan dan pengujian instalasi tenaga listrik secara objektif, akurat, dan terpercaya sesuai standar nasional.',
    'Menyediakan layanan inspeksi yang cepat, transparan, dan berorientasi pada kepuasan pelanggan.',
    'Mengembangkan sumber daya manusia yang kompeten dan bersertifikat di bidang ketenagalistrikan.',
    'Mendukung program pemerintah dalam mewujudkan sistem kelistrikan yang aman dan andal di seluruh Indonesia.',
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addMisi = () => setMisi((prev) => [...prev, '']);
  const updateMisi = (idx: number, val: string) => setMisi((prev) => prev.map((m, i) => (i === idx ? val : m)));
  const removeMisi = (idx: number) => setMisi((prev) => prev.filter((_, i) => i !== idx));

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'EDITOR']}>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Visi & Misi</h1>
            <p className="text-muted-foreground mt-1">Edit pernyataan visi dan butir-butir misi perusahaan.</p>
          </div>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" /> Tersimpan
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visi</CardTitle>
              <CardDescription>Pernyataan tujuan jangka panjang perusahaan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Pernyataan Visi</Label>
                <Textarea rows={4} value={visi} onChange={(e) => setVisi(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Misi</CardTitle>
                  <CardDescription>Langkah-langkah strategis untuk mewujudkan visi.</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addMisi} className="gap-1">
                  <Plus className="h-3.5 w-3.5" /> Tambah Poin
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {misi.map((m, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-2.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                  <Input value={m} onChange={(e) => updateMisi(idx, e.target.value)} placeholder={`Poin misi ke-${idx + 1}`} className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0" onClick={() => removeMisi(idx)} disabled={misi.length <= 1}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" /> Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </AdminAuthGuard>
  );
}
