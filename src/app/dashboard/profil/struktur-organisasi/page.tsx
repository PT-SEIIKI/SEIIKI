'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { Save, CheckCircle2, Plus, Trash2, UserCircle } from 'lucide-react';

interface OrgMember {
  id: string;
  name: string;
  position: string;
  department: string;
}

const defaultMembers: OrgMember[] = [
  { id: '1', name: 'Direktur Utama', position: 'Direktur Utama', department: 'Direksi' },
  { id: '2', name: 'Direktur Operasional', position: 'Direktur Operasional', department: 'Direksi' },
  { id: '3', name: 'Manajer Teknik', position: 'Manajer', department: 'Teknik' },
  { id: '4', name: 'Manajer Administrasi', position: 'Manajer', department: 'Administrasi' },
  { id: '5', name: 'Koordinator Inspektur', position: 'Koordinator', department: 'Teknik' },
];

const emptyForm = { name: '', position: '', department: '' };

export default function DashboardStrukturOrganisasiPage() {
  const [members, setMembers] = useState<OrgMember[]>(defaultMembers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    setForm(emptyForm);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const departments = [...new Set(members.map((m) => m.department))];

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'EDITOR']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Struktur Organisasi</h1>
            <p className="text-muted-foreground mt-1">Kelola susunan pengurus dan jabatan perusahaan.</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="flex items-center gap-1 text-sm text-green-600"><CheckCircle2 className="h-4 w-4" /> Tersimpan</span>}
            <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Tambah Anggota</Button>
          </div>
        </div>

        {showForm && (
          <Card className="border-primary/30">
            <CardHeader><CardTitle>Tambah Anggota</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Nama *</Label><Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
                <div className="space-y-2"><Label>Jabatan *</Label><Input value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} required /></div>
                <div className="space-y-2"><Label>Divisi / Departemen *</Label><Input value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} required /></div>
                <div className="md:col-span-3 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
                  <Button type="submit">Tambah</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {departments.map((dept) => (
            <Card key={dept}>
              <CardHeader>
                <CardTitle className="text-base">{dept}</CardTitle>
                <CardDescription>{members.filter((m) => m.department === dept).length} anggota</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {members
                    .filter((m) => m.department === dept)
                    .map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <UserCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.position}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                          onClick={() => setMembers((prev) => prev.filter((m) => m.id !== member.id))}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button className="gap-2" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}>
            <Save className="h-4 w-4" /> Simpan Perubahan
          </Button>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
