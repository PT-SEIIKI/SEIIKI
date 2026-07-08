'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { FileText, Plus, Trash2, ExternalLink, CheckCircle2, X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  issuer: string;
  number: string;
  year: string;
  url: string;
  active: boolean;
}

const defaultDocs: Document[] = [
  { id: '1', name: 'Sertifikat Pembangkit Listrik Tenaga Diesel (PLTD)', issuer: 'Kementerian ESDM', number: '686.1.1.318.M.1B.1871.C25', year: '2024', url: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx', active: true },
  { id: '2', name: 'Sertifikat Pembangkit Listrik Tenaga Surya (PLTS)', issuer: 'Kementerian ESDM', number: '687.1.1.307.M.1B.1871.C25', year: '2024', url: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=1', active: true },
  { id: '3', name: 'Sertifikat IPTL Tegangan Menengah', issuer: 'Kementerian ESDM', number: '---', year: '2024', url: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=2', active: true },
];

const emptyForm = { name: '', issuer: 'Kementerian ESDM', number: '', year: new Date().getFullYear().toString(), url: '' };

export default function DashboardDokumenPage() {
  const [docs, setDocs] = useState<Document[]>(defaultDocs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setDocs((prev) => [...prev, { ...form, id: Date.now().toString(), active: true }]);
    setForm(emptyForm);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'EDITOR']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dokumen Perijinan</h1>
            <p className="text-muted-foreground mt-1">Kelola sertifikat dan dokumen legalitas perusahaan.</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="flex items-center gap-1 text-sm text-green-600"><CheckCircle2 className="h-4 w-4" /> Tersimpan</span>}
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Tambah Dokumen
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tambah Dokumen Baru</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2"><Label>Nama Dokumen / Sertifikat *</Label><Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Contoh: Sertifikat PLTD" required /></div>
                <div className="space-y-2"><Label>Penerbit *</Label><Input value={form.issuer} onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))} required /></div>
                <div className="space-y-2"><Label>Nomor Sertifikat</Label><Input value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))} placeholder="No. sertifikat" /></div>
                <div className="space-y-2"><Label>Tahun Terbit</Label><Input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} /></div>
                <div className="space-y-2"><Label>URL Verifikasi</Label><Input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://..." /></div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
                  <Button type="submit">Simpan Dokumen</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {docs.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold">{doc.name}</h3>
                      <Badge variant={doc.active ? 'default' : 'secondary'} className="text-xs">{doc.active ? 'Aktif' : 'Nonaktif'}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Penerbit: {doc.issuer} · No. {doc.number} · Tahun {doc.year}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {doc.url && (
                      <Button asChild variant="outline" size="sm" className="gap-1">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" /> Verifikasi
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="icon" className="h-9 w-9 text-red-500 hover:bg-red-50" onClick={() => setDocs((prev) => prev.filter((d) => d.id !== doc.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
