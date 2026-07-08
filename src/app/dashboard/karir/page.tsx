'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { Plus, Briefcase, Trash2, Edit2, X, CheckCircle2 } from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  active: boolean;
  createdAt: string;
}

const defaultJobs: JobListing[] = [
  {
    id: '1',
    title: 'Inspektur Teknik Kelistrikan',
    department: 'Teknik',
    location: 'Bandar Lampung',
    type: 'Full-time',
    description: 'Melakukan pemeriksaan dan pengujian instalasi tenaga listrik (PLTD, PLTS, Tegangan Menengah). Memiliki sertifikat kompetensi kelistrikan.',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Staff Administrasi & Dokumentasi',
    department: 'Administrasi',
    location: 'Bandar Lampung',
    type: 'Full-time',
    description: 'Mengelola dokumen perizinan, laporan inspeksi, dan korespondensi dengan klien. Menguasai MS Office dan Google Workspace.',
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const emptyForm = { title: '', department: '', location: 'Bandar Lampung', type: 'Full-time' as const, description: '' };

export default function DashboardKarirPage() {
  const [jobs, setJobs] = useState<JobListing[]>(defaultJobs);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setJobs((prev) => prev.map((j) => j.id === editId ? { ...j, ...form } : j));
    } else {
      setJobs((prev) => [...prev, { ...form, id: Date.now().toString(), active: true, createdAt: new Date().toISOString() }]);
    }
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = (job: JobListing) => {
    setForm({ title: job.title, department: job.department, location: job.location, type: job.type, description: job.description });
    setEditId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => setJobs((prev) => prev.filter((j) => j.id !== id));
  const toggleActive = (id: string) => setJobs((prev) => prev.map((j) => j.id === id ? { ...j, active: !j.active } : j));

  return (
    <AdminAuthGuard allowedRoles={['ADMIN']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Lowongan Karir</h1>
            <p className="text-muted-foreground mt-1">Tambah, edit, atau nonaktifkan posisi yang tersedia.</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" /> Tersimpan
              </span>
            )}
            <Button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }} className="gap-2">
              <Plus className="h-4 w-4" /> Tambah Lowongan
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editId ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); setEditId(null); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Posisi *</Label>
                  <Input id="title" placeholder="Contoh: Inspektur Teknik" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departemen *</Label>
                  <Input id="department" placeholder="Contoh: Teknik, Administrasi" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi *</Label>
                  <Input id="location" placeholder="Kota / Daerah" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Pekerjaan *</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'Full-time' | 'Part-time' | 'Contract' }))}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Deskripsi & Persyaratan *</Label>
                  <Textarea id="description" placeholder="Tulis deskripsi pekerjaan dan persyaratan..." rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>Batal</Button>
                  <Button type="submit">{editId ? 'Simpan Perubahan' : 'Tambah Lowongan'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Briefcase className="h-12 w-12 mb-4 opacity-30" />
                <p className="font-medium">Belum ada lowongan</p>
                <p className="text-sm mt-1">Klik "Tambah Lowongan" untuk membuat posisi baru.</p>
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className={`transition-all ${!job.active ? 'opacity-60' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge variant={job.active ? 'default' : 'secondary'}>{job.active ? 'Aktif' : 'Nonaktif'}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => toggleActive(job.id)}>
                        {job.active ? 'Nonaktifkan' : 'Aktifkan'}
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleEdit(job)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(job.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
